import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Plane, Eye, EyeOff } from 'lucide-react'
import API from '../utils/api'
import useAuthStore from '../store/useAuthStore'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0a0f] text-white flex flex-col relative overflow-hidden">

      <div className="absolute top-[-100px] left-[-100px] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />

      <nav className="flex justify-between items-center px-6 md:px-10 py-5 relative z-10">
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
        >
          <Plane size={20} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 md:px-6 pb-16">

        <div className="inline-block bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
          Welcome Back
        </div>

        <h1
          style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3"
        >
          Login to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            WandrAI
          </span>
        </h1>

        <p className="text-white/50 text-sm mb-8 text-center max-w-sm font-light">
          Continue planning your dream trips with AI.
        </p>

        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col gap-4">

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm font-medium flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm font-medium flex items-center gap-2">
              <Lock size={14} /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-all duration-200 mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
            <ArrowRight size={16} />
          </button>

          <p className="text-center text-white/40 text-sm mt-2">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login