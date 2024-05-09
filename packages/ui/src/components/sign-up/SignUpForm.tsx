"use client";
import React, { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@/lib/features/auth/authApiSlice";
import { Checkbox } from "@/components/ui/checkbox";

const signUpFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "password length should be 8 or more",
  }),
});

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [signUp, { data, error, isLoading }] = useSignupMutation();

  const onSubmit = async () => {
    try {
      console.log("Sign up with these details", form.getValues());

      const response = await signUp(form.getValues());

      console.log("Response", response);
    } catch (error) {
      console.log("Error", error);
    }
    // submit the apis
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-96">
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="Abhishek" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LastName</FormLabel>
                <FormControl>
                  <Input placeholder="Bhat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@gmail.com" {...field} />
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
              <FormLabel>Passsword</FormLabel>
              <FormControl>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={showPassword}
            onCheckedChange={() => setShowPassword((prev) => !prev)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            show password
          </label>
        </div>
        <Button disabled={isLoading} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
