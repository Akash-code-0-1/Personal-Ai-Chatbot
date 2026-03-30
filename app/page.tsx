'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Sparkles, LayoutDashboard, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🎤 WEB SPEECH API INTEGRATION
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support voice.");

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.start();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { text: userText, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.response, isUser: false, command: data.command }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="p-4 bg-white border-b flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <LayoutDashboard className="w-6 h-6" /> Personal AI OS
        </div>
      </header>

      {/* Chat Space */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${m.isUser ? 'bg-primary text-white' : 'bg-white border text-slate-800'}`}>
              <p className="text-sm">{m.text}</p>
              {m.command && <span className="text-[10px] uppercase font-bold opacity-50 block mt-2">Action: {m.command}</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex gap-2">
          <Button 
            type="button" 
            variant={isListening ? "destructive" : "outline"}
            onClick={startListening}
            className="rounded-full w-12 h-12 p-0"
          >
            {isListening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
          </Button>
          
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or say 'Remind me to...'"
            className="flex-1 rounded-full px-6"
          />
          
          <Button type="submit" disabled={isLoading} className="rounded-full w-12 h-12 p-0">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}