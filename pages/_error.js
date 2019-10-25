import React from 'react'
import Header from '../components/header/index';
import Footer from '../components/footer/index';
// import Link from 'next/link';
import { Link } from '../server/routes/next-routes'


const Error = ({ statusCode }) => (
    <>
        <Header />
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
        <Link href='/posts'><a>Posts</a></Link>
        <Footer />
    </>
)

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error