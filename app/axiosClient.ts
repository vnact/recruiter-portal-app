import axios from 'axios'
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-root-toast'
import qs from 'qs'
import { TOKEN_STORAGE_KEY } from '../constants/storageKey'

export const apiInstance = axios.create({
  baseURL: 'http://192.168.0.101:3333',
  headers: {
    'Content-Type': 'application/json',
  },
  onUploadProgress: ({ loaded, total }) => total && loaded / total,
  paramsSerializer: {
    serialize: (param) =>
      qs.stringify(param, {
        arrayFormat: 'repeat',
      }),
  },
})

apiInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }
  if (config.method?.toUpperCase() === 'POST' && typeof config.data === 'object') {
    config.data = JSON.stringify(config.data)
  }

  return config
})

apiInstance.interceptors.response.use(
  (e) => e,
  (error) => {
    const { status, data } = error || {}
    // const errorMessage = `${data.message}`
    // console.log('abcsa')
    console.log(error.data.message)
    console.log(`Error with status ${status}: ${data.message}`)

    Toast.show(data.message || 'Some thing wrong happen', { duration: 2000, shadow: false })
    // return Promise.reject(new Error(errorMessage))
  },
)
