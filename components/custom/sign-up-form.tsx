"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase/crud"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
})

type FormData = z.infer<typeof formSchema>

const SignUp = () => {
  const [createUserWithEmailAndPassword, , error] =
    useCreateUserWithEmailAndPassword(auth)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createUserWithEmailAndPassword(
        data.email,
        data.password
      )
      console.log({ res })
      sessionStorage.setItem("user", "true")
      form.reset()
    } catch (e) {
      console.error("Error:", e)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-gray-700 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-center text-white text-3xl mb-5">Sign Up</h1>
        <br />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-100 text-1xl mb-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-100 text-1xl mb-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <br />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <p className="text-white mt-4">
            Already have an account?{" "}
            <Link className="text-indigo-500" href="/sign-in">
              Sign In
            </Link>
          </p>
        </Form>
      </div>
    </main>
  )
}

export default SignUp
