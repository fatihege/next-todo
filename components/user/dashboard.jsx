import {useRef, useState} from 'react'
import SidePanel from '../dashboard/side-panel'
import Main from '../dashboard/main'
import Alert from '../alert'
import ListPopup from './list-popup'
import List from './list'
import Starred from './starred'
import Archived from './archived'
import Settings from './settings'

export default ({auth, setAuth}) => {
    const alertPopup = useRef()
    const settingsPopup = useRef()
    const listPopup = useRef()
    const todoListPopup = useRef()
    const starredPopup = useRef()
    const archivedPopup = useRef()
    const [alert, setAlert] = useState({
        title: '',
        description: '',
        type: 'error',
        buttons: ''
    })

    return auth ? (
        <>
            <Alert props={alert} ref={alertPopup}/>
            <Settings alertPopup={alertPopup} alert={alert} setAlert={setAlert} setAuth={setAuth} auth={auth}
                      ref={settingsPopup}/>
            <List alertPopup={alertPopup} alert={alert} setAlert={setAlert} ref={listPopup} setAuth={setAuth}
                  todoListPopup={todoListPopup}/>
            <ListPopup alertPopup={alertPopup} alert={alert} setAlert={setAlert} ref={todoListPopup} setAuth={setAuth}/>
            <Starred alertPopup={alertPopup} alert={alert} setAlert={setAlert} ref={starredPopup} auth={auth}
                     setAuth={setAuth} listPopup={listPopup}/>
            <Archived alertPopup={alertPopup} alert={alert} setAlert={setAlert} ref={archivedPopup} auth={auth}
                      setAuth={setAuth} listPopup={listPopup}/>
            <SidePanel auth={auth} setAuth={setAuth} setAlert={setAlert} alertPopup={alertPopup}
                       todoListPopup={todoListPopup} listPopup={listPopup} starredPopup={starredPopup}
                       archivedPopup={archivedPopup} settingsPopup={settingsPopup}/>
            <Main alertPopup={alertPopup} setAlert={setAlert} auth={auth} setAuth={setAuth}
                  todoListPopup={todoListPopup}
                  listPopup={listPopup} starredPopup={starredPopup} archivedPopup={archivedPopup}
                  settingsPopup={settingsPopup}/>
        </>
    ) : <></>
}