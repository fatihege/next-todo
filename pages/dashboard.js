import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Dashboard from '../components/user/dashboard'

export default ({auth, setAuth}) => {
    const router = useRouter()

    useEffect(() => {
        if (!auth) router.push('/', null, {
            shallow: true,
        })
    }, [auth])

    return (
        <>
            <Head>
                <title>Next Todo Dashboard</title>
            </Head>
            <Dashboard auth={auth} setAuth={setAuth}/>
        </>
    )
}