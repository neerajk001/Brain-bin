import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { authStore } from "../store/authStore"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"


export default function SignupPage() {
  

 const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })


  const { signup, isLoading } = authStore()
  console.log("signup function:", signup)

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("username is required")
    if (!formData.email.trim()) return toast.error("email is required")
    if (!formData.password.trim()) return toast.error("password is required")
    if (formData.password.length < 6) return toast.error("password is length should be 6 character or more")

    return true;
  }


  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Submitted", formData)
    // handle signup logic here
    const success = validateForm()
    console.log(success,"success")
    if (success === true){
      const result =await signup(formData)
      if(result){
        console.log(result)
        navigate('/signin')
      }
    }
      
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-purple-500">🧠 brain-bin</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-gray-300 mt-2">Start building your second brain today</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-2">Sign Up</h2>
          <p className="text-gray-300 text-sm mb-6">Enter your details to create a new account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="text-gray-200 block mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-200 block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}

                className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-gray-200 block mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}

                  className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-2 right-3 text-gray-300 hover:text-white items-center text-center"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={isLoading}
              className="w-full flex justify-center items-center text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              {
                isLoading ? (
                  <>
                    <Loader2 className="size-5,animate-spin" />
                  </>
                ) : (
                  "create Account"
                )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-400 hover:text-purple-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
