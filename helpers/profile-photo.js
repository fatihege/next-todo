import axios from '../lib/axios'
import getAuth from './auth'

export default async (setProfilePhoto) => {
    const user = await getAuth()
    if (user?.photo) {
        const response = await axios.get(`/images/${user.photo}`)
        if (response.status === 200) {
            const photo = `${process.env.API_URL}/images/${user.photo}`
            setProfilePhoto(photo)
            return photo
        }
    } else {
        setProfilePhoto(process.env.DEFAULT_PROFILE_PICTURE)
        return process.env.DEFAULT_PROFILE_PICTURE
    }
}