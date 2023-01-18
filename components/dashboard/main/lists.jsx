import {useRouter} from 'next/router'
import {useState} from 'react'
import styles from '../../../styles/general.module.sass'
import mainStyles from '../../../styles/dashboard/main.module.sass'
import axios from '../../../lib/axios'
import serverResponse, {RESPONSE_TYPES} from '../../../helpers/server-response'
import getAuth from '../../../helpers/auth'
import {Archive, Delete, Edit, Star} from '../../images'

export default ({alertPopup, setAlert, auth, setAuth, todoListPopup, listPopup, starredPopup, archivedPopup}) => {
    const router = useRouter()
    const [search, setSearch] = useState('')

    const handleOpenList = (list) => {
        listPopup.current.show({
            id: list._id,
            ...list,
        })
    }

    const handleEditList = (list) => {
        todoListPopup.current.show(list)
    }

    const handleDeleteList = (id) => {
        if (!id) return
        setAlert({
            title: 'Are you sure? 🧐',
            description: 'You are trying to delete this todo list, are you really going to do that?',
            type: 'error',
            buttons: 'verify',
            dangerBtnText: 'Delete',
        })
        alertPopup.current.show(async () => {
            try {
                const response = await axios.post('/list/delete', {id}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                const {data} = response

                if (data.status) {
                    getAuth().then((user) => setAuth(user))

                    setAlert({
                        ...serverResponse(data.type),
                        type: 'success',
                    })
                } else
                    setAlert({
                        ...serverResponse(data.type),
                        type: 'error',
                    })
                alertPopup.current.show()
            } catch (e) {
                setAlert({
                    ...serverResponse(RESPONSE_TYPES.ERROR_DELETING_TODO_LIST),
                    type: 'error',
                })
                alertPopup.current.show()
            }
        })
    }

    return (
        <div className={mainStyles.grid_section}>
            <h1 className={mainStyles.title}>Todo Lists</h1>
            {auth.lists && auth.lists.length ? (
                <div>
                    <input type="text" className={styles.default_input} placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                </div>
            ) : ''}
            <ul>
                <li onClick={() => starredPopup.current.show()}>
                    <div className={mainStyles.icon}>
                        <Star/>
                    </div>
                    <div>
                        <div className={mainStyles.name}>Starred</div>
                        <div className={mainStyles.description}>
                            Your starred to do lists.
                        </div>
                    </div>
                </li>
                <li onClick={() => archivedPopup.current.show()}>
                    <div className={mainStyles.icon}>
                        <Archive/>
                    </div>
                    <div>
                        <div className={mainStyles.name}>Archived</div>
                        <div className={mainStyles.description}>
                            Your archived to do lists.
                        </div>
                    </div>
                </li>
                {
                    auth.lists?.filter(
                        (list) => (list.title.toLowerCase().includes(search.toLowerCase()) ||
                            list.description?.toLowerCase().includes(search.toLowerCase())) && !list.archive)
                        .map((list) => {
                        const completed = list.todos.length && !list.todos.filter((t) => !t.completed).length

                        return (
                            <li key={list._id} className={`${!list.description ? mainStyles.no_description : ''} ${completed ? mainStyles.completed : ''}`} onClick={() => handleOpenList(list)}>
                                <div className={mainStyles.icon_circle}>
                                    <div className={mainStyles.circle}></div>
                                </div>
                                <div>
                                    <div className={mainStyles.name}>{list.title}</div>
                                    <div className={mainStyles.description}>{list.description}</div>
                                </div>
                                <div className={mainStyles.actions}>
                                    <div className={mainStyles.action} onClick={(e) => {
                                        handleEditList(list)
                                        e.stopPropagation()
                                    }}>
                                        <Edit/>
                                    </div>
                                    <div className={mainStyles.action} onClick={(e) => {
                                        handleDeleteList(list._id)
                                        e.stopPropagation()
                                    }}>
                                        <Delete/>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}