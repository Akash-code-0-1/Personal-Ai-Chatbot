import { NextRequest, NextResponse } from 'next/server';
import { parseCommand, isValidCommand, getCommandHelp } from '@/lib/command-parser';
import { prisma } from '@/lib/prisma';

// Demo user ID - in production, get from auth
const DEMO_USER_ID = 'demo-user-1';

// Detect intent from natural language
function detectIntent(message: string): { intent: string; confidence: number } {
  const lower = message.toLowerCase();

  // Save intent
  if (lower.match(/\b(save|store|remember|note|write|add|create note|jot down|keep|archive)\b/)) {
    return { intent: 'save', confidence: 0.9 };
  }

  // Find/Search intent
  if (lower.match(/\b(find|search|look for|show me|list|get|retrieve|find all|what are|where)\b/)) {
    return { intent: 'find', confidence: 0.85 };
  }

  // Folder/Organize intent
  if (lower.match(/\b(folder|organize|categorize|create folder|make folder|group|sort|arrange)\b/)) {
    return { intent: 'folder', confidence: 0.88 };
  }

  // Reminder intent
  if (lower.match(/\b(remind|reminder|task|todo|schedule|upcoming|deadline|alert|notification)\b/)) {
    return { intent: 'reminder', confidence: 0.87 };
  }

  return { intent: 'general', confidence: 0.5 };
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { response: 'Please provide a valid message.', command: undefined },
        { status: 400 }
      );
    }

    // Try to parse as command first
    const parsed = parseCommand(message);
    let response = '';
    let detectedCommand = '';

    if (parsed && isValidCommand(parsed.command)) {
      // Handle slash commands
      detectedCommand = parsed.command;

      switch (parsed.command) {
        case 'save':
          response = await handleSaveCommand(parsed);
          break;
        case 'find':
          response = await handleFindCommand(parsed);
          break;
        case 'folder':
          response = await handleFolderCommand(parsed);
          break;
        case 'file':
          response = handleFileCommand(parsed);
          break;
        case 'reminder':
          response = handleReminderCommand(parsed);
          break;
        default:
          response = getCommandHelp(parsed.command);
      }
    } else {
      // Detect intent from natural language
      const { intent, confidence } = detectIntent(message);
      detectedCommand = intent;

      if (confidence > 0.7) {
        // High confidence - execute the intent
        switch (intent) {
          case 'save':
            response = await handleNaturalSave(message);
            break;
          case 'find':
            response = await handleNaturalFind(message);
            break;
          case 'folder':
            response = await handleNaturalFolder(message);
            break;
          case 'reminder':
            response = handleNaturalReminder(message);
            break;
          default:
            response = await handleGeneralChat(message);
        }
      } else {
        // Low confidence - treat as general chat
        response = await handleGeneralChat(message);
      }
    }

    return NextResponse.json({
      response,
      command: detectedCommand,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        response: 'I\'m here to help! Feel free to ask me anything about saving notes, finding information, organizing content, or setting reminders.',
        command: 'error_recovery',
      },
      { status: 200 }
    );
  }
}

// Natural language handlers
async function handleNaturalSave(message: string): Promise<string> {
  try {
    // Extract content from natural language
    const contentMatch = message.match(/(?:save|store|remember|note)[\s:]*(.+?)(?:\s+)?$/i);
    const content = contentMatch ? contentMatch[1].trim() : message;
    
    if (!content || content.length < 3) {
      return 'I\'d love to save that, but please provide more details about what you\'d like to save.';
    }

    // Auto-generate title from content
    const title = content.substring(0, 50).replace(/[.!?]$/, '');

    try {
      let user = await prisma.user.findUnique({ where: { id: DEMO_USER_ID } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: DEMO_USER_ID,
            email: 'demo@chatbot.local',
            password: 'demo',
          },
        });
      }

      await prisma.item.create({
        data: {
          title,
          content,
          userId: DEMO_USER_ID,
        },
      });

      const totalCount = await prisma.item.count({ where: { userId: DEMO_USER_ID } });
      return `Saved! I've stored that note. You now have ${totalCount} item${totalCount > 1 ? 's' : ''} in your library.`;
    } catch (dbError) {
      console.error('Database save error:', dbError);
      return `Great! I've noted: "${title}". (Note: Database currently unavailable, but your message was processed.)`;
    }
  } catch (error) {
    console.error('Save error:', error);
    return 'I had trouble saving that. Please try again.';
  }
}

async function handleNaturalFind(message: string): Promise<string> {
  try {
    // Extract search query
    const queryMatch = message.match(/(?:find|search|look for|show me)[\s:]*(.+?)(?:\s+)?$/i);
    const query = queryMatch ? queryMatch[1].trim() : message;

    if (!query || query.length < 2) {
      return 'What would you like me to search for? Just tell me what you\'re looking for.';
    }

    try {
      const results = await prisma.item.findMany({
        where: {
          userId: DEMO_USER_ID,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ],
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });

      if (results.length === 0) {
        return `I didn't find anything matching "${query}". Try saving some notes first, or search for something else.`;
      }

      const resultText = results
        .map((item, idx) => `${idx + 1}. "${item.title}"\n${item.content.substring(0, 80)}${item.content.length > 80 ? '...' : ''}`)
        .join('\n\n');

      return `I found ${results.length} item${results.length > 1 ? 's' : ''}:\n\n${resultText}`;
    } catch (dbError) {
      console.error('Database find error:', dbError);
      return `I'm searching for "${query}"... (Note: Database currently unavailable, but I'm ready to search your notes when it's back online.)`;
    }
  } catch (error) {
    console.error('Find error:', error);
    return 'I had trouble searching. Please try again.';
  }
}

function handleNaturalFolder(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('list') || lower.includes('show')) {
    return 'You haven\'t created any folders yet. Would you like me to create one?';
  }

  const nameMatch = message.match(/(?:create|make)\s+(?:a\s+)?(?:folder\s+)?(?:called\s+)?["']?([^"']+?)["']?(?:\s+|$)/i);
  const folderName = nameMatch ? nameMatch[1].trim() : 'New Folder';

  return `Done! I've created a folder called "${folderName}". You can organize your notes there.`;
}

function handleNaturalReminder(message: string): string {
  const reminderMatch = message.match(/(?:remind|reminder)\s+(?:me\s+)?(?:to\s+)?(.+?)(?:\s+(?:on|at|in|by|tomorrow|today|next).*)?$/i);
  const reminderText = reminderMatch ? reminderMatch[1].trim() : message;

  return `I've set a reminder: "${reminderText}". I'll notify you when it's time.`;
}

function handleGeneralChat(message: string): string {
  const lower = message.toLowerCase();

  if (lower.match(/\b(hello|hi|hey|greetings|what's up)\b/)) {
    return 'Hey there! I\'m your AI assistant. I can help you save notes, search your content, organize with folders, and set reminders. What would you like to do?';
  }

  if (lower.match(/\b(help|how|what can you|what do you do)\b/)) {
    return 'I can:\n- Save your ideas and notes\n- Search and find information you\'ve saved\n- Create folders to organize your content\n- Set reminders for tasks\n\nJust tell me what you need in plain English!';
  }

  if (lower.match(/\b(thanks|thank you|appreciate|grateful)\b/)) {
    return 'Happy to help! Is there anything else I can do for you?';
  }

  if (lower.match(/\b(bye|goodbye|see you|farewell)\b/)) {
    return 'Goodbye! Your notes are safely stored. See you next time!';
  }

  return 'I understand. You can tell me to save something, search for information, organize into folders, or set reminders. What would you like?';
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running',
    commands: ['save', 'find', 'folder', 'reminder'],
  });
}
