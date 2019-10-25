import React, { useState } from "react";
import NavPanel from '../NavPanel';

import InfluencersDetail from '../../page/dashboard/influencer-detail';
import Campagne from '../../page/dashboard/campagne';
import FeedIcon from '../../../static/img/icon/feed.svg';
import CampagneIcon from '../../../static/img/icon/campagne.svg';
import WebKit from '../../page/influencer/media-kit';
import Dashboard from '../../page/influencer/dashboard';
import Message from '../../page/influencer/message';

import { customRequest } from '../../../lib/api/http/index';


const CustomerIndex = ({ user }) => {

    const [state, setState] = useState({
        navTitle: null,
        showMessageView: false,
        showNav: true,
        showSubMenu: false,

        selectedInfluencer: null,

        selectedMarque: null,

        selectedCampagne: null,
        influencers: [],
        selected: null,
        influencers: [],
        datas: null,
        limit: 2,
        offset: 0,
    }),
        addRowNumber = 2;

    const getData = async ({ requestName, limit = 2, offset = 0 } = {}) => {

        const { path, requestProp } = createTopNav(requestName);

        if (!requestName)
            return;
        let tmp = await customRequest({ path: `${path}?limit=${limit}&offset=${offset}` });
        if (tmp && (tmp = tmp[requestProp])) {
            if (onChange) {
                if (typeof tmp == 'Object') {
                    for (const key in tmp) {
                        if (tmp.hasOwnProperty(key)) {
                            const element = tmp[key];
                            onChange("datas", element)
                        }
                    }
                }
                else
                    onChange("datas", tmp)
            }
        }
    }

    const setSelection = id => {
        const selected = state.datas ? state.datas.find((e) => e._id == id) : null;

        onChange('selected', selected)
    }
    const onChange = (name, value) => setState({ ...state, [name]: value })
    const setNavTitle = (value) => value !== state.navTitle && onChange('navTitle', value);
    const resetNav = () => {
        setState({ ...state, datas: null, limit: addRowNumber, offset: 0, selected: null, selectedInfluencer: null, selectedMarque: null, navTitle: null, selectedCampagne: null, showMessageView: false, showNav: true, showSubMenu: false })
    }
    const loadMore = (requestName) => getData({ requestName, limit: state.limit += addRowNumber })
    const createTopNav = (name) => ({ path: `/admin/${name}`, requestProp: name })

    const setElemProps = (title, requestName) => ({
        title,
        setSelection: setSelection,
        selected: state.selected,
        datas: state.datas,
        loadMore: () => loadMore(requestName)
    })
    const fakeUser = {
        firstName: 'Sam',
        lastName: 'Jons',
        phone: '+3398765432',
        email: 'Samjones@gmail.com',
        src: '../../static/img/sam_jones.png',
        address: '223 westview boulevard, 75000, Paris France',
        slug: 'sam'
    }
    const navList = [
        {
            href: 'account', className: 'icon account', text: 'Informations', icon: <FeedIcon />,
            requestName: 'influencers',
            page: <InfluencersDetail selected={user} />
        },
        {
            href: 'account', className: 'icon account', text: 'Tableau de bord', icon: <FeedIcon />,
            requestName: 'influencers',
            page: <Dashboard selected={user} />
        },
        {
            href: 'publish', className: 'icon feed', text: 'Media kit', icon: <FeedIcon />,
            requestName: 'businesses',

            page: <WebKit user={fakeUser} />,
            contentClassName: 'hide-content-panel-padding',
            dashboardClassName: 'webkit'
        },
        {
            href: 'post-validate', className: 'icon post', text: 'Campagnes', icon: <CampagneIcon />,
            requestName: 'campaigns',

            page: <Campagne {...setElemProps('Campagnes', 'campaigns')} />
        },
        {
            href: 'account', className: 'icon mark', text: 'Messagerie',
            page: <Message />
        },
    ]

    return (
        <NavPanel
            navTitle={state.navTitle}
            navList={navList}
            index={0}
            showSubMenu={state.showSubMenu}
            resetNav={resetNav}
            showNav={state.showNav}
            onChange={onChange}
            getData={getData}
            showUserProfile={true}
            user={user}
        />
    )
}

const InfluencerNav = [
    {
        href: '/influencer/informations', className: 'icon account', text: 'Informations',
        icon: <FeedIcon />,
        requestName: 'influencers',
    },
    {
        href: '/influencer/dashboard', className: 'icon account', text: 'Tableau de bord',
        icon: <FeedIcon />,
        requestName: 'influencers',
    },
    {
        href: '/influencer/mediakit', className: 'icon feed', text: 'Media kit',
        icon: <FeedIcon />,
        requestName: 'businesses',

        contentClassName: 'hide-content-panel-padding',
        dashboardClassName: 'webkit'
    },
    {
        href: '/influencer/campagn', className: 'icon post', text: 'Campagnes',
        icon: <CampagneIcon />,
        requestName: 'campaigns',

    },
    {
        href: '/influencer/message', className: 'icon mark', text: 'Messagerie',
    },
]

export { InfluencerNav }

export default CustomerIndex;
