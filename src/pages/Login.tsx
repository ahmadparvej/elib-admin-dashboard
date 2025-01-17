import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from './../http/api';
import { useToast } from '@/hooks/use-toast';
import useTokenStore from "@/store"

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'."

export function Login() {

  const navigate = useNavigate();
  const { toast } = useToast();
  const setToken = useTokenStore((state)=> state.setToken);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setToken(res.data.accessToken);
      console.log("login success");
      navigate('/dashboard/home')
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message
      })
    }
  })

  const handleLoginSubmit = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if( !email || !password ){
      return alert('Please enter email and password')
    }
    mutation.mutate({ email, password });
    
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input ref={emailRef} id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input ref={passwordRef} id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button isLoading={mutation.isPending} onClick={handleLoginSubmit} className="w-full">Sign in</Button>
          <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="underline">
                  Sign Up
              </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
    </section>
  )
}
