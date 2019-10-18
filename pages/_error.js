import React from 'react'
import Header from '../components/header/index';
import Footer from '../components/footer/index';

const Error = ({ statusCode }) => (
    <>
        <Header />
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
        <Footer />
    </>
)

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error