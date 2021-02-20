import React from 'react'
import { useHistory } from "react-router"
import useForm from "hooks/useForm"
import { validateLoginInformation } from "validation/validateInfo"
import { useDispatch, useSelector } from "react-redux"
import { loginAction } from "actions/actions"

const LoginComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLoginSuccess = useSelector(state => state.loginReducer.isLoginSuccess)
  const isLoginLoading = useSelector(state => state.loginReducer.isLoginLoading)
  const handleFormSubmission = () => {
    dispatch(loginAction(values, history))
  }

  const { handleChange, handleSubmit, values, errors } = useForm(
    { email: '', password: '' },
    handleFormSubmission,
    validateLoginInformation
  )
  return (
    <div className='login'>
      <form onSubmit={handleSubmit} noValidate={true}>
        <h3>Login</h3>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" name='email' placeholder="Enter email" onChange={handleChange}/>
        </div>
        {errors.email && <small className="text-danger" role="alert">{errors.email}</small>}

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name='password' placeholder="Enter password" onChange={handleChange}/>
        </div>
        {errors.password && <small className="text-danger" role="alert">{errors.password}</small>}

        <button type="submit" className="form-input-btn" disabled={isLoginLoading} data-testid={'login-submit'}>Submit</button>
      </form>
      <br/>
      {isLoginSuccess === false && (<small className="text-danger" role="alert">
        Login Failed! Try Again.
      </small>)}
    </div>
  )
}

export default LoginComponent

