import {forwardRef, useImperativeHandle, useRef, useState} from 'react'
import styles from '../../styles/general.module.sass'
import listStyles from '../../styles/dashboard/list.module.sass'
import axios from '../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../helpers/server-response'
import getAuth from '../../helpers/auth'
import {Edit, Delete, Create} from '../images'

export default forwardRef(({alertPopup, alert, setAlert, setAuth}, ref) => {
    const [visibility, setVisibility] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)
    const [canSubmit, setCanSubmit] = useState(true)
    const [listId, setListId] = useState(null)
    const titleRef = useRef()
    const descriptionRef = useRef()
    const [taskMode, setTaskMode] = useState({
        active: false,
        edit: false,
        editId: null,
        title: '',
        description: '',
    })
    const [tasks, setTasks] = useState([])

    useImperativeHandle(ref, () => ({
        show(params) {
            if (params) {
                const {_id, title, description, todos} = params
                setListId(_id)
                titleRef.current.value = title || ''
                descriptionRef.current.value = description || ''
                setTasks(todos && todos.length ? todos.map((todo, i) => {
                    todo.id = i
                    return todo
                }) : [])
            }
            setFadeOut(false)
            setVisibility(true)
        }
    }))

    const close = () => {
        setFadeOut(true)
        setTimeout(() => {
            setVisibility(false)
            setListId(null)
            setTasks([])
            setTaskMode({
                active: false,
                edit: false,
                editId: null,
                title: '',
                description: '',
            })
        }, 400)
    }

    const setTaskTitle = (title) => {
        setTaskMode({
            ...taskMode,
            title,
        })
    }

    const setTaskDescription = (description) => {
        setTaskMode({
            ...taskMode,
            description,
        })
    }

    const activateTaskMode = () => {
        setTaskMode({
            ...taskMode,
            active: true,
            edit: false,
            editId: null,
        })
    }

    const activateEditMode = (id) => {
        if (taskMode.edit)
            if (taskMode.editId === id) return setTaskMode({
                active: false,
                edit: false,
                editId: null,
                title: '',
                description: '',
            })
            else return

        const {title, description} = tasks.find((task) => task.id === id)
        if (!title) return

        setTaskMode({
            active: true,
            edit: true,
            editId: id,
            title,
            description,
        })
    }

    const addTask = () => {
        if (taskMode.edit) return

        const {title, description} = taskMode

        if (title.trim())
            setTasks([
                ...tasks,
                {
                    id: tasks.length,
                    title,
                    description,
                }
            ])

        setTaskMode({
            active: false,
            edit: false,
            editId: null,
            title: '',
            description: '',
        })
    }

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))

        if (taskMode.edit && id === taskMode.editId)
            setTaskMode({
                active: false,
                edit: false,
                editId: null,
                title: '',
                description: '',
            })
    }

    const editTask = () => {
        setTasks(tasks.map((task) => {
            if (task.id === taskMode.editId) {
                task.title = taskMode.title
                task.description = taskMode.description
            }

            return task
        }))

        setTaskMode({
            active: false,
            edit: false,
            editId: null,
            title: '',
            description: '',
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!canSubmit) return
        if (taskMode.active) return addTask()
        setCanSubmit(false)

        const title = titleRef.current.value
        const description = descriptionRef.current.value

        if (!title.trim()?.length) {
            setCanSubmit(true)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.EMPTY_FIELDS),
                type: 'error',
            })
            return alertPopup.current.show()
        }

        try {
            const response = await axios.post(listId ? '/list/update' : '/list/create', {
                id: listId,
                title,
                description,
                todos: tasks,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })

            const {data} = response

            if (data.status) {
                titleRef.current.value = ''
                descriptionRef.current.value = ''
                titleRef.current.blur()
                descriptionRef.current.blur()
                setTasks([])
                setListId(null)
                close()
                setAlert({
                    ...serverResponse(data.type),
                    type: 'success',
                })
                alertPopup.current.show()
                getAuth().then((user) => setAuth(user))
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
            setCanSubmit(true)
            setAlert({
                ...serverResponse(RESPONSE_TYPES.ERROR_CREATING_TODO_LIST),
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
                    <form onSubmit={handleSubmit}>
                        <h1 className={listStyles.title}>{listId ? 'Update Todo List' : 'Create Todo List'}</h1>
                        <input type="text" className={styles.default_input} placeholder="Title (required)"
                               onChange={e => setTaskTitle(e.target.value)} ref={titleRef}/>
                        <textarea className={styles.default_textarea} rows={5} placeholder="Description"
                                  onChange={e => setTaskDescription(e.target.value)} ref={descriptionRef}></textarea>
                        <h2 className={listStyles.subtitle}>Tasks</h2>
                        <div className={listStyles.tasks}>
                            {tasks.map((task) => (
                                <div
                                    className={`${listStyles.task} ${taskMode.edit && taskMode.editId === task.id ? listStyles.active : ''}`}
                                    key={task.id}>
                                    <div className={listStyles.icon}>
                                        <div className={listStyles.circle_icon}></div>
                                    </div>
                                    <div>
                                        <div className={listStyles.task_title}>{task.title}</div>
                                        <div className={listStyles.task_description}>{task.description}</div>
                                    </div>
                                    <div className={listStyles.actions}>
                                        <div className={listStyles.action}
                                             onClick={() => activateEditMode(task.id)}>
                                            <Edit/>
                                        </div>
                                        <div className={listStyles.action} onClick={() => removeTask(task.id)}>
                                            <Delete/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!taskMode.active ? (
                                <div className={`${listStyles.task} ${styles.point}`}
                                     onClick={activateTaskMode}>
                                    <div className={listStyles.icon}>
                                        <Create/>
                                    </div>
                                    <div>
                                        <div className={listStyles.task_title}>Create task</div>
                                    </div>
                                </div>
                            ) : ''}
                        </div>
                        {!taskMode.active ? (
                            <button className={styles.default_button} disabled={!canSubmit}>
                                {listId ? 'Update Todo List' : 'Create Todo List'}
                            </button>
                        ) : (
                            <div>
                                <input type="text" className={styles.default_input} placeholder="Title"
                                       onChange={(e) => setTaskTitle(e.target.value)}
                                       defaultValue={taskMode.edit ? taskMode.title : ''}/>
                                <textarea className={styles.default_textarea} rows={5} placeholder="Description"
                                          onChange={(e) => setTaskDescription(e.target.value)}
                                          defaultValue={taskMode.edit ? taskMode.description : ''}></textarea>
                                <button className={styles.default_button}
                                        onClick={taskMode.edit ? editTask : addTask}>{taskMode.edit ? 'Update Task' : 'Add Task'}</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
})