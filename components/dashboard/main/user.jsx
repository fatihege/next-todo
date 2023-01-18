import Image from 'next/image'
import {useEffect, useState} from 'react'
import format from 'date-format'
import timeAgo from '../../../lib/time-ago'
import mainStyles from '../../../styles/dashboard/main.module.sass'
import getProfilePhoto from '../../../helpers/profile-photo'

export default ({auth}) => {
    const [profilePhoto, setProfilePhoto] = useState(process.env.DEFAULT_PROFILE_PICTURE)

    useEffect(() => {
        getProfilePhoto(setProfilePhoto)
    }, [auth])

    return (
        <div className={mainStyles.user}>
            <div className={mainStyles.image}>
                <img src={profilePhoto} alt="Profile Picture"/>
            </div>
            <div className={mainStyles.user_info}>
                <div className={mainStyles.user_name}>{auth.name}</div>
                <div className={mainStyles.user_email}>{auth.email}</div>
            </div>
            <div className={mainStyles.creation}>
                <div className={mainStyles.joined}>
                    Joined {timeAgo(auth.createdAt)}
                </div>
                <div className={mainStyles.created_at}>
                    {format.asString('dd/MM/yyyy hh:mm', new Date(auth.createdAt))}
                </div>
            </div>
        </div>
    )
}