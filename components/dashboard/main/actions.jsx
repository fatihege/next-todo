import {useRouter} from 'next/router'
import mainStyles from '../../../styles/dashboard/main.module.sass'
import {Create, SettingsPurpleStroke} from '../../images'

export default ({todoListPopup, settingsPopup}) => {
    const router = useRouter()

    return (
        <div className={`${mainStyles.grid_section} ${mainStyles.actions}`}>
            <h1 className={mainStyles.title}>Actions</h1>
            <ul>
                <li onClick={() => todoListPopup.current.show({})}>
                    <div className={mainStyles.icon}>
                        <Create/>
                    </div>
                    <div>
                        <div className={mainStyles.name}>Create Todo</div>
                        <div className={mainStyles.description}>
                            Create a todo list.
                        </div>
                    </div>
                </li>
                <li onClick={() => settingsPopup.current.show()}>
                    <div className={mainStyles.icon}>
                        <SettingsPurpleStroke/>
                    </div>
                    <div>
                        <div className={mainStyles.name}>Settings</div>
                        <div className={mainStyles.description}>
                            Change your account settings.
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}