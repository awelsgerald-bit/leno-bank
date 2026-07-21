import api from './axios'

export async function register({ full_name, email, password }) {
  const { data } = await api.post('/auth/register', { full_name, email, password })
  return data
}

export async function login({ email, password }) {
  const formData = new URLSearchParams()
  formData.append('username', email)
  formData.append('password', password)

  const { data } = await api.post('/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}

export async function getProfile() {
  const { data } = await api.get('/auth/me')
  return data
}
