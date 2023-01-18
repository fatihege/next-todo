import Head from 'next/head'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Register from '../components/guest/register'

export default ({auth}) => {
    const router = useRouter()

    useEffect(() => {
        if (auth) router.push('/dashboard', null, {
            shallow: true,
        })
    }, [auth])

    return (
        <>
            <Head>
                <title>Register to Next Todo</title>
            </Head>
            <Register/>
        </>
    )
}