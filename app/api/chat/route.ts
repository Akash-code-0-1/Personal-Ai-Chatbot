import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as chrono from 'chrono-node';

const prisma = new PrismaClient();
const DEMO_USER_ID = 'demo-user-1';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // 1. Enhanced System Instructions
    const systemPrompt = `
      You are a Productivity OS. Translate user requests into these exact commands:
      - /save Title: Content (For notes)
      - /find Query (Keyword search)
      - /folder create Name (New folder)
      - /task add Title: Priority (Priority: Low, Medium, High)
      - /remind Topic: Time (e.g., /remind Call Mom: tomorrow at 5pm)
      - /stats (For productivity overview)
      Reply in a friendly, concise way.
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "System Active. I will parse your commands." }] },
          { role: "user", parts: [{ text: message }] }
        ],
        generationConfig: { temperature: 0.1 }
      }),
    });

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text.trim();

    // 2. Command Execution Logic
    let finalResponse = aiResponse;
    let detectedCommand = undefined;

    if (aiResponse.startsWith('/')) {
      const lines = aiResponse.split('\n');
      const commandLine = lines[0].trim();
      const friendlyText = lines.slice(1).join('\n').trim();

      const dbFeedback = await executeDatabaseLogic(commandLine);
      finalResponse = `${dbFeedback}\n\n${friendlyText}`;
      detectedCommand = commandLine.split(' ')[0];
    }

    // 3. Log user message
    await prisma.message.create({
      data: { content: message, role: 'user', userId: DEMO_USER_ID }
    });

    return NextResponse.json({ response: finalResponse, command: detectedCommand });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ response: `Error: ${error.message}` }, { status: 500 });
  }
}

async function executeDatabaseLogic(cmdLine: string): Promise<string> {
  const userId = DEMO_USER_ID;
  try {
    // REMINDER LOGIC (With Chrono-Node)
    if (cmdLine.startsWith('/remind')) {
      const parts = cmdLine.replace('/remind', '').trim().split(':');
      const title = parts[0].trim();
      const timeStr = parts[1]?.trim() || "tomorrow";
      
      const parsedDate = chrono.parseDate(timeStr);
      if (!parsedDate) return "⚠️ I couldn't understand that time. Try 'tomorrow at 5pm'.";

      await prisma.reminder.create({
        data: { title, content: `Reminder for ${title}`, dueDate: parsedDate, userId }
      });
      return `⏰ Reminder set: **${title}** for ${parsedDate.toLocaleString()}`;
    }

    // TASK LOGIC
    if (cmdLine.startsWith('/task add')) {
      const parts = cmdLine.replace('/task add', '').trim().split(':');
      const title = parts[0].trim();
      const priority = parts[1]?.trim() || "Medium";
      
      await prisma.item.create({
        data: { title, content: `Task [Priority: ${priority}]`, tags: ['task', priority], userId }
      });
      return `✅ Task Added: **${title}**`;
    }

    // STATS LOGIC (Chart Data)
    if (cmdLine.startsWith('/stats')) {
      const [itemCount, folderCount, reminderCount] = await Promise.all([
        prisma.item.count({ where: { userId } }),
        prisma.folder.count({ where: { userId } }),
        prisma.reminder.count({ where: { userId, completed: false } }),
      ]);
      return `📊 **Your Stats:**\n- Items: ${itemCount}\n- Folders: ${folderCount}\n- Pending Reminders: ${reminderCount}`;
    }

    // EXISTING /save, /find, /folder logic...
    if (cmdLine.startsWith('/save')) {
        const parts = cmdLine.replace('/save', '').trim().split(':');
        await prisma.item.create({ data: { title: parts[0], content: parts[1] || '', userId }});
        return `💾 Saved: ${parts[0]}`;
    }

    return "⚙️ Command Processed.";
  } catch (err) {
    return "❌ Database connection error.";
  }
}