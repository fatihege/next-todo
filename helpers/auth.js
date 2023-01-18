import axios from '../lib/axios'

export default async () => {
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data?.user
    } catch (e) {
        return null
    }
}