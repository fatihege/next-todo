import {useRouter} from 'next/router'
import Head from 'next/head'
import {useEffect} from 'react'

export default ({auth}) => {
    const router = useRouter()

    useEffect(() => {
        if (auth) router.push('/dashboard', null, {
            shallow: true,
        })
        else router.push('/login', null, {
            shallow: true,
        })
    }, [auth])

    return (
        <>
            <Head>
                <title>Next Todo</title>
            </Head>
        </>
    )
}