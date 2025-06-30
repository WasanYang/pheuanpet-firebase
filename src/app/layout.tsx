import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ChatProvider } from '@/context/ChatProvider';
import ChatContainer from '@/components/ChatContainer';
import Sidebar from '@/components/Sidebar';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "PheuanPet: Your Pet's Social Universe",
  description: "A social universe for your beloved pets, where every paw, feather, and scale has a story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={cn("font-body antialiased", inter.variable)}>
        <ChatProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 w-0">
                {children}
            </div>
          </div>
          <ChatContainer />
        </ChatProvider>
        <Toaster />
      </body>
    </html>
  );
}
