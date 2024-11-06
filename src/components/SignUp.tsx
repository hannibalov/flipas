import React from 'react'
import {signInWithGoogle, signUpWithEmailAndPassword} from '../firebase/providers'

export const SignUpForm = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  })
  const handleChange = (evt: any) => {
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  const handleOnSubmit = async (evt: any) => {
    evt.preventDefault()

    const {email, password} = state
    await signUpWithEmailAndPassword(email, password)
  }

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container" onClick={signInWithGoogle}>
          <a href="/#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm
