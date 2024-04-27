import GoogleLogin from "@/components/sign-in/GoogleLogin";
import SignUpForm from "@/components/sign-up/SignUpForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] bg-sign-in bg-cover bg-no-repeat bg-[rgba(0,0,0,0.2)] justify-center items-center bg-blend-darken">
      <div className="border-gray-200 bg-gray-50 h-fit border-[1px] p-5 rounded-md flex flex-col justify-center items-center space-y-5">
        <p>Welcome to ChatC</p>
        <SignUpForm />
        <p>OR</p>
        <GoogleLogin />
        <p className="text-xs">
          already have an account?{" "}
          <Link href={"/sign-in"} className="underline">
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
