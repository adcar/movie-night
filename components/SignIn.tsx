import { ApiError } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formStyle = `
mt-1
block
w-full
rounded-md
border-gray-300
shadow-sm
focus:border-red-500
focus:ring
focus:ring-red-500
focus:ring-opacity-100
bg-slate-800
border-transparent
text-white
transition
duration-250
ease-in-out
`;

export default function SignIn({ isSignup, onSubmit }: Props) {
  const [email, setEmail]: [null | string, any] = useState(null);
  const [password, setPassword]: [null | string, any] = useState(null);
  const [isValid, setValid] = useState(!isSignup);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const title = isSignup ? "Sign up" : "Sign in";

  return (
    <div className="container mx-auto box-border px-4">
      <ToastContainer />
      <div className="mx-auto w-96">
        <h1 className="mt-12 text-center text-8xl font-bold text-white">
          {title}
        </h1>
        <form
          className="mt-12"
          onSubmit={async (e: SyntheticEvent) => {
            e.preventDefault();
            if (isValid && email !== null && password !== null) {
              setLoading(true);

              const error = await onSubmit({ email, password });
              console.log(error);

              if (error) {
                toast.error("Error: " + error.message);
                setLoading(false);
              } else {
                router.push("/dashboard");
              }
            }
          }}
        >
          <label className="block">
            <span className="text-slate-300">Email address</span>
            <input
              type="email"
              className={formStyle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>
          <label className="mt-4 block">
            <span className="text-slate-300">Password</span>
            <input
              type="password"
              className={formStyle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </label>
          {isSignup ? (
            <label className="mt-4 block">
              <span className="text-slate-300">Confirm Password</span>
              <input
                type="password"
                className={formStyle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value === password) {
                    setValid(true);
                    e.target.setCustomValidity("");
                  } else {
                    setValid(false);
                    e.target.setCustomValidity("Passwords don't match");
                  }
                }}
                required
              />
            </label>
          ) : (
            ""
          )}

          <button className="duration-250 mt-8 w-full rounded-md border-purple-200 bg-red-500 py-2 px-5 font-bold uppercase text-white drop-shadow-md transition ease-in-out hover:border-transparent hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-400">
            {isLoading ? (
              <SyncLoader color={"white"} size={7} speedMultiplier={0.7} />
            ) : (
              title
            )}
          </button>
          {isSignup ? (
            <p className="mt-6 text-center text-slate-300">
              Already have an account?{" "}
              <Link href="/signin">
                <a className="font-bold text-red-500 hover:underline">
                  Sign in →
                </a>
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-center text-slate-300">
              Don’t have an account?{" "}
              <Link href="/signup">
                <a className="font-bold text-red-500 hover:underline">
                  Sign up →
                </a>
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export type OnSubmit = (credentials: {
  email: string;
  password: string;
}) => Promise<ApiError | null>;

interface Props {
  isSignup: boolean;
  onSubmit: OnSubmit;
}
