import styles from '../styles/general.module.sass'
import alertStyles from '../styles/alert.module.sass'
import {useState, forwardRef, useImperativeHandle} from 'react'

export default forwardRef(({props: {type, title, description, buttons = '', dangerBtnText}}, ref) => {
    const [visibility, setVisibility] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)
    const [callback, setCallback] = useState(null)

    useImperativeHandle(ref, () => ({
        show(callback = null) {
            setFadeOut(false)
            setVisibility(true)
            if (callback) setCallback(() => callback)
        }
    }))

    const close = (justClose) => {
        setFadeOut(true)
        setTimeout(() => {
            setVisibility(false)
            if (callback && !justClose) callback()
            setCallback(null)
        }, 400)
    }

    return (
        <>
            <div className={`${styles.curtain} ${alertStyles.curtain} ${visibility ? styles.show : ''}`}
                 onClick={() => close(true)}></div>
            <div
                className={`${alertStyles.alert_box} ${alertStyles[type]} ${fadeOut ? alertStyles.fade_out : ''} ${(visibility && !fadeOut) ? alertStyles.show : ''}`}>
                <div className={alertStyles.text}>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <div className={alertStyles.buttons}>
                    {buttons !== 'verify' ? (
                        <button className={alertStyles.ok_button} onClick={() => close(false)}>OK</button>
                    ) : (
                        <>
                            <button className={alertStyles.cancel_button} onClick={() => close(true)}>
                                Cancel
                            </button>
                            <button className={alertStyles.danger_button} onClick={() => close()}>
                                {dangerBtnText || 'Yes'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
})