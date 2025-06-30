import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-sm shadow-sm border bg-card/80">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Create an Account</CardTitle>
            <CardDescription>Join the PheuanPet universe today!</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FacebookIcon className="mr-2 h-5 w-5" />
              Sign up with Facebook
            </Button>
            <Button variant="outline" className="w-full">
              <AppleIcon className="mr-2 h-5 w-5" />
              Sign up with Apple
            </Button>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  OR
                </span>
              </div>
            </div>
             <p className="text-center text-xs text-muted-foreground">
                Email and password sign up is not yet supported.
             </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
