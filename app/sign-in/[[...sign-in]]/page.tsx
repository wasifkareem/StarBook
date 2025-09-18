import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <>
      <div className=" w-full flex justify-center md:mt-20 h-screen">
        <SignIn forceRedirectUrl="/app" />
      </div>
    </>
  );
}
