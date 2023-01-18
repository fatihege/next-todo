import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import sidePanelStyles from '../../../styles/dashboard/side-panel.module.sass'
import {Settings} from '../../images'
import getProfilePhoto from '../../../helpers/profile-photo'

export default ({auth, settingsPopup}) => {
    const router = useRouter()
    const [profilePhoto, setProfilePhoto] = useState(process.env.DEFAULT_PROFILE_PICTURE)

    useEffect(() => {
        getProfilePhoto(setProfilePhoto)
    }, [auth])

    return (
        <>
            <div className={sidePanelStyles.top}>
                <div className={sidePanelStyles.user}>
                    <div className={sidePanelStyles.profile_picture} onClick={() => router.push('/dashboard/settings/profile')}>
                        <img src={profilePhoto} alt="Profile Picture"/>
                    </div>
                    <div className={sidePanelStyles.user_name} onClick={() => router.push('/dashboard')}>
                        {auth.name}
                    </div>
                </div>
                <div className={sidePanelStyles.settings} onClick={() => settingsPopup.current.show()}>
                    <Settings/>
                </div>
            </div>
        </>
    )
}