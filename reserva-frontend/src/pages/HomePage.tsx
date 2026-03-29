import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            Curated premium dining experiences
          </span>

          <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
            Reserve exceptional dining with a clean, premium experience.
          </h1>

          <p className="max-w-xl text-lg leading-8 text-gray-600">
            Discover refined restaurants, choose your preferred time, and confirm
            your reservation in just a few steps.
          </p>

          <div className="flex gap-3">
            <Link
              to="/restaurants"
              className="rounded-full bg-black px-6 py-3 text-white"
            >
              Explore Restaurants
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-[var(--border)] bg-white px-6 py-3"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400&auto=format&fit=crop"
            alt="Reserva Hero"
            className="h-[550px] w-full rounded-[32px] object-cover shadow-lg"
          />
        </div>
      </section>
    </main>
  )
}