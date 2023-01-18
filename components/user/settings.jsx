import Image from 'next/image'
import {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import styles from '../../styles/general.module.sass'
import settingsStyles from '../../styles/dashboard/settings.module.sass'
import defaultProfilePic from '../../public/images/default-profile-picture.png'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'
import getAuth from '../../helpers/auth'
import getProfilePhoto from '../../helpers/profile-photo'

export default forwardRef(({alertPopup, alert, setAlert, setAuth, auth}, ref) => {
    const [profilePhoto, setProfilePhoto] = useState(process.env.DEFAULT_PROFILE_PICTURE)
    const [visibility, setVisibility] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)
    const [canSubmit, setCanSubmit] = useState(true)
    const [file, setFile] = useState(null)
    const fileRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const currentPasswordRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    useImperativeHandle(ref, () => ({
        show() {
            updateProfilePhoto()
            nameRef.current.value = auth.name
            emailRef.current.value = auth.email
            setFadeOut(false)
            setVisibility(true)
        }
    }))

    const close = () => {
        setFadeOut(true)
        setTimeout(() => {
            setVisibility(false)
            setFile(null)
            fileRef.current.value = ''
            nameRef.current.value = ''
            emailRef.current.value = ''
            currentPasswordRef.current.value = ''
            passwordRef.current.value = ''
            confirmPasswordRef.current.value = ''
        }, 400)
    }

    const updateProfilePhoto = () => {
        getProfilePhoto(setProfilePhoto)
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handlePhoto = async (e) => {
        e.preventDefault()

        if (!file) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.NO_PROFILE_IMAGE),
                type: 'error',
            })
            return alertPopup.current.show()
        }

        try {
            const formData = new FormData()
            formData.append('image', file)
            const response = await axios.post('/photo', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            const {data} = response

            if (data.status) {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })
                alertPopup.current.show()
                fileRef.current.value = ''
                setFile(null)
                getAuth().then((user) => {
                    setAuth(user)
                    updateProfilePhoto()
                })
            }
        } catch (e) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_UPLOADING_IMAGE),
                type: 'error',
            })
            alertPopup.current.show()
        }
    }

    const handleRemovePhoto = async (e) => {
        e.preventDefault()

        if (file) {
            setFile(null)
            fileRef.current.value = ''
        } else {
            setAlert({
                title: 'Are you sure? 🧐',
                description: 'You remove your profile picture, are you sure you really want to do that?',
                type: 'error',
                buttons: 'verify',
                dangerBtnText: 'Remove',
            })
            alertPopup.current.show(async () => {
                try {
                    const {data} = await axios.post('/photo', {remove: true}, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    })

                    if (data.status) {
                        setAlert({
                            ...serverResponse(data.type),
                            type: 'success'
                        })
                        getAuth().then((user) => {
                            setAuth(user)
                            updateProfilePhoto()
                        })
                    }
                    else
                        setAlert({
                            ...serverResponse(data.type),
                            type: 'error'
                        })

                    alertPopup.current.show()
                } catch (e) {
                    setAlert({
                        ...serverResponse(RESPONSE_TYPES.ERROR_REMOVING_PROFILE_PHOTO),
                        type: 'error'
                    })
                    alertPopup.current.show()
                }
            })
        }
    }

    const handleInfo = async (e) => {
        e.preventDefault()
        if (!canSubmit) return
        setCanSubmit(false)
        const name = nameRef.current.value
        const email = emailRef.current.value

        if (!name || !email) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.EMPTY_FIELDS),
                type: 'error',
            })
            setCanSubmit(true)
            return alertPopup.current.show()
        }

        try {
            const response = await axios.post('/update', {
                name,
                email,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const {data} = response

            if (data.status) {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })
                alertPopup.current.show()
                getAuth().then((user) => {
                    setAuth(user)
                })
            } else {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'error',
                })
                alertPopup.current.show()
            }

            setCanSubmit(true)
        } catch (e) {
            console.error(e)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_UPDATING_USER),
                type: 'error',
            })
            alertPopup.current.show()
            close()
            setCanSubmit(true)
        }
    }

    const handlePassword = async (e) => {
        e.preventDefault()
        if (!canSubmit) return
        setCanSubmit(false)
        const currentPassword = currentPasswordRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value

        if (!currentPassword || !password || !confirmPassword) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.EMPTY_FIELDS),
                type: 'error',
            })
            setCanSubmit(true)
            return alertPopup.current.show()
        }

        if (password !== confirmPassword) {
            setAlert({
                ...serverResponse(RESPONSE_TYPES.PASSWORDS_NOT_MATCH),
                type: 'error',
            })
            setCanSubmit(true)
            return alertPopup.current.show()
        }

        try {
            const response = await axios.post('/password', {
                currentPassword,
                password,
                confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const {data} = response

            if (data.status) {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })
                alertPopup.current.show()
                close()
                passwordRef.current.value = ''
                confirmPasswordRef.current.value = ''
                getAuth().then((user) => {
                    setAuth(user)
                })
            } else {
                setAlert({
                    ...serverResponse(data.type, data.type === RESPONSE_TYPES.PASSWORD_TOO_SHORT ? [data.min || 6] : []),
                    type: 'error',
                })
                alertPopup.current.show()
            }

            setCanSubmit(true)
        } catch (e) {
            console.error(e)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_UPDATING_USER),
                type: 'error',
            })
            alertPopup.current.show()
            setCanSubmit(true)
        }
    }

    return (
        <>
            <div className={`${styles.curtain} ${settingsStyles.curtain} ${visibility ? styles.show : ''}`}
                 onClick={close}></div>
            <div
                className={`${settingsStyles.container} ${fadeOut ? settingsStyles.fade_out : ''} ${(visibility && !fadeOut) ? settingsStyles.show : ''}`}>
                <div className={settingsStyles.container_wrapper}>
                    <div className={settingsStyles.close}>
                        <div className={settingsStyles.close_inner} onClick={close}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <h1 className={settingsStyles.title}>Settings</h1>
                    <div className={settingsStyles.settings_inner}>
                        <div className={settingsStyles.profile}>
                            <div className={settingsStyles.image}>
                                <img src={profilePhoto} alt="Profile Picture"/>
                            </div>
                            <div className={settingsStyles.upload}>
                                <form onSubmit={handlePhoto}>
                                    <input type="file" className={`${styles.default_file} ${settingsStyles.file_input}`} ref={fileRef} onChange={handleFile}/>
                                    {file ? (
                                        <button className={`${styles.default_button} ${settingsStyles.button}`}>Upload</button>
                                    ) : ''}
                                </form>
                                {auth.photo || file ? (
                                    <button className={styles.danger_button} onClick={handleRemovePhoto}>Remove</button>
                                ) : ''}
                            </div>
                        </div>
                        <div className={settingsStyles.info}>
                            <form onSubmit={handleInfo}>
                                <h3>General Info</h3>
                                <input type="text" className={styles.default_input} placeholder="Name"
                                       defaultValue={auth.name} ref={nameRef}/>
                                <input type="text" className={styles.default_input} placeholder="Email"
                                       defaultValue={auth.email} ref={emailRef}/>
                                <button className={styles.default_button} disabled={!canSubmit}>Save</button>
                            </form>
                            <form onSubmit={handlePassword}>
                                <h3>Change Password</h3>
                                <input type="password" className={styles.default_input} placeholder="Current Password"
                                       ref={currentPasswordRef}/>
                                <input type="password" className={styles.default_input} placeholder="Password"
                                       ref={passwordRef}/>
                                <input type="password" className={styles.default_input} placeholder="Confirm Password"
                                       ref={confirmPasswordRef}/>
                                <button className={styles.default_button} disabled={!canSubmit}>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})