
'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Package, SendHorizonal, Bot, User, X, Sparkles, AlertCircle } from 'lucide-react';
import { expertChat, type ExpertChatInput } from '@/ai/flows/expert-chat-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getPetsByOwnerId } from '@/lib/data';

type Message = {
  role: 'user' | 'model';
  content: string;
};

// Mock function to check if it's the first visit
const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // This check ensures localStorage is only accessed on the client side.
    if (typeof window !== 'undefined') {
      const visited = localStorage.getItem('pheuanpet-vetconnect-visited');
      if (!visited) {
        setIsFirstVisit(true);
        localStorage.setItem('pheuanpet-vetconnect-visited', 'true');
      }
    }
  }, []);

  return isFirstVisit;
};


export default function VetConnectPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'สวัสดีครับ! PheuanPet VetConnect ยินดีต้อนรับ มีอะไรให้ช่วยปรึกษาเกี่ยวกับสัตว์เลี้ยงของคุณบ้างครับ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(25); // Mock token count
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>();
  
  const isFirstVisit = useFirstVisit();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  useEffect(() => {
    setShowDisclaimer(isFirstVisit);
  }, [isFirstVisit]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userPets = getPetsByOwnerId(1); // Mocking user ID 1

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || tokens <= 0) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // Mock token deduction
    const tokenCost = Math.max(1, Math.min(5, Math.ceil(input.length / 50)));
    if (tokens < tokenCost) {
        toast({
          variant: 'destructive',
          title: 'Token ไม่เพียงพอ',
          description: 'โปรดเติม Token เพื่อสนทนาต่อ',
        });
        setIsLoading(false);
        setMessages(messages); // revert messages
        return;
    }

    try {
      const petContext = selectedPetId ? `\n(Context: This question is about my pet, ${userPets.find(p => p.id.toString() === selectedPetId)?.name}, a ${userPets.find(p => p.id.toString() === selectedPetId)?.breed}.)` : '';
      const chatHistory: ExpertChatInput = { history: [...newMessages.slice(0, -1), { role: 'user', content: input + petContext }] };
      const aiResponse = await expertChat(chatHistory);

      setMessages(prev => [...prev, { role: 'model', content: aiResponse }]);
      setTokens(prev => prev - tokenCost);
    } catch (error) {
      console.error("AI Error:", error);
      toast({
        variant: 'destructive',
        title: 'AI Error',
        description: 'ไม่สามารถเชื่อมต่อกับบริการได้ โปรดลองอีกครั้ง',
      });
      setMessages(messages); // Revert messages on error
    } finally {
      setIsLoading(false);
    }
  };

  const getTokenColor = () => {
    if (tokens <= 3) return 'text-red-500';
    if (tokens <= 10) return 'text-yellow-500';
    return 'text-green-500';
  };
  
  const estimatedTokens = Math.max(1, Math.min(5, Math.ceil(input.length / 50)));

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Header />
      
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex justify-between items-center p-4 border-b">
            <h1 className="font-headline text-2xl md:text-3xl font-bold">ปรึกษาคุณหมอออนไลน์</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className={cn("font-bold text-lg", getTokenColor())}>
                        <Sparkles className="mr-2 h-5 w-5"/>
                        <span className="hidden sm:inline">คงเหลือ:</span> {tokens} <span className="hidden sm:inline ml-1">Token</span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Package className="h-6 w-6 text-primary"/>เลือกแพ็กเกจ Token</DialogTitle>
                         <DialogDescription>
                            เติม Token เพื่อให้คุณสามารถปรึกษาผู้เชี่ยวชาญของเราได้อย่างต่อเนื่อง
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <Card className="hover:border-primary transition-colors">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">20 Tokens</h3>
                                    <p className="text-muted-foreground">฿59</p>
                                </div>
                                <Button>ซื้อเลย</Button>
                            </CardContent>
                        </Card>
                         <Card className="border-primary relative overflow-hidden hover:border-amber-500 transition-colors">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">คุ้มกว่า!</div>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">50 Tokens</h3>
                                    <p className="text-muted-foreground">฿129</p>
                                </div>
                                <Button>ซื้อเลย</Button>
                            </CardContent>
                        </Card>
                         <Card className="hover:border-primary transition-colors">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">100 Tokens</h3>
                                    <p className="text-muted-foreground">฿249</p>
                                </div>
                                <Button>ซื้อเลย</Button>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* Disclaimer */}
        {showDisclaimer && (
          <Alert className="m-4 rounded-lg border-amber-400 bg-amber-50/50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="font-bold text-amber-800">ยินดีต้อนรับสู่ PheuanPet VetConnect!</AlertTitle>
            <AlertDescription className="text-amber-700 space-y-1">
              <p>บริการนี้ออกแบบมาเพื่อการให้คำปรึกษาเบื้องต้นเท่านั้น</p>
              <p className="font-semibold">คำเตือน: นี่ไม่ใช่การวินิจฉัยทางการแพทย์ โปรดไปพบสัตวแพทย์หากมีอาการฉุกเฉิน</p>
            </AlertDescription>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => setShowDisclaimer(false)}>
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message, index) => (
            <div key={index} className={cn("flex items-end gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'model' && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={'https://placehold.co/100x100.png'} alt="AI Vet" data-ai-hint="robot doctor"/>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={cn(
                "p-3 rounded-2xl max-w-md shadow-sm",
                message.role === 'user' 
                  ? 'bg-primary/20 text-foreground rounded-br-none' 
                  : 'bg-muted text-foreground rounded-bl-none'
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={
                    selectedPetId 
                    ? userPets.find(p => p.id.toString() === selectedPetId)?.avatarUrl 
                    : 'https://placehold.co/100x100.png'
                  } alt="User" data-ai-hint="person" />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarImage src={'https://placehold.co/100x100.png'} alt="AI Vet" data-ai-hint="robot doctor"/>
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-2xl bg-muted rounded-bl-none flex gap-1.5 items-center shadow-sm">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background/80 backdrop-blur sticky bottom-0">
            {tokens <= 5 && tokens > 0 && (
                <Alert variant="destructive" className="mb-3 bg-yellow-50 border-yellow-300 text-yellow-800">
                    <AlertCircle className="h-4 w-4 !text-yellow-600"/>
                    <AlertTitle>Token ใกล้หมดแล้ว!</AlertTitle>
                    <AlertDescription>
                       เติม Token เพื่อให้การสนทนาไม่สะดุด
                    </AlertDescription>
                </Alert>
            )}
             <form onSubmit={handleSendMessage} className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                     <div className="flex items-center gap-3">
                        <Select onValueChange={setSelectedPetId} value={selectedPetId} disabled={isLoading || tokens <= 0}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="เลือกสัตว์เลี้ยง" />
                            </SelectTrigger>
                            <SelectContent>
                                {userPets.map(pet => (
                                    <SelectItem key={pet.id} value={String(pet.id)}>{pet.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={tokens <= 0 ? "Token ของคุณหมดแล้ว" : "พิมพ์คำถามของคุณที่นี่..."}
                            className="flex-1 resize-none"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e as any);
                                }
                            }}
                            disabled={isLoading || tokens <= 0}
                        />
                     </div>
                     <p className="text-xs text-muted-foreground h-4">
                        {input && tokens > 0 ? `คำถามนี้จะใช้ประมาณ ${estimatedTokens} Token ในการตอบกลับ` : ''}
                    </p>
                </div>
                {tokens > 0 ? (
                    <Button type="submit" size="icon" className="h-10 w-10 flex-shrink-0" disabled={isLoading || !input.trim()}>
                        <SendHorizonal className="h-5 w-5" />
                        <span className="sr-only">Send</span>
                    </Button>
                ) : (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-10 flex-shrink-0" variant="destructive">
                                <Package className="mr-2 h-4 w-4" /> เติม Token
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2"><Package className="h-6 w-6 text-primary"/>เลือกแพ็กเกจ Token</DialogTitle>
                                 <DialogDescription>
                                    เติม Token เพื่อให้คุณสามารถปรึกษาผู้เชี่ยวชาญของเราได้อย่างต่อเนื่อง
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Card className="hover:border-primary transition-colors">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-lg">20 Tokens</h3>
                                            <p className="text-muted-foreground">฿59</p>
                                        </div>
                                        <Button>ซื้อเลย</Button>
                                    </CardContent>
                                </Card>
                                 <Card className="border-primary relative overflow-hidden hover:border-amber-500 transition-colors">
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">คุ้มกว่า!</div>
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-lg">50 Tokens</h3>
                                            <p className="text-muted-foreground">฿129</p>
                                        </div>
                                        <Button>ซื้อเลย</Button>
                                    </CardContent>
                                </Card>
                                 <Card className="hover:border-primary transition-colors">
                                    <CardContent className="p-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-lg">100 Tokens</h3>
                                            <p className="text-muted-foreground">฿249</p>
                                        </div>
                                        <Button>ซื้อเลย</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </form>
        </div>
      </main>
    </div>
  );
}

    