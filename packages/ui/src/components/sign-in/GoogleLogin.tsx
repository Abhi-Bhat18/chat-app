import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BASE_URL } from "@/lib/api";

const GoogleLogin = () => {
  return (
    <div className="w-64">
      <Link href={`${BASE_URL}/auth/google`}>
        <Button className="w-full space-x-2">
          {" "}
          <FcGoogle /> <span>Sign in with Google</span>
        </Button>
      </Link>
    </div>
  );
};

export default GoogleLogin;
