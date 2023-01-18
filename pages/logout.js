import {useRouter} from 'next/router'
import {useEffect} from 'react'
import logout from '../helpers/logout'

export default ({setAuth}) => {
    const router = useRouter()

    useEffect(() => {
        logout().then(() => {
            setAuth(null)
            router.push('/')
        })
    }, [])
}