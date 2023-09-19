import { useState } from 'react'
import { supabase } from '../app/supabaseClient'
import { Text, View } from '../components/Themed';

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <View>
        <div className="row flex flex-center">
        <div className="col-6 form-widget">
            <div className="header"><Text>Supabase + React</Text></div>
            <p className="description"><Text>Sign in via magic link with your email below</Text></p>
            <form className="form-widget" onSubmit={handleLogin}>
            <div>
                <input
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <button className={'button block'} disabled={loading}>
                {loading ? <span><Text>Loading</Text></span> : <span><Text>Send magic link</Text></span>}
                </button>
            </div>
            </form>
        </div>
        </div>
    </View>
  )
}