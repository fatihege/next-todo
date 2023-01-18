import {forwardRef, useImperativeHandle, useState} from 'react'
import styles from '../../styles/general.module.sass'
import starredStyles from '../../styles/dashboard/starred-archived.module.sass'
import {ArchiveRed, ArchiveRedFilled, StarYellow, StarYellowFilled} from '../images'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'
import getAuth from '../../helpers/auth'

export default forwardRef(({alertPopup, alert, setAlert, setAuth, auth, listPopup}, ref) => {
    const [lists, setLists] = useState([])
    const [visibility, setVisibility] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    useImperativeHandle(ref, () => ({
        show() {
            setLists(auth.lists.filter((list) => list.archive))
            setFadeOut(false)
            setVisibility(true)
        }
    }))

    const close = () => {
        setFadeOut(true)
        setTimeout(() => {
            setVisibility(false)
            setLists([])
        }, 400)
    }

    const openList = (list) => {
        close()

        listPopup.current.show({
            ...list,
            id: list._id,
        })
    }

    const handleStar = async (id, unstar = false) => {
        if (!id) return

        try {
            const response = await axios.post('/list/star', {
                id,
                unstar,
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
                setLists(lists.map((list) => {
                    if (list._id === id) list.star = !unstar
                    return list
                }))
                getAuth().then((user) => setAuth(user))
            } else {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'error',
                })
                alertPopup.current.show()
            }
        } catch (e) {
            console.error(e)
            setAlert({
                ...serverResponse(RESPONSE_TYPES[!unstar ? 'ERROR_STARRING_LIST' : 'ERROR_UNSTARRING_LIST']),
                type: 'error',
            })
            alertPopup.current.show()
        }
    }

    const handleArchive = async (id, unarchive = false) => {
        if (!id) return

        try {
            const response = await axios.post('/list/archive', {
                id,
                unarchive,
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
                setLists(lists.map((list) => {
                    if (list._id === id) list.archive = !unarchive
                    return list
                }))
                getAuth().then((user) => setAuth(user))
            } else {
                setAlert({
                    ...serverResponse(data.type),
                    type: 'error',
                })
                alertPopup.current.show()
            }
        } catch (e) {
            console.error(e)
            setAlert({
                ...serverResponse(RESPONSE_TYPES[!unarchive ? 'ERROR_ARCHIVING_LIST' : 'ERROR_UNARCHIVING_LIST']),
                type: 'error',
            })
            alertPopup.current.show()
        }
    }

    return (
        <>
            <div className={`${styles.curtain} ${starredStyles.curtain} ${visibility ? styles.show : ''}`}
                 onClick={close}></div>
            <div
                className={`${starredStyles.container} ${fadeOut ? starredStyles.fade_out : ''} ${(visibility && !fadeOut) ? starredStyles.show : ''}`}>
                <div className={starredStyles.container_wrapper}>
                    <div className={starredStyles.close}>
                        <div className={starredStyles.close_inner} onClick={close}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <h1 className={starredStyles.title}>Archived Lists</h1>
                    <h3 className={starredStyles.description}>You can view and manage your archived lists here.</h3>
                    <div className={starredStyles.lists}>
                        {lists.length ? lists.map((list) => {
                            const completed = list.todos.length && !list.todos.filter((t) => !t.completed).length

                            return (
                                <div
                                    className={`${starredStyles.list} ${completed ? starredStyles.completed : ''}`}
                                    key={list._id} onClick={() => openList(list)}>
                                    <div className={starredStyles.icon}>
                                        <div className={starredStyles.circle_icon}></div>
                                    </div>
                                    <div>
                                        <div className={starredStyles.list_title}>{list.title}</div>
                                        <div className={starredStyles.list_description}>{list.description}</div>
                                    </div>
                                    <div className={starredStyles.actions}>
                                        {list.star ? (
                                            <div className={`${starredStyles.action} ${starredStyles.active}`}
                                                 onClick={(e) => {
                                                     handleStar(list._id, true)
                                                     e.stopPropagation()
                                                 }}>
                                                <StarYellowFilled/>
                                            </div>
                                        ) : (
                                            <div className={starredStyles.action} onClick={(e) => {
                                                handleStar(list._id)
                                                e.stopPropagation()
                                            }}>
                                                <StarYellow/>
                                            </div>
                                        )}
                                        {list.archive ? (
                                            <div className={`${starredStyles.action} ${starredStyles.active}`}
                                                 onClick={(e) => {
                                                     handleArchive(list._id, true)
                                                     e.stopPropagation()
                                                 }}>
                                                <ArchiveRedFilled/>
                                            </div>
                                        ) : (
                                            <div className={starredStyles.action}
                                                 onClick={(e) => {
                                                     handleArchive(list._id)
                                                     e.stopPropagation()
                                                 }}>
                                                <ArchiveRed/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }) : <h3 className={starredStyles.empty_text}>No archived lists found.</h3>}
                    </div>
                </div>
            </div>
        </>
    )
})