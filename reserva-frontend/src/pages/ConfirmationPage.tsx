import { Link } from 'react-router-dom'

export default function ConfirmationPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-6 py-12">
      <div className="w-full rounded-[36px] border border-[var(--border)] bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-3xl">
          ✅
        </div>

        <h1 className="text-5xl font-semibold">Reservation Confirmed</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Your booking has been successfully created. Please save your reservation code.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-3xl bg-stone-50 p-6">
          <p className="text-sm text-gray-500">Reservation Code</p>
          <p className="mt-2 text-2xl font-semibold">RSV-20481</p>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <Link to="/my-reservations" className="rounded-2xl bg-black px-6 py-3 text-white">
            View My Reservations
          </Link>
          <Link to="/" className="rounded-2xl border border-[var(--border)] px-6 py-3">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}