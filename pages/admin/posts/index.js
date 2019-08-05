import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import withAuth from '../../../lib/withAuth';
import NavPanel from '../../../components/admin/NavPanel';

import Influencers from '../../../components/page/posts/influencers'
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import CreateCampagne from '../../../components/page/posts/campagne/create';
import ListPost from '../../../components/page/posts/list';
import Faq from '../../../components/page/posts/faq';
import CreatePost from '../../../components/page/posts/create';
import PaymentInfo from '../../../components/page/posts/info-payment';
import { getArticles, getBookList } from '../../../lib/api/http/admin';



const CustomerIndex = (props) => {

    const [state, setState] = useState({
        campagneList: [],
        selectedMarqueAgence: null,

        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        articles: [
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'mother', text: 'Mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'L\'Oréal', status: 'doing' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' },], firstName: 'Sam', lastName: 'James', name: 'LOréal campagne', picture: 'influencer_jones.png', marque: 'Sephora', status: 'active' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' }, { name: 'mother', text: 'mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'Hilton', status: 'done' }
        ],
        selectedInfluencer: null
    })

    useEffect(() => {
        async function getData() {
            const articles = await getArticles();
            console.log('ok', articles)
            setState({ ...state, ...articles })
        }
        getData()
    }, [])
    const loadMore = () => {
        // setState(Object.assign({}, state, { campagneList: state.campagneList }))
    }

    const selectInfluencer = (id) => {
        const elem = state.articles.find((e) => e._id = id);
        setState(Object.assign({}, state, { selectedInfluencer: elem }))
    }

    const navList = [
        // { href: 'mark', className: 'icon mark', text: 'Ajouter une campagne', page: <CreateCampagne /> },
        { href: 'account', className: 'icon ', text: 'F.A.Q', page: <Faq /> },
        {
            href: 'article', className: 'icon photos', text: 'Articles', subMenu: {
                title: 'Articles', navList: [
                    { href: 'mark', className: 'icon photos', text: 'Créer un article', page: <CreatePost /> },
                    {
                        href: 'account', className: 'icon mark', text: 'Liste des articles', page: <ListPost
                            datas={state.articles}
                            selectedInfluencer={state.selectedInfluencer}
                            loadMore={loadMore}
                            selectInfluencer={selectInfluencer} />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'Liste des articles', page: <ListPost
                datas={state.articles}
                selectedInfluencer={state.selectedInfluencer}
                loadMore={loadMore}
                selectInfluencer={selectInfluencer} />
        },
    ]

    return (
        <div id='admin-article'>
            <NavPanel navList={navList} />
        </div>
    )
}

export default withLayout(CustomerIndex);
