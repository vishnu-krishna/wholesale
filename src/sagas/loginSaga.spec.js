import { login, loginCall } from "sagas/loginSaga"
import { call } from "redux-saga/effects"

it('should display comments success message when saveCommentsFromModal is true', () => {
  const mockHistory = jest.fn()
  const mockData = {
    payload: {
      data: {
        email: 'test@a.com',
        password: '123456'
      },
      history: mockHistory

    }
  }
  const generator = login(mockData)
  // console.log(generator.next().value)
  expect(generator.next().value).toEqual(
    call(loginCall, mockData)
  )
  // expect(generator.next().value).toEqual(
  //   put({ type: LOGIN_CALL_STARTED })
  // )

  // expect(generator.next({ application: mockApplication2 }).value).toEqual(
  //   call(saveApplicationCall, { application: mockApplication1 })
  // )
  // expect(generator.next().value).toEqual(
  //   put(showAlertAction('success', 'Comments successfully saved'))
  // )
  // expect(generator.next().value).not.toEqual(
  //   put(
  //     showAlertAction(
  //       'success',
  //       'The application has been saved successfully.'
  //     )
  //   )
  // )
  // generator.next()
  // expect(mockOnSuccess).toHaveBeenCalled()
})