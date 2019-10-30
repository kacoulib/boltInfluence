import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import withAuth from '../../../lib/withAuth';
import { getCampagn } from '../../../lib/api/http/user/influencer';


const CampagnDetail = ({ query }) => {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            console.log(await getCampagn('free-the-mongo-mango'))
        })()
    }, [])
    console.log(router.query)
    return (
        'detail'
    )
}

CampagnDetail.getInitialProps = ({ res, query }) => {
    console.log(query, res)

    return { query }
}

export default withAuth(CampagnDetail, { showAside: false, showSideProfile: false });
