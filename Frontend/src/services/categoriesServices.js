import api from './api'

export async function getCategories() {
  try {
    const res = await api.get('/categories')
    return res.data.data
  } catch (err) {
    console.error('Error fetching categories:', err)
    throw err
  }
}