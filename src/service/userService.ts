import axios from 'axios'
import type { User } from '../types/user.ts'

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
  return data
} 