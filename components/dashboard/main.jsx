import mainStyles from '../../styles/dashboard/main.module.sass'
import User from './main/user'
import Lists from './main/lists'
import Actions from './main/actions'

export default ({alertPopup, setAlert, auth, setAuth, todoListPopup, listPopup, starredPopup, archivedPopup, settingsPopup}) => {

    return (
        <div className={mainStyles.main}>
            <User auth={auth}/>
            <div className={mainStyles.grid}>
                <Lists alertPopup={alertPopup} setAlert={setAlert} auth={auth} setAuth={setAuth}
                       todoListPopup={todoListPopup} listPopup={listPopup} starredPopup={starredPopup}
                       archivedPopup={archivedPopup}/>
                <Actions todoListPopup={todoListPopup} settingsPopup={settingsPopup}/>
            </div>
        </div>
    )
}