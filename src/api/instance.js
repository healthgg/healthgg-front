import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => {
    try {
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (error) => Promise.reject(error),
)

const getRequest = async (url) => {
  const response = await api.get(url)
  return response.data.data
}

const postRequest = async (url) => {
  const response = await api.post(url)
  return response
}

const postRequestExcel = async (url, data, config = {}) => {
  const response = await api.post(url, data, config)
  return response
}

const putRequest = async (url, data) => {
  const response = await api.put(url, data)
  return response.data
}

const deleteRequest = async (url) => {
  const response = await api.delete(url)
  return response.data
}

export { api, postRequestExcel, postRequest, getRequest, putRequest, deleteRequest }
