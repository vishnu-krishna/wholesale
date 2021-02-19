import { useEffect, useState } from 'react'

const useForm = (initialValue, callback, validation) => {
  const [values, setValues] = useState(initialValue)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    setErrors(validation(values))
    setIsSubmitting(true)
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback()
      }
    },
    [errors]
  )

  return { handleChange, handleSubmit, values, errors }
}

export default useForm
