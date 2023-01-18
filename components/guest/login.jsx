import styles from '../../styles/general.module.sass'
import guestStyles from '../../styles/guest.module.sass'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Alert from '../alert'
import {useRef, useState} from 'react'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'

export default ({setAuth}) => {
    const router = useRouter()
    const alertRef = useRef()
    const [canSubmit, setCanSubmit] = useState(true)
    const inputEmail = useRef()
    const inputPassword = useRef()
    const [remember, setRemember] = useState(false)
    const [alert, setAlert] = useState({
        title: '',
        description: '',
        type: 'error',
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!canSubmit) return

        setCanSubmit(false)
        const emailValue = inputEmail.current.value
        const passwordValue = inputPassword.current.value

        if (!emailValue || !passwordValue) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.EMPTY_FIELDS),
                type: 'error',
            })

            return alertRef.current.show(() => setCanSubmit(true))
        }

        try {
            const response = await axios.post('/login', {
                email: emailValue,
                password: passwordValue,
                remember,
            })

            const {data} = response

            if (data.status) {
                inputEmail.current.value = ''
                inputPassword.current.value = ''

                localStorage.setItem('token', data.token)

                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })

                return alertRef.current.show(() => {
                    router.push('/dashboard')
                    setAuth(data.user)
                })
            } else {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'error',
                })
                alertRef.current.show()
            }

            setCanSubmit(true)
        } catch (err) {
            setCanSubmit(true)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_LOGGING_IN),
                type: 'error',
            })
            alertRef.current.show()
            console.error('ERROR', err)
        }
    }

    return (
        <>
            <Alert props={alert} ref={alertRef}/>
            <div className={guestStyles.form_container}>
                <h1>Next Todo</h1>
                <h3>Login</h3>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Your email" className={styles.primary_input} ref={inputEmail}/>
                    <input type="password" placeholder="Your password" className={styles.primary_input}
                           ref={inputPassword}/>
                    <label htmlFor="remember_me" className={styles.primary_checkbox}>
                        Remember Me
                        <input type="checkbox" id="remember_me" checked={remember} onChange={() => setRemember(!remember)}/>
                        <span></span>
                    </label>
                    <button className={styles.primary_button} disabled={!canSubmit}>Login</button>
                </form>
                <div className={guestStyles.swap}>
                    Don't have an account? <Link href="/register">Register now!</Link>
                </div>
            </div>
        </>
    )
}