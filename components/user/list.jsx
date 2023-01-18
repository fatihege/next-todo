import {forwardRef, useEffect, useImperativeHandle, useState} from 'react'
import styles from '../../styles/general.module.sass'
import listStyles from '../../styles/dashboard/list.module.sass'
import {ArchiveRed, ArchiveRedFilled, Complete, Edit, Incomplete, Star, StarYellow, StarYellowFilled} from '../images'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'
import getAuth from '../../helpers/auth'

export default forwardRef(({alertPopup, alert, setAlert, setAuth, todoListPopup}, ref) => {
    const [list, setList] = useState({
        id: null,
        title: '',
        description: '',
        todos: [],
    })
    const [visibility, setVisibility] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    useImperativeHandle(ref, () => ({
        show(params) {
            if (params) {
                const {id, title, description, todos, star, archive} = params
                setList({
                    id,
                    title,
                    description,
                    todos: todos && todos.length ? todos.map((todo, i) => {
                        todo.id = i
                        return todo
                    }) : [],
                    star,
                    archive,
                })
            }
            setFadeOut(false)
            setVisibility(true)
        }
    }))

    const close = () => {
        setFadeOut(true)
        setTimeout(() => {
            setVisibility(false)
            setList({
                id: null,
                title: '',
                description: '',
                todos: [],
            })
        }, 400)
    }

    const handleEdit = () => {
        close()
        todoListPopup.current.show({
            ...list,
            _id: list.id,
        })
    }

    const handleStar = async (unstar = false) => {
        if (!list.id) return

        try {
            const response = await axios.post('/list/star', {
                id: list.id,
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
                setList({
                    ...list,
                    star: !unstar
                })
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

    const handleArchive = async (unarchive = false) => {
        if (!list.id) return

        try {
            const response = await axios.post('/list/archive', {
                id: list.id,
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
                setList({
                    ...list,
                    archive: !unarchive
                })
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

    const handleComplete = async (taskId, uncomplete = false) => {
        if (!list.id || !taskId) return

        try {
            const response = await axios.post('/list/complete', {
                listId: list.id,
                taskId,
                uncomplete,
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
                setList({
                    ...list,
                    todos: list.todos.map((t) => {
                        if (t._id.toString() === taskId) t.completed = !uncomplete
                        return t
                    })
                })
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
                ...serverResponse(RESPONSE_TYPES[!uncomplete ? 'ERROR_COMPLETING_TASK' : 'ERROR_UNCOMPLETING_TASK']),
                type: 'error',
            })
            alertPopup.current.show()
        }
    }

    return (
        <>
            <div className={`${styles.curtain} ${listStyles.curtain} ${visibility ? styles.show : ''}`}
                 onClick={close}></div>
            <div
                className={`${listStyles.container} ${fadeOut ? listStyles.fade_out : ''} ${(visibility && !fadeOut) ? listStyles.show : ''}`}>
                <div className={listStyles.container_wrapper}>
                    <div className={listStyles.close}>
                        <div className={listStyles.close_inner} onClick={close}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <h1 className={listStyles.title}>{list.title || ''}</h1>
                    <h3 className={listStyles.description}>{list.description || ''}</h3>
                    <div className={listStyles.tasks}>
                        {list.todos.map((task) => (
                            <div
                                className={`${listStyles.task} ${task.completed ? listStyles.completed : ''}`}
                                key={task._id}>
                                <div className={listStyles.icon}>
                                    <div className={listStyles.circle_icon} onClick={() => handleComplete(task._id, task.completed)}></div>
                                </div>
                                <div>
                                    <div className={listStyles.task_title}>{task.title}</div>
                                    <div className={listStyles.task_description}>{task.description}</div>
                                </div>
                                <div className={listStyles.actions}>
                                    {task.completed ? (
                                        <div className={listStyles.action} onClick={() => handleComplete(task._id, true)}>
                                            <Incomplete/>
                                        </div>
                                    ) : (
                                        <div className={listStyles.action} onClick={() => handleComplete(task._id)}>
                                            <Complete/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={listStyles.operations}>
                        {list.star ? (
                            <div className={`${listStyles.operation} ${listStyles.star} ${listStyles.active}`} onClick={() => handleStar(true)}>
                                <StarYellowFilled/>
                                Unstar
                            </div>
                        ) : (
                            <div className={`${listStyles.operation} ${listStyles.star}`} onClick={() => handleStar()}>
                                <StarYellow/>
                                Star
                            </div>
                        )}
                        {list.archive ? (
                            <div className={`${listStyles.operation} ${listStyles.archive} ${listStyles.active}`} onClick={() => handleArchive(true)}>
                                <ArchiveRedFilled/>
                                Unarchive
                            </div>
                        ) : (
                            <div className={`${listStyles.operation} ${listStyles.archive}`} onClick={() => handleArchive()}>
                                <ArchiveRed/>
                                Archive
                            </div>
                        )}
                        <div className={listStyles.operation} onClick={() => handleEdit()}>
                            <Edit/>
                            Edit
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})