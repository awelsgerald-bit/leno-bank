import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value))
}

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Overview of your Leno Bank account.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-lg shadow-brand-600/20 sm:p-6">
          <p className="text-sm font-medium text-brand-100">Available balance</p>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{formatCurrency(user?.balance)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-muted">Account number</p>
          <p className="mt-2 font-mono text-xl font-semibold tracking-wider text-slate-900 sm:text-2xl">
            {user?.account_number}
          </p>
          <p className="mt-3 text-sm text-muted">{user?.email}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/transfer"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md sm:p-6"
        >
          <p className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
            Send money
          </p>
          <p className="mt-2 text-sm text-muted">
            Transfer funds to another Leno Bank account instantly.
          </p>
        </Link>

        <Link
          to="/history"
          className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md sm:p-6"
        >
          <p className="text-lg font-semibold text-slate-900 group-hover:text-brand-700">
            View history
          </p>
          <p className="mt-2 text-sm text-muted">
            Review your recent incoming and outgoing transactions.
          </p>
        </Link>
      </div>
    </div>
  )
}
