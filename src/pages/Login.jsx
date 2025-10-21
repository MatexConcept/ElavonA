import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);

      if (result.success) {
        
        if (result.role === "admin") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/user-dashboard", { replace: true });
        }
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, rgba(139, 89, 62, 0.1) 0%, #FFF8F3 100%)",
      }}
    >

      <div className="h-safe-top flex-shrink-0"></div>

     
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E5D3B7]">
            
            <div className="bg-gradient-to-br from-[#8B593E] to-[#6B4530] px-6 sm:px-8 py-8 sm:py-10 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                Welcome Back
              </h1>
              <p className="text-white/80 text-xs sm:text-sm">
                Sign in to access your dashboard
              </p>
            </div>

         
            <div className="px-6 sm:px-8 py-6 sm:py-8">
              {error && (
                <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm font-medium text-red-800 leading-tight">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
               
                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs sm:text-sm font-semibold text-[#4A3428] mb-1.5 sm:mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#9A8478]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-3.5 border-2 border-[#E5D3B7] rounded-xl focus:outline-none focus:border-[#8B593E] focus:ring-2 focus:ring-[#8B593E]/20 transition-all text-sm sm:text-base text-[#4A3428] placeholder-[#9A8478]"
                      placeholder="Enter your username"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

               
                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-semibold text-[#4A3428] mb-1.5 sm:mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#9A8478]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-3.5 border-2 border-[#E5D3B7] rounded-xl focus:outline-none focus:border-[#8B593E] focus:ring-2 focus:ring-[#8B593E]/20 transition-all text-sm sm:text-base text-[#4A3428] placeholder-[#9A8478]"
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#8B593E] to-[#6B4530] text-white py-3.5 sm:py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-5 sm:mt-6 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            
            <div className="px-6 sm:px-8 py-4 sm:py-6 bg-[#FFF8F3] border-t border-[#E5D3B7]">
              <p className="text-center text-xs sm:text-sm text-[#9A8478]">
                Elavon Banking • Secure Access
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="h-safe-bottom flex-shrink-0"></div>
    </div>
  );
}
