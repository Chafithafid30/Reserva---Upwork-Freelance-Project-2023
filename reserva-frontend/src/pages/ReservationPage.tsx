import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createReservation } from '../services/reservationService'
import { useAuth } from '../context/AuthContext'

const today = new Date()
today.setHours(0, 0, 0, 0)

const reservationSchema = z.object({
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((value) => {
      const selectedDate = new Date(value)
      selectedDate.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'Date cannot be in the past'),
  time: z.string().min(1, 'Time is required'),
  guestCount: z.coerce.number().min(1, 'Minimum 1 guest'),
  contactName: z.string().min(1, 'Full name is required'),
  contactEmail: z.string().min(1, 'Email is required').email('Invalid email'),
  contactPhone: z.string().min(1, 'Phone is required'),
  specialRequest: z.string().optional(),
})

type ReservationFormValues = z.infer<typeof reservationSchema>

function getInputClass(hasError: boolean) {
  return `mt-2 w-full rounded-2xl p-3 outline-none transition ${
    hasError
      ? 'border border-red-500 bg-red-50'
      : 'border border-[var(--border)] bg-white'
  }`
}

export default function ReservationPage() {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    mode: 'onChange',
    defaultValues: {
      date: '',
      time: '',
      guestCount: 2,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      specialRequest: '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        date: '',
        time: '',
        guestCount: 2,
        contactName: user.name || '',
        contactEmail: user.email || '',
        contactPhone: user.phone || '',
        specialRequest: '',
      })
    }
  }, [user, reset])

  const watchedValues = watch()

  const isFormValid =
    !!watchedValues.date?.trim() &&
    !!watchedValues.time?.trim() &&
    Number(watchedValues.guestCount) > 0 &&
    !!watchedValues.contactName?.trim() &&
    !!watchedValues.contactEmail?.trim() &&
    !!watchedValues.contactPhone?.trim()

  async function onSubmit(values: ReservationFormValues) {
    if (!restaurantId) {
      setError('root', { message: 'Restaurant not found' })
      return
    }

    try {
      const result = await createReservation({
        restaurantId,
        date: values.date,
        time: values.time,
        guestCount: values.guestCount,
        contactName: values.contactName,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
        specialRequest: values.specialRequest,
      })

      navigate(`/confirmation/${result.reservationCode}`)
    } catch (err: any) {
      setError('root', {
        message: err?.response?.data?.message || 'Failed to create reservation',
      })
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[32px] border border-[var(--border)] bg-white p-8"
        >
          <h1 className="mb-6 text-4xl font-semibold">Confirm Your Reservation</h1>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('date')}
                className={getInputClass(!!errors.date)}
              />
              {errors.date && (
                <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                {...register('time')}
                className={getInputClass(!!errors.time)}
              />
              {errors.time && (
                <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                {...register('guestCount')}
                className={getInputClass(!!errors.guestCount)}
              />
              {errors.guestCount && (
                <p className="mt-2 text-sm text-red-600">{errors.guestCount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('contactName')}
                className={getInputClass(!!errors.contactName)}
              />
              {errors.contactName && (
                <p className="mt-2 text-sm text-red-600">{errors.contactName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register('contactEmail')}
                className={getInputClass(!!errors.contactEmail)}
              />
              {errors.contactEmail && (
                <p className="mt-2 text-sm text-red-600">{errors.contactEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('contactPhone')}
                className={getInputClass(!!errors.contactPhone)}
              />
              {errors.contactPhone && (
                <p className="mt-2 text-sm text-red-600">{errors.contactPhone.message}</p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">Special Request</label>
            <textarea
              {...register('specialRequest')}
              className={getInputClass(false) + ' min-h-[140px]'}
            />
          </div>

          {errors.root && (
            <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`mt-6 rounded-2xl px-6 py-3 text-white transition ${
              isSubmitting || !isFormValid
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-black hover:opacity-90'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
          </button>
        </form>

        <aside className="h-fit rounded-[32px] border border-[var(--border)] bg-white p-8">
          <h2 className="text-2xl font-semibold">Booking Summary</h2>
          <p className="mt-2 text-gray-600">
            Reservation details will be submitted for this restaurant.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Restaurant ID: {restaurantId}
          </p>
        </aside>
      </div>
    </main>
  )
}