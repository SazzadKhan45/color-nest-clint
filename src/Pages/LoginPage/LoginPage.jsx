import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const LoginPage = () => {
  // All state
  const [toggleButton, setToggleButton] = useState(false);
  const [showPass, setShowPass] = useState(false);

  //
  return (
    <div className="flex items-center justify-center min-h-screen py-5">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl px-12">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center underline">
            Login Your Account
          </h2>
          {/* Google Login */}
          <div>
            <button className="btn w-full flex items-center justify-center gap-2 mt-3 text-lg">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>
          {/* Divider */}
          <div className="flex w-full flex-col -mb-4">
            <div className="divider">OR</div>
          </div>
          {/*Login form  */}
          <form>
            <fieldset className="fieldset">
              <label className="label text-lg">Your email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Enter Email"
                required
              />

              <div className={`${toggleButton ? "hidden" : "flex flex-col"}`}>
                <label className="label text-lg">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    className="input w-full"
                    placeholder="**********"
                    required
                  />
                  {showPass ? (
                    <FaEye
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
                    />
                  )}
                </div>
              </div>
              <div className={`${toggleButton ? "hidden" : "flex flex-col"}`}>
                <Link
                  onClick={() => setToggleButton(true)}
                  className="text-blue-600 font-medium pt-2 duration-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              {toggleButton ? (
                <button
                  type="button"
                  onClick={``}
                  className="btn btn-neutral text-lg mt-4"
                >
                  Reset password
                </button>
              ) : (
                <button type="submit" className="btn btn-neutral text-lg mt-4">
                  Login
                </button>
              )}
            </fieldset>
          </form>
          <p className="text-center py-2">
            Already have an account?{" "}
            <span className="ml-1 font-medium cursor-pointer hover:underline text-red-500">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
