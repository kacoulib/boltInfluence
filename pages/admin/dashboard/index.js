import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import Home from '../../../components/page/dashboard/index';
import Influencers from '../../../components/page/dashboard/influencers';
import Publish from '../../../components/page/process/publish';
import PostValidate from '../../../components/page/process/post-validate';
import HomeIcon from '../../../static/img/icon/home.svg';
import AccountIcon from '../../../static/img/icon/account.svg';
import FeedIcon from '../../../static/img/icon/feed.svg';
import CampagneIcon from '../../../static/img/icon/campagne.svg';
import { getInfluencerList } from '../../../lib/api/http/admin'



const CustomerIndex = (props) => {
    const [state, setState] = useState({
        navTitle: null,

        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [{ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedInfluencer: { _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' }
    });

    const loadMore = () => {
        const tmp = state.influencersList.push({ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En attente de confirmation' },
            { _id: '5483752', bio: 'sdfsdfdsf', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        )
        setState(Object.assign({}, state, { influencersList: state.influencersList }))
    }

    const selectInfluencer = (id) => {
        const elem = state.influencersList.find((e) => e._id == id);
        setState(Object.assign({}, state, { selectedInfluencer: elem }))
    }

    const onChange = (name, value) => setState({ ...state, [name]: value })
    const setNavTitle = (value) => onChange('navTitle', value);
    const navList = [
        {
            href: 'home', className: 'icon home', text: 'Acceuil',
            icon: <HomeIcon />,
            page: <Home
                datas={{
                    subscribedInfluencer: state.subscribedInfluencer, waitingInfluencer: state.waitingInfluencer,
                    subscribedMarque: state.subscribedMarque, waitingMarque: state.waitingMarque,
                    subscribedCampagne: state.subscribedCampagne, waitingCampagne: state.waitingCampagne,
                }}
            />
        },
        {
            href: 'account', className: 'icon account', text: 'Influencers',
            icon: <AccountIcon />,
            page: <Influencers
                datas={state.influencersList}
                selectedInfluencer={state.selectedInfluencer}
                loadMore={loadMore}
                selectInfluencer={selectInfluencer}
                setNavTitle={setNavTitle}
            />,
        },
        { href: 'publish', className: 'icon feed', text: 'Marques & Agences', icon: <FeedIcon />, page: <Publish />, },
        { href: 'post-validate', className: 'icon post', text: 'Campagne', icon: <CampagneIcon />, page: <PostValidate />, },
    ]
    return (
        <NavPanel
            navList={navList}
            index={1}
            navTitle={state.navTitle}
        />
    )
}

export default withLayout(CustomerIndex);
