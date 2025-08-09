import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className=" flex justify-center items-center pt-16 pb-10">
      <SignUp fallbackRedirectUrl="/app" path="/sign-up" />
    </div>
  );
}
