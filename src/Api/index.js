import axios from "axios"

const findEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env["REACT_APP_PROD_BASE_URL"]
  }
  return process.env["REACT_APP_LOCAL_BASE_URL"]
}


export function loginUserApi() {
  return axios.get(`${findEnvironment()}/db/users`)
}

export function fetchAccountApi() {
  return axios.get(`${findEnvironment()}/db/accounts`)
}

export function fetchTransactionApi(id) {
  return axios.get(`${findEnvironment()}/db/accounts/${id}/transactions`)
}

export function createAccountApi(formData) {
  return axios.post(`${findEnvironment()}/db/accounts`, formData)
}


