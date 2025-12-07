import api from './api'

export function getUsers() {
  return api.get('/users')
    .then(res => {
      return res.data.data
    })
    .catch(err => {
      console.error('Error fetching users:', err)
      throw err
    })
}
