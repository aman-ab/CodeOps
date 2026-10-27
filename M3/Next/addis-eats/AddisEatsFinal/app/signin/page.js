import { Suspense } from "react";
import SignInForm from "./SignInForm";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="page max-w-md"><div className="skeleton h-80 w-full" /></div>}>
      <SignInForm />
    </Suspense>
  );
}
