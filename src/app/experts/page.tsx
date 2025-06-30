
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Package, Search, Sparkles, MessageSquare, Bot, Star } from 'lucide-react';
import { useChat } from '@/context/ChatProvider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getExperts, type Expert } from '@/lib/data';

const ExpertCard = ({ expert, onConsult }: { expert: Expert, onConsult: (expert: Expert) => void }) => {
  return (
    <Card className="hover:border-primary transition-colors hover:shadow-lg w-full">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-20 w-20 border">
            <AvatarImage src={expert.avatarUrl} alt={expert.name} data-ai-hint={expert.isAi ? 'robot doctor' : 'person doctor'} />
            <AvatarFallback>{expert.isAi ? <Bot/> : expert.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow text-center sm:text-left">
            <h3 className="font-bold text-lg">{expert.name}</h3>
            <p className="text-primary font-semibold text-sm">{expert.specialty}</p>
            <p className="text-muted-foreground text-xs mt-1">{expert.description}</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                </div>
                <span>(1,248 รีวิว)</span>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
             <Button onClick={() => onConsult(expert)} className="w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4"/>
                ปรึกษาเลย
            </Button>
            <p className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {expert.isAi ? `${expert.costPerMessage} Token / คำถาม` : 'ออนไลน์'}
            </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function VetConnectDirectoryPage() {
  const { toast } = useToast();
  const { tokens, addTokens, openChat } = useChat();
  const [showTokenAlert, setShowTokenAlert] = useState(false);
  const experts = getExperts();

  const handleConsult = (expert: Expert) => {
    if (tokens > 0) {
      openChat(expert);
    } else {
      setShowTokenAlert(true);
    }
  };

  const handlePurchase = (amount: number, tokensToAdd: number) => {
    addTokens(tokensToAdd);
    toast({
        title: "เติม Token สำเร็จ!",
        description: `คุณได้รับ ${tokensToAdd} Token ใหม่`,
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/40 text-foreground">
      <Header />
      
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto animate-in fade-in duration-500 p-4">
        
        {/* Page Header */}
        <div className="flex justify-between items-center mb-4">
            <h1 className="font-headline text-2xl md:text-3xl font-bold">ค้นหาสัตวแพทย์</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className={cn("font-bold text-lg", tokens > 10 ? 'text-green-600' : tokens > 3 ? 'text-yellow-500' : 'text-red-500')}>
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
                                <DialogClose asChild>
                                    <Button onClick={() => handlePurchase(59, 20)}>ซื้อเลย</Button>
                                </DialogClose>
                            </CardContent>
                        </Card>
                         <Card className="border-primary relative overflow-hidden hover:border-amber-500 transition-colors">
                            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">คุ้มกว่า!</div>
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">50 Tokens</h3>
                                    <p className="text-muted-foreground">฿129</p>
                                </div>
                                 <DialogClose asChild>
                                    <Button onClick={() => handlePurchase(129, 50)}>ซื้อเลย</Button>
                                 </DialogClose>
                            </CardContent>
                        </Card>
                         <Card className="hover:border-primary transition-colors">
                            <CardContent className="p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">100 Tokens</h3>
                                    <p className="text-muted-foreground">฿249</p>
                                </div>
                                 <DialogClose asChild>
                                    <Button onClick={() => handlePurchase(249, 100)}>ซื้อเลย</Button>
                                 </DialogClose>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="ค้นหาสัตวแพทย์หรือคลินิก..."
                className="pl-10 h-11 text-base"
            />
        </div>

        {/* Vet Listing */}
        <div className="flex flex-col gap-0.5">
            {experts.map(expert => (
                <ExpertCard key={expert.id} expert={expert} onConsult={handleConsult} />
            ))}
        </div>
        
        <AlertDialog open={showTokenAlert} onOpenChange={setShowTokenAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Token ไม่เพียงพอ</AlertDialogTitle>
                    <AlertDialogDescription>
                        โปรดเติม Token เพื่อเริ่มต้นการสนทนา
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                    {/* In a real app, this would open the token purchase dialog */}
                    <AlertDialogAction onClick={() => toast({ title: "กรุณากดปุ่ม 'เติม Token' ที่มุมบนขวา" })}>
                       เข้าใจแล้ว
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
