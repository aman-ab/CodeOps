import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<p>Loading sign in page...</p>}>
      <SignInForm />
    </Suspense>
  );
}
