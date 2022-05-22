import { ApiError } from "@supabase/supabase-js";
import SignIn from "../components/SignIn";
import { supabase } from "../utils/supabase";

export default function SignInRoute() {
  async function onSubmit({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<ApiError | null> {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    return error;
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 175px)",
      }}
    >
      <SignIn isSignup={false} onSubmit={onSubmit} />
    </div>
  );
}
