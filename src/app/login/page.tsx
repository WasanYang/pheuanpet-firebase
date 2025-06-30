import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-sm shadow-sm border bg-card/80">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Welcome Back!</CardTitle>
            <CardDescription>Log in to continue to PheuanPet.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full">
              <AppleIcon className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
