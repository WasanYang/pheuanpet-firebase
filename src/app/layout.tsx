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
import { ThemeProvider } from '@/components/ThemeProvider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <div className="bg-background min-h-screen">
              <Header />
              <div className="container max-w-screen-2xl mx-auto flex justify-center gap-x-6">

                {/* Left Sidebar */}
                <div className="w-64 flex-shrink-0 hidden md:block">
                  <aside className="sticky top-20 h-[calc(100vh-5rem)]">
                    <Sidebar />
                  </aside>
                </div>
                
                {/* Middle Content */}
                <div className="min-w-0">
                  <main className="w-full max-w-[606px] md:max-w-[738px] py-6 px-4">
                    {children}
                  </main>
                </div>

                {/* Right Sidebar */}
                <div className="w-80 flex-shrink-0 hidden xl:block">
                  <aside className="sticky top-20 h-[calc(100vh-5rem)]">
                    <RightSidebar />
                  </aside>
                </div>
                
              </div>
              <ChatContainer />
            </div>
          </ChatProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
