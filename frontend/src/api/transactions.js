import api from './axios'

export async function transferFunds({ receiver_account, amount, description }) {
  const { data } = await api.post('/transactions/transfer', {
    receiver_account,
    amount,
    description: description || null,
  })
  return data
}

export async function getTransactionHistory() {
  const { data } = await api.get('/transactions/history')
  return data
}
