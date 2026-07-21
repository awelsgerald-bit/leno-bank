import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { transferFunds } from '../api/transactions'
import { Button, ErrorAlert, FormField, Input } from '../components/AuthLayout'

export default function Transfer() {
  const { user, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    receiver_account: '',
    amount: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await transferFunds({
        receiver_account: form.receiver_account.trim(),
        amount: Number(form.amount),
        description: form.description.trim() || null,
      })
      await refreshProfile()
      setSuccess('Transfer completed successfully.')
      setForm({ receiver_account: '', amount: '', description: '' })
    } catch (err) {
      const detail = err.response?.data?.detail
      setError(typeof detail === 'string' ? detail : 'Transfer failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transfer funds</h1>
        <p className="mt-1 text-sm text-muted">
          Send money from account {user?.account_number} to another Leno Bank customer.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <ErrorAlert message={error} />

        {success && (
          <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
            {success}
          </div>
        )}

        <FormField label="Receiver account number" id="receiver_account">
          <Input
            id="receiver_account"
            name="receiver_account"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="10-digit account number"
            required
            value={form.receiver_account}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Amount (USD)" id="amount">
          <Input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            required
            value={form.amount}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Description (optional)" id="description">
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="What is this transfer for?"
            value={form.description}
            onChange={handleChange}
          />
        </FormField>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Processing…' : 'Send transfer'}
        </Button>
      </form>
    </div>
  )
}
