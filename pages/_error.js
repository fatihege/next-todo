import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import errorStyles from '../styles/error.module.sass'
import errorCogPic from '../public/images/error-cog.svg'
import errorCogStrokePic from '../public/images/error-cog-stroke.svg'

function Error({statusCode}) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 830)
    }, [])

    return (
        <>
            <Head>
                <title>Oops! - Next Todo</title>
            </Head>
            <div className={errorStyles.error_container}>
                <div className={errorStyles.centre}>
                    <h1 className={errorStyles.reaction}>Oops!</h1>
                    <h2 className={errorStyles.code}>{statusCode}</h2>
                    <Link href="/" className={errorStyles.return_home}>Return to Home</Link>
                </div>
                <div className={`${errorStyles.cogs_bottom} ${!loaded ? errorStyles.bounce_in : ''}`}>
                    <Image src={errorCogPic} alt="Error Cog" className={errorStyles.cog_pic}/>
                    <Image src={errorCogStrokePic} alt="Error Cog Stroke" className={errorStyles.stroke_pic}/>
                </div>
                <div className={`${errorStyles.cogs_top} ${!loaded ? errorStyles.bounce_in : ''}`}>
                    <Image src={errorCogPic} alt="Error Cog" className={`${errorStyles.cog_pic}`}/>
                    <Image src={errorCogStrokePic} alt="Error Cog Stroke" className={errorStyles.stroke_pic}/>
                </div>
            </div>
        </>
    )
}

Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return {statusCode}
}

export default Error