import {useEffect, useState} from 'react'
import Head from 'next/head'
import getAuth from '../helpers/auth'
import '../styles/globals.sass'

export default function App({Component, pageProps}) {
    const [auth, setAuth] = useState(null)

    useEffect(() => {
        getAuth().then((user) => setAuth(user))
    }, [])

    return (
        <>
            <Head>
                <title>Next Todo</title>
                <link rel="shortcut icon" href="/images/favicon.png"/>
            </Head>
            <Component {...pageProps} auth={auth} setAuth={setAuth}/>
        </>
    )
}