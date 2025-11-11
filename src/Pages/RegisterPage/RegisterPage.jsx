import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Providers/AuthContext";
import { ThemeContext } from "./../../Providers/ThemeContext";

const RegisterPage = () => {
  // All state
  const [showPass, setShowPass] = useState(false);
  // Theme context
  const { isDark } = use(ThemeContext);

  // Auth context info
  const {
    loginWithGoogle,
    registerUserEmailPassword,
    userProfileUpdate,
    setLoading,
  } = use(AuthContext);

  // Navigate
  const navigate = useNavigate();
  const location = useLocation();
  // Get "from" path
  const from = location.state?.from || "/";

  // Handle google login
  const handleGoogleLogin = () => {
    setLoading(true);
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

  // Login withEmailPassword
  const handleLoginEmailPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    // Get input field
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Use 6+ chars with upper, lower case letters & a number.");

      setLoading(false);
      return;
    }

    // Set displayName & photoUrl
    const userProfile = { displayName, photoURL };

    // User register on firebase
    registerUserEmailPassword(email, password)
      .then((result) => {
        console.log(result.user);
        userProfileUpdate(userProfile)
          .then(() => {
            toast.success("Successfully Register User");
            navigate(from, { replace: true });
            e.target.reset();
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //
  return (
    <div className={`${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className="flex items-center justify-center min-h-screen py-5">
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl px-12">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center underline py-6">
              Register A New Account
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
                {/* email field */}
                <label className="label text-[16px]">Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  placeholder="Enter Name"
                  required
                />
                <label className="label text-[16px]">Your email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Enter Email"
                  required
                />

                {/* Photo url */}
                <label className="label text-[16px]">Photo Url</label>
                <input
                  type="text"
                  name="photo"
                  className="input w-full"
                  placeholder="Enter photo url"
                  required
                />
                {/* Password */}
                <div className="flex flex-col">
                  <label className="label mb-1 text-[16px]">Password</label>
                  <div className="relative">
                    {/* Password filed */}
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

                <button type="submit" className="btn w-full mt-3 text-[16px]">
                  Register
                </button>
              </fieldset>
            </form>
            <p className="text-[16px] text-center py-2">
              Already have an account?{" "}
              <span className="ml-1 font-medium cursor-pointer hover:underline text-red-500">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
