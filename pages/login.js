import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Login from '../components/guest/login'

export default ({auth, setAuth}) => {
    const router = useRouter()

    useEffect(() => {
        if (auth) router.push('/dashboard', null, {
            shallow: true,
        })
    }, [auth])

    return (
        <>
            <Head>
                <title>Login to Next Todo</title>
            </Head>
            <Login setAuth={setAuth}/>
        </>
    )
}
