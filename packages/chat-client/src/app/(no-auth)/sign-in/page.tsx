import React from "react";
import SignInForm from "@/components/sign-in/SignInForm";
import GoogleLogin from "@/components/sign-in/GoogleLogin";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] bg-sign-in bg-cover bg-no-repeat bg-[rgba(0,0,0,0.2)] justify-center items-center bg-blend-darken">
      <div className="border-gray-200 bg-gray-50 h-fit border-[1px] p-5 rounded-md flex flex-col justify-center items-center space-y-5">
        <p>Welcome !</p>
        <SignInForm />
        <p>OR</p>
        <GoogleLogin />
        <p className="text-xs">
          new to platform?{" "}
          <Link href={"/sign-up"} className="underline">
            {" "}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
