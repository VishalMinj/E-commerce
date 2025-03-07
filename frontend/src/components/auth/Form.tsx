import { useState } from "react";
import style from "./Form.module.css";

export const Form = () => {
  const [formToggle, setFormToggle] = useState(true);
  const [anime, setanime] = useState<null|boolean>(null);

  return (
    <>
      <div
        id="forms"
        className={`[box-shadow:0px_.5rem_1rem_rgba(0,0,0,0.05)] h-max transition-all border rounded-[.5rem] flex flex-col gap-[1rem] min-w-[19rem] p-[2rem_1rem] mt-[4rem]`}
      >
        {formToggle ? (
          <form
            className={`flex flex-col gap-[1.25rem] min-w-[100%] ${anime!=null && (anime ? style.fadeoutleft : style.fadeinleft)}`}
            
            onAnimationEnd={() => {
              if(anime)
              setFormToggle(false)
            }}
          >
            <h3 className="text-[1.6rem] font-medium underline">Login</h3>
            <div className="userid mt-[.5rem]">
              <input
                className="border outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] cursor-pointer"
                type="text"
                name="userid"
                id="userid"
                placeholder="User ID"
              />
            </div>
            <div className="password">
              <input
                className="border outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="submit text-center mt-[.75rem]">
              <button
                type="submit"
                className="text-amber-50 bg-black w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
              >
                Login
              </button>
            </div>
            <hr />
            <div className="register text-[.9rem] text-center">
              Don't have an account?&nbsp;
              <button
                type="button"
                onClick={() => setanime(true)}
                className="cursor-pointer text-blue-500"
              >
                Signup
              </button>
            </div>
          </form>
        ) : (
          <form
            className={`flex flex-col gap-[1rem] min-w-[100%] ${anime ? style.fadeinright : style.fadeoutright}`}
            onAnimationEnd={() =>{
              if(!anime)
               setFormToggle(true)
            }}
          >
            <h3 className="text-[1.6rem] font-medium underline">Signup</h3>
            <div className="userid mt-[.5rem]">
              <input
                className="border outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem] cursor-pointer"
                type="email"
                name="userid"
                id="userid"
                placeholder="Email"
              />
            </div>
            <div className="password">
              <input
                className="border outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="password">
              <input
                className="border outline-none w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
                type="password"
                name="password"
                id="confirm-password"
                placeholder="Confirm password"
              />
            </div>
            <div className="submit text-center mt-[.75rem]">
              <button
                type="submit"
                className="text-amber-50 bg-black w-[100%] h-[100%] p-[.35rem_.75rem] rounded-[.35rem]  cursor-pointer"
              >
                Signup
              </button>
            </div>
            <hr />
            <div className="register text-[.9rem] text-center">
              Already have an account?&nbsp;
              <button
                type="button"
                onClick={() => setanime(false)}
                className="cursor-pointer text-blue-500"
              >
                Login
              </button>
            </div>
          </form>
        )}

        <div className="google text-center border rounded-[.35rem] p-[.35rem_1rem] cursor-pointer">
          <button>Continue with Google</button>
        </div>
      </div>
    </>
  );
};
