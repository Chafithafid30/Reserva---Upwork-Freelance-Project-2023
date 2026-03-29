import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          Reserva
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link to="/" className="text-sm text-gray-700 hover:text-black">Home</Link>
          <Link to="/restaurants" className="text-sm text-gray-700 hover:text-black">Restaurants</Link>
          {isAuthenticated && (
            <Link to="/my-reservations" className="text-sm text-gray-700 hover:text-black">
              My Reservations
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-600 md:inline">
                {user?.name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-[var(--border)] bg-white px-5 py-2 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden text-sm text-gray-700 hover:text-black md:inline">
                Sign In
              </Link>
              <Link
                to="/restaurants"
                className="rounded-full bg-black px-5 py-2 text-sm text-white hover:opacity-90"
              >
                Book Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
