import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getTransactionHistory } from '../api/transactions'
import { ErrorAlert } from '../components/AuthLayout'

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value))
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function History() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadHistory() {
      try {
        const data = await getTransactionHistory()
        if (active) setTransactions(data)
      } catch {
        if (active) setError('Unable to load transaction history.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadHistory()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transaction history</h1>
        <p className="mt-1 text-sm text-muted">All transfers sent and received on your account.</p>
      </div>

      <ErrorAlert message={error} />

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
        </div>
      ) : transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-sm text-muted">No transactions yet. Make your first transfer to see it here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {transactions.map((tx) => {
              const isOutgoing = tx.sender_id === user?.id
              return (
                <li key={tx.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      {isOutgoing ? 'Sent transfer' : 'Received transfer'}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {tx.description || 'No description'} · {formatDate(tx.created_at)}
                    </p>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      isOutgoing ? 'text-red-600' : 'text-brand-700'
                    }`}
                  >
                    {isOutgoing ? '-' : '+'}
                    {formatCurrency(tx.amount)}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
