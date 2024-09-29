import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from './../http/api';
import { useToast } from '@/hooks/use-toast';
import useTokenStore from '@/store';

export const description =
  "A simple register form with email and password. The submit button says 'Sign in'."

export function Register() {

  const navigate = useNavigate();
  const { toast } = useToast();
  const setToken = useTokenStore((state)=> state.setToken);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      setToken(res.data.accessToken);
      console.log("register success");
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

  const handleRegisterSubmit = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(!name || !email || !password ){
      return alert('Please enter email and password')
    }
    mutation.mutate({ name, email, password });
    
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
            Enter your information to create an account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-2">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input ref={nameRef} id="name" placeholder="Max" required />
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input ref={passwordRef} id="password" type="password" />
            </div>
            <Button isLoading={mutation.isPending} onClick={handleRegisterSubmit} type="submit" className="w-full">
                Create an account
            </Button>
            <Button variant="outline" className="w-full">
                Sign up with GitHub
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
                Sign in
            </Link>
            </div>
        </CardContent>
        </Card>
    </section>
  )
}
