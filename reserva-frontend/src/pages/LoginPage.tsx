import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/my-reservations', { replace: true })
    }
  }, [isAuthenticated, isLoading, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginUser(form)
      login(result.accessToken, result.user)
      navigate('/my-reservations', { replace: true })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (isLoading) {
    return <main className="mx-auto max-w-lg px-6 py-16">Loading...</main>
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-4xl font-semibold">Sign In</h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] p-3 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] p-3 outline-none"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-2xl bg-black px-6 py-3 text-white disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="mt-5 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-black">
            Register
          </Link>
        </p>
      </form>
    </main>
  )
}