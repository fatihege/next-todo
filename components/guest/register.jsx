import styles from '../../styles/general.module.sass'
import guestStyles from '../../styles/guest.module.sass'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useRef, useState} from 'react'
import Alert from '../alert'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'

export default () => {
    const router = useRouter()
    const alertRef = useRef()
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const [canSubmit, setCanSubmit] = useState(true)
    const inputName = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()
    const inputPasswordConfirm = useRef()
    const [alert, setAlert] = useState({
        title: '',
        description: '',
        type: 'error',
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!canSubmit) return
        setCanSubmit(false)

        const nameValue = inputName.current.value
        const emailValue = inputEmail.current.value
        const passwordValue = inputPassword.current.value
        const passwordConfirmValue = inputPasswordConfirm.current.value

        if (!nameValue || !emailValue || !passwordValue || !passwordConfirmValue) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.EMPTY_FIELDS),
                type: 'error',
            })

            return alertRef.current.show(() => setCanSubmit(true))
        }

        if (!emailValue.match(validEmail)) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.INCORRECT_EMAIL),
                type: 'error',
            })

            return alertRef.current.show(() => setCanSubmit(true))
        }

        if (passwordValue !== passwordConfirmValue) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.PASSWORDS_NOT_MATCH),
                type: 'error',
            })

            return alertRef.current.show(() => setCanSubmit(true))
        }

        try {
            const response = await axios.post(`/register`, {
                name: nameValue,
                email: emailValue,
                password: passwordValue,
                passwordConfirm: passwordConfirmValue,
            })

            const {data} = response

            if (data.status) {
                inputName.current.value = ''
                inputEmail.current.value = ''
                inputPassword.current.value = ''
                inputPasswordConfirm.current.value = ''

                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })

                return alertRef.current.show(() => {
                    router.push('/login')
                })
            } else {
                setAlert({
                    ...serverResponse(data.type, data.type === RESPONSE_TYPES.PASSWORD_TOO_SHORT ? [data.min || 6] : []),
                    type: 'error',
                })
                alertRef.current.show()
            }

            setCanSubmit(true)
        } catch (err) {
            setCanSubmit(true)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_CREATING_USER),
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
                <h3>Register</h3>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Your name" className={styles.primary_input} ref={inputName}/>
                    <input type="text" placeholder="Your email" className={styles.primary_input} ref={inputEmail}/>
                    <input type="password" placeholder="Your password" className={styles.primary_input}
                           ref={inputPassword}/>
                    <input type="password" placeholder="Confirm your password" className={styles.primary_input}
                           ref={inputPasswordConfirm}/>
                    <button className={styles.primary_button} disabled={!canSubmit}>Create Account</button>
                </form>
                <div className={guestStyles.swap}>
                    Already have an account? <Link href="/login">Login.</Link>
                </div>
            </div>
        </>
    )
}