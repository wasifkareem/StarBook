import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className=" flex justify-center items-center pt-16 pb-10">
      <SignIn fallbackRedirectUrl="/app" signUpUrl="/sign-up" path="/sign-in" />
    </div>
  );
}
