import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import Home from '../../../components/page/dashboard/index';
import Influencers from '../../../components/page/dashboard/influencers';
import Marques from '../../../components/page/dashboard/marques';
import Campagne from '../../../components/page/dashboard/campagne';
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
        showMessageView: false,
        showNav: true,
        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [{ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedInfluencer: null,

        marquesList: [{ _id: '5483752', isActif: true, firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },],
        selectedMarque: null,

        campagnesList: [{
            _id: '5483752',
            isActif: true,
            name: 'Campagne Naked blushed ',
            agence: 'Sephora',
            picture: 'influencer_jones.png',
            email: 'Sam.jones@gmail.com',
            phone: '09764314',
            star: 4,
            status: 'Inscrit',
            propositions: [
                { _id: '5483752', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
                { _id: '5483753', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
                { _id: '5483754', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
            ],
            influencers: [
                { _id: '5483755', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', date: '05-08-2019' }
            ]
        },],
        selectedCampagne: null
    });

    const loadMore = (name) => () => {
        const tmp = state[name].push({ _id: '5483752', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En attente de confirmation' },
            { _id: '5483752', bio: 'sdfsdfdsf', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        )
        setState(Object.assign({}, state, { [name]: state[name] }))
    }

    const selectInfluencer = (id) => {
        const elem = state.influencersList.find((e) => e._id == id);
        setState(Object.assign({}, state, { selectedInfluencer: elem }))
    }

    const setSelection = name => id => {
        const elem = state[name].find((e) => e._id == id);
        const e = {
            influencersList: 'selectedInfluencer',
            marquesList: 'selectedMarque',
            campagnesList: 'selectedCampagne',
        }
        setState(Object.assign({}, state, { [e[name]]: elem }))
    }

    const onChange = (name, value) => setState({ ...state, [name]: value })
    const setNavTitle = (value) => value !== state.navTitle && onChange('navTitle', value);
    const resetNav = () => {
        setState({ ...state, selectedInfluencer: null, selectedMarque: null, navTitle: null, selectedCampagne: null, showMessageView: false, showNav: true })
    }
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
            icon: <FeedIcon />,
            page: <Influencers
                datas={state.influencersList}
                selectedInfluencer={state.selectedInfluencer}
                loadMore={loadMore('influencersList')}
                selectInfluencer={selectInfluencer}
                setNavTitle={setNavTitle}
            />,
        },
        {
            href: 'publish', className: 'icon feed', text: 'Marques & Agences',
            icon: <FeedIcon />,
            page: <Marques
                datas={state.marquesList}
                setSelection={setSelection('marquesList')}
                loadMore={loadMore('marquesList')}
                selectedElem={state.selectedMarque}
                setNavTitle={setNavTitle}
            />,
        },
        {
            href: 'post-validate', className: 'icon post', text: 'Campagne',
            icon: <CampagneIcon />,
            page: <Campagne
                datas={state.campagnesList}
                setSelection={setSelection('campagnesList')}
                loadMore={loadMore('campagnesList')}
                selectedElem={state.selectedCampagne}
                setNavTitle={setNavTitle}
                showMessageView={state.showMessageView}
                toggleMessageView={() => onChange('showMessageView', true)}
                setShowNav={() => state.showNav && onChange('showNav', false)}
            />,
        },
    ]
    return (
        <NavPanel
            topTitleLeft='Admin'
            navTitle={state.navTitle}
            navList={navList}
            index={3}
            resetNav={resetNav}
            showNav={state.showNav}
        />
    )
}

export default withLayout(CustomerIndex);
