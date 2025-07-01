import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { ChatProvider } from '@/context/ChatProvider';
import ChatContainer from '@/components/ChatContainer';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';

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
          <div className="bg-background min-h-screen">
            <Header />
            <div className="container max-w-screen-2xl mx-auto flex justify-center gap-8 px-4">
              <Sidebar />
              <main className="w-full max-w-[738px] py-6">
                {children}
              </main>
              <RightSidebar />
            </div>
            <ChatContainer />
          </div>
        </ChatProvider>
        <Toaster />
      </body>
    </html>
  );
}
