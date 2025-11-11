import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Providers/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  // All state
  const [toggleButton, setToggleButton] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Auth context info
  const { loginWithGoogle, loginUserEmailPassword, setLoading } =
    use(AuthContext);

  // Navigate
  const navigate = useNavigate();
  const location = useLocation();
  // Get "from" path
  const from = location.state?.from || "/";

  // Handle google login
  const handleGoogleLogin = () => {
    // setLoading(true);
    loginWithGoogle()
      .then(() => {
        toast.success("User Successfully Login");
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Google Login Error:", error.message);
      });
  };

  // Login User email & password
  const handleLoginEmailPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    // Get input field values
    const email = e.target.email.value;
    const password = e.target.email.value;

    // User login email & password
    loginUserEmailPassword(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("User Successfully Login");
        navigate("/");
        e.target.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //
  return (
    <div className="flex items-center justify-center min-h-screen py-5">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl px-12">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center underline py-6">
            Login Your Account
          </h2>
          {/* Google Login */}
          <div>
            <button
              onClick={handleGoogleLogin}
              className="btn w-full flex items-center justify-center gap-2 mt-3 text-[16px]"
            >
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
          <form onSubmit={handleLoginEmailPassword}>
            <fieldset className="fieldset">
              <label className="label text-[16px]">Your email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Enter Email"
                required
              />

              <div className={`${toggleButton ? "hidden" : "flex flex-col"}`}>
                <label className="label text-[16px] mb-1">Password</label>
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
          <p className="text-[16px] text-center py-2">
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
