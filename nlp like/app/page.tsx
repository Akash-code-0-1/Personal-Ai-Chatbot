'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, HelpCircle, Trash2, Sparkles, Clock, BookOpen, FolderOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  command?: string;
  displayTime: string;
}

const SAMPLE_PROMPTS = [
  'Save my current project ideas for later review',
  'Find all notes about productivity and workflows',
  'Show me my saved learning resources',
  'Organize my work projects into folders',
  'What tasks do I need to complete today?',
  'Create a reminder for my team meeting',
  'Search for important research papers',
  'Help me categorize my recent notes',
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hi! I\'m your AI knowledge assistant. I can help you save ideas, organize content, find information, and manage your knowledge base. What would you like to do today?',
    isUser: false,
    displayTime: '03:50 PM',
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      isUser: true,
      displayTime: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: data.response,
        isUser: false,
        command: data.command,
        displayTime: getCurrentTime(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Error processing command. Please try again.',
        isUser: false,
        displayTime: getCurrentTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'welcome',
        text: 'Chat cleared. Ready for new commands!',
        isUser: false,
        displayTime: getCurrentTime(),
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <header className="border-b bg-card/50 backdrop-blur-sm p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Advanced Chat Bot</h1>
              <p className="text-xs text-muted-foreground">Powered by NeonDB</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowHelp(!showHelp)} className="gap-2">
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
            <Button variant="outline" size="sm" onClick={clearMessages} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-4 overflow-hidden max-w-7xl mx-auto w-full p-4">
        {showHelp && (
          <div className="w-80 border rounded-xl overflow-y-auto bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Commands
            </h2>
            <div className="space-y-3">
              <CommandHelp icon={<Sparkles className="w-4 h-4" />} name="/save" desc="Save notes and ideas" />
              <CommandHelp icon={<Clock className="w-4 h-4" />} name="/find" desc="Search your content" />
              <CommandHelp icon={<FolderOpen className="w-4 h-4" />} name="/folder" desc="Manage folders" />
              <CommandHelp icon={<Sparkles className="w-4 h-4" />} name="/reminder" desc="Set reminders" />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 bg-card/30 rounded-xl p-4 border flex flex-col">
            {messages.length === 1 ? (
              <div className="flex-1 flex flex-col justify-center">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-8`}>
                    <Card className="max-w-md px-4 py-3 rounded-2xl border bg-card text-foreground rounded-tl-none border-border">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 text-muted-foreground">{message.displayTime}</p>
                    </Card>
                  </div>
                ))}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">Try asking me:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {SAMPLE_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInput(prompt);
                          setTimeout(() => {
                            const form = document.querySelector('form') as HTMLFormElement;
                            if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
                          }, 0);
                        }}
                        className="text-left p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors text-sm text-foreground"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <Card
                      className={`max-w-md px-4 py-3 rounded-2xl border transition-all ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground rounded-tr-none shadow-md'
                          : 'bg-card text-foreground rounded-tl-none border-border'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.command && (
                        <div className="mt-2 pt-2 border-t border-opacity-30 border-current">
                          <Badge variant="secondary" className="text-xs">{message.command}</Badge>
                        </div>
                      )}
                      <p className={`text-xs mt-1 ${message.isUser ? 'opacity-70' : 'text-muted-foreground'}`}>
                        {message.displayTime}
                      </p>
                    </Card>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="animate-pulse text-muted-foreground text-sm px-4">Bot is typing...</div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything - save notes, find information, organize content..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function CommandHelp({ icon, name, desc }: { icon: React.ReactNode; name: string; desc: string }) {
  return (
    <div className="p-2 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-muted-foreground">{icon}</span>
        <p className="font-semibold text-sm">{name}</p>
      </div>
      <p className="text-xs text-muted-foreground ml-6">{desc}</p>
    </div>
  );
}
