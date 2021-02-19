import axios from "axios"

const BASE_URL = 'http://localhost:4000'

export function loginUserApi() {
  return axios.get(`${BASE_URL}/users`)
}

export function fetchAccountApi() {
  return axios.get(`${BASE_URL}/accounts`)
}

export function fetchTransactionApi(id) {
  return axios.get(`${BASE_URL}/accounts/${id}/transactions`)
}

export function createAccountApi(formData) {
  return axios.post(`${BASE_URL}/accounts`, formData)
}


