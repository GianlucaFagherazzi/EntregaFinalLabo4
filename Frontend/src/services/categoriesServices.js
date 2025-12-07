import api from './api'

export function getCategories() {
  try {
    return api.get('/categories').then(res => res.data.data)
  } catch (err) {
    console.error('Error fetching categories:', err)
    throw err
  }
}