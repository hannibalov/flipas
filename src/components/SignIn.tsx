import React from 'react'
import {signInWithGoogle, signInWithEmailAndPassword} from '../firebase/providers'

export const SignInForm = () => {
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
    await signInWithEmailAndPassword(email, password)
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container" onClick={signInWithGoogle}>
          <a href="/#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
        </div>
        <span>or use your account</span>
        <input type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <button>Sign In</button>
      </form>
    </div>
  )
}
