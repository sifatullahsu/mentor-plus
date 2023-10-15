import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
axiosInstance.defaults.headers['Accept'] = 'application/json'
axiosInstance.defaults.timeout = 60000

axiosInstance.interceptors.request.use(function (config) {
  const accessToken = 'here i need to get accessToken from sesson storage'
  if (accessToken) config.headers.Authorization = accessToken

  return config
})

axiosInstance.interceptors.response.use(
  // @ts-ignore
  response => ({ data: response.data }),
  error => ({ data: error.response.data })
)

export default axiosInstance
