import sidePanelStyles from '../../../styles/dashboard/side-panel.module.sass'
import logout from '../../../helpers/logout'
import {Logout} from '../../images'

export default ({setAuth, setAlert, alertRef}) => {
    const handleLogout = () => {
        setAlert({
            title: 'Oh hey!',
            description: 'You are signing out of your account, but are you sure you want to do that?',
            type: 'error',
            buttons: 'verify',
            dangerBtnText: 'Logout',
        })

        alertRef.current.show(() => {
            logout().then(() => setAuth(null))
        })
    }

    return (
        <div className={sidePanelStyles.logout_container}>
            <div className={sidePanelStyles.logout} onClick={handleLogout}>
                <Logout/>
                <span>Logout</span>
            </div>
        </div>
    )
}