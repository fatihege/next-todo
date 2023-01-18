import Top from './side-panel/top'
import Lists from './side-panel/lists'
import Logout from './side-panel/logout'
import sidePanelStyles from '../../styles/dashboard/side-panel.module.sass'

export default ({auth, setAuth, setAlert, alertPopup, todoListPopup, listPopup, starredPopup, archivedPopup, settingsPopup}) => {
    return (
        <>
            <div className={sidePanelStyles.side_panel}>
                <Top auth={auth} settingsPopup={settingsPopup}/>
                <Lists auth={auth} todoListPopup={todoListPopup} listPopup={listPopup} starredPopup={starredPopup}
                       archivedPopup={archivedPopup}/>
                <Logout setAuth={setAuth} setAlert={setAlert} alertRef={alertPopup}/>
            </div>
        </>
    )
}