import { useState } from "react";
import style from "./Form.module.css";
import { LoginApi, SignUpApi } from "../../api";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const Form = () => {
  const [formToggle, setFormToggle] = useState(true);
  const [anime, setanime] = useState<null | boolean>(null);
  const navigate = useNavigate();
  const Loginmutation = useMutation({
    mutationFn: LoginApi,
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
    onSuccess: () => {
      toast.success("Login successfull");
      navigate({ to: "/" });
    },
  });

  const Signupmutation = useMutation({
    mutationFn: SignUpApi,
    onSuccess: (data) => {
      toast.success(data?.message);
      setTimeout(() => {
        toast.success("Email will expire in 15 min");
      }, 2500);
      setanime(false);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.userid as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;
    Loginmutation.mutate({ email: email, password: password });
    e.currentTarget.reset();
  };
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;
    const password2 = (e.currentTarget.confirm_password as HTMLInputElement)
      .value;
    Signupmutation.mutate({
      email: email,
      password: password,
      password2: password2,
    });
    e.currentTarget.reset();
  };

  return (
    <>
      <div
        id="forms"
        className={` ${style.form} [box-shadow:0px_.5rem_1rem_rgba(0,0,0,0.05)] h-max transition-all border rounded-[.5rem] flex flex-col gap-[1rem] min-w-[19rem] p-[2rem_1rem] mt-[4rem]`}
      >
        {formToggle ? (
          <form
            onSubmit={handleLogin}
            className={`flex flex-col gap-[1.25rem] min-w-[100%] ${anime != null && (anime ? style.fadeoutleft : style.fadeinleft)}`}
            onAnimationEnd={() => {
              if (anime) setFormToggle(false);
            }}
          >
            <h3 className="text-[1.6rem] font-medium underline">Login</h3>
            <div className="userid mt-[.5rem]">
              <input
                disabled={Loginmutation.isPending}
                className="text-[.9rem] border outline-none focus:border-[.1rem] w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] cursor-pointer"
                type="text"
                name="userid"
                id="userid"
                placeholder="User ID"
              />
            </div>
            <div className="password">
              <input
                disabled={Loginmutation.isPending}
                className="text-[.9rem] border focus:border-[.1rem] outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="submit text-center mt-[.75rem]">
              <button
                type="submit"
                disabled={Loginmutation.isPending}
                className=" text-amber-50 text-[.9rem]  bg-black w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] cursor-pointer flex justify-center items-center"
              >
                {Loginmutation.isPending ? (
                  <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin text-center"></div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <hr />
            <div className="register text-[.9rem] text-center">
              Don't have an account?&nbsp;
              <button
                type="button"
                onClick={() => {
                  document.querySelector("form")?.reset();
                  setanime(true);
                }}
                disabled={Loginmutation.isPending || Signupmutation.isPending}
                className="cursor-pointer text-blue-500"
              >
                Signup
              </button>
            </div>
          </form>
        ) : (
          <form
            className={`flex flex-col gap-[1rem] min-w-[100%] ${anime ? style.fadeinright : style.fadeoutright}`}
            onSubmit={handleSignup}
            onAnimationEnd={() => {
              if (!anime) setFormToggle(true);
            }}
          >
            <h3 className="text-[1.6rem] font-medium underline">Signup</h3>
            <div className="userid mt-[.5rem]">
              <input
                disabled={Signupmutation.isPending}
                className="text-[.9rem] border focus:border-[.1rem] outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] cursor-pointer"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="password">
              <input
                disabled={Signupmutation.isPending}
                className="text-[.9rem] border focus:border-[.1rem] outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="password">
              <input
                disabled={Signupmutation.isPending}
                className="text-[.9rem] border focus:border-[.1rem] outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="Confirm password"
              />
            </div>
            <div className="submit text-center mt-[.75rem]">
              <button
                disabled={Signupmutation.isPending}
                type="submit"
                className="text-amber-50 text-[.9rem] bg-black w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] flex justify-center items-center cursor-pointer"
              >
                {Signupmutation.isPending ? (
                  <div className="w-6 h-6 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin text-center"></div>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
            <hr />
            <div className="register text-[.9rem] text-center">
              Already have an account?&nbsp;
              <button
                type="button"
                disabled={Loginmutation.isPending || Signupmutation.isPending}
                onClick={() => {
                  document.querySelector("form")?.reset();
                  setanime(false);
                }}
                className="cursor-pointer text-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        )}

        <div className="google text-center border rounded-[.35rem] p-[.35rem_1rem] cursor-pointer">
          <button
            className="text-[.9rem]"
            disabled={Loginmutation.isPending || Signupmutation.isPending}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};
