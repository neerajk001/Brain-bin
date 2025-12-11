import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { authStore } from "../store/authStore"


export default function SigninPage() {
  
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  })

 const {isLoading ,login} =authStore()

  const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Sign in data:", formData)
    // Handle authentication here
      const result =await login(formData)
      if (result) {
  window.location.href = "/dashboard"; // 🔁 forces full reload, refetches cookies and auth
}

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-[#1DB954]">🧠 brain-bin</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 mt-2">Sign in to access your second brain</p>
        </div>

        <div className="bg-[#121212] border border-zinc-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-2">Sign In</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="emailOrUsername" className="text-gray-300 block mb-1">
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                placeholder="Enter your email or username"
                value={formData.identifier}
                onChange={(e)=>setFormData({...formData ,identifier:e.target.value})}
                required
                className="w-full px-4 py-2 bg-[#2a2a2a] text-white placeholder-gray-500 border border-zinc-700 rounded-lg focus:outline-none focus:border-[#1DB954] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-gray-300 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                 onChange={(e)=>setFormData({...formData ,password:e.target.value})}
                  required
                  className="w-full px-4 py-2 bg-[#2a2a2a] text-white placeholder-gray-500 border border-zinc-700 rounded-lg focus:outline-none focus:border-[#1DB954] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-3 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-[#1DB954] transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 rounded-full shadow-md transition-all"
            >
              {
                isLoading ?(
                  <>
                    <Loader2 className="size-5 animate-spin"/>
                  </>
                ):(
                    "signin"
                )
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#1DB954] hover:text-[#1ed760] font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-3 bg-[#2a2a2a] rounded-lg border border-zinc-700">
            <p className="text-xs text-gray-300 font-medium mb-1">Demo credentials:</p>
            <p className="text-xs text-gray-500">Email: demo@brainbin.com</p>
            <p className="text-xs text-gray-500">Username: demouser</p>
            <p className="text-xs text-gray-500">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
