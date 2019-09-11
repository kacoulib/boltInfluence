import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import Home from '../../../components/page/dashboard/index';
import Influencers from '../../../components/page/dashboard/influencers';
import Publish from '../../../components/page/process/publish';
import PostValidate from '../../../components/page/process/post-validate';
import { getInfluencerList } from '../../../lib/api/http/admin'



const CustomerIndex = (props) => {
    const [data, setData] = useState({
        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [{ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedInfluencer: null
    });

    const loadMore = () => {
        const tmp = data.influencersList.push({ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En attente de confirmation' },
            { _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        )
        setData(Object.assign({}, data, { influencersList: data.influencersList }))
    }

    const selectInfluencer = (id) => {
        const elem = data.influencersList.find((e) => e._id == id);
        setData(Object.assign({}, data, { selectedInfluencer: elem }))
    }

    // useEffect(() => {
    //     getInfluencerList()
    //         .then(res => {
    //             const tmp = Object.assign({}, data, { influencersList: res.influencers })
    //             setData(tmp);

    //             console.log(tmp)
    //         })
    // }, [])
    const navList = [
        {
            href: 'home', className: 'icon home', text: 'Acceuil', page: <Home
                datas={{
                    subscribedInfluencer: data.subscribedInfluencer, waitingInfluencer: data.waitingInfluencer,
                    subscribedMarque: data.subscribedMarque, waitingMarque: data.waitingMarque,
                    subscribedCampagne: data.subscribedCampagne, waitingCampagne: data.waitingCampagne,
                }}
            />
        },
        {
            href: 'account', className: 'icon account', text: 'Influencers', page: <Influencers
                datas={data.influencersList}
                selectedInfluencer={data.selectedInfluencer}
                loadMore={loadMore}
                selectInfluencer={selectInfluencer}
            />,
        },
        { href: 'publish', className: 'icon feed', text: 'Marques & Agences', page: <Publish />, },
        { href: 'post-validate', className: 'icon post', text: 'Campagne', page: <PostValidate />, },
    ]
    return (
        <NavPanel
            navList={navList}
            index={1}
        />
    )
}

export default withLayout(CustomerIndex);
