import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const result = await registerUser(form)
      setSuccess(result.message || 'Register success')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-4xl font-semibold">Create Account</h1>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] p-3 outline-none"
              placeholder="Enter your full name"
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] p-3 outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-[var(--border)] p-3 outline-none"
              placeholder="Create a password"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 rounded-2xl bg-black px-6 py-3 text-white disabled:opacity-60"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-5 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-black">
            Sign In
          </Link>
        </p>
      </form>
    </main>
  )
}