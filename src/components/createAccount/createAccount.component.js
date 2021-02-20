import React, { useState } from 'react'
import { useHistory } from "react-router"
import useForm from "hooks/useForm"
import { validateAccountCreation } from "validation/validateInfo"
import { useDispatch, useSelector } from "react-redux"
import { createNewAccountAction } from "actions/actions"

const CreateAccountComponent = () => {
  const dispatch = useDispatch()
  const [accountTypeInput, setAccountTypeInput] = useState(0)
  const history = useHistory()
  const isLoading = useSelector(state => state.createAccountReducer.isLoading)
  const isAccountCreationFailed = useSelector(state => state.createAccountReducer.isAccountCreationFailed)

  const accountTypeOptions = ['Savings', 'Current']

  const processFormSubmission = () => {
    const { firstName, lastName, email } = values
    const formData = {
      firstName,
      lastName,
      email,
      accountType: accountTypeOptions[accountTypeInput],
      accountStatus: 'Pending'
    }
    dispatch(createNewAccountAction(formData, history))
  }

  const { handleChange, handleSubmit, values, errors } = useForm(
    { firstName: '', lastName: '', email: '' },
    processFormSubmission,
    validateAccountCreation
  )

  return (
    <div className="create-account">
      <h3>Create New Account</h3>

      <form id={"create-post-form"} onSubmit={handleSubmit} noValidate={true}>
        <div className="form-group col-md-12">
          <label htmlFor="firstName"> First Name </label>
          <input type="text" id="firstName" name='firstName' onChange={handleChange} className="form-control" placeholder="Enter account holder's first name"/>
        </div>
        {errors.firstName && <small className="text-danger" role="alert">{errors.firstName}</small>}

        <div className="form-group col-md-12">
          <label htmlFor="lastName"> Last Name </label>
          <input type="text" id="lastName" name='lastName' onChange={handleChange} className="form-control" placeholder="Enter account holder's last name"/>
        </div>
        {errors.lastName && <small className="text-danger" role="alert">{errors.lastName}</small>}

        <div className="form-group col-md-12">
          <label htmlFor="email"> Email Address </label>
          <input type="email" id="email" onChange={handleChange} name="email" className="form-control" placeholder="Enter account holder's email address"/>
        </div>
        {errors.email && <small className="text-danger" role="alert">{errors.email}</small>}

        <div className="form-group col-md-12">
          <label htmlFor="accountType"> Account Type </label>
          <select className="form-control"
                  onChange={event => setAccountTypeInput(event.target.value)}
                  value={accountTypeInput} data-testid={'select'}>
            {
              accountTypeOptions.map((accountType, key) =>
                <option value={key} key={accountType + key} data-testid={'select-option'}>{accountType}</option>)
            }
          </select>
        </div>
        <div className={'button-wrapper'}>
          <button type="button" className="form-input-btn" id={'go-back'} onClick={() => history.goBack()}>Go Back</button>
          <button className="form-input-btn" id={'create-new'} type="submit" disabled={isLoading}>Create Account</button>
        </div>

      </form>
      {isAccountCreationFailed && (<small className="text-danger" role="alert">
        New Account Creation failed.
      </small>)}
    </div>
  )
}

export default CreateAccountComponent





