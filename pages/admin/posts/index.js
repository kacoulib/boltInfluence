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

    const [data, setData] = useState({
        campagneList: [],
        selectedMarqueAgence: null,

        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'mother', text: 'Mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'L\'Oréal', status: 'doing' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' },], firstName: 'Sam', lastName: 'James', name: 'LOréal campagne', picture: 'influencer_jones.png', marque: 'Sephora', status: 'active' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' }, { name: 'mother', text: 'mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'Hilton', status: 'done' }
        ],
        selectedInfluencer: null
    })

    console.log(props)
    const loadMore = () => {
        const tmp = data.campagneList.push({ _id: '5483752', name: 'L\'Oréal', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', status: 'En cours d\'inscription' },
            { _id: '5483752', name: 'Séphora', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', status: 'Inscrit' },
        )
        setData(Object.assign({}, data, { campagneList: data.campagneList }))
    }

    const selectInfluencer = (id) => {
        const elem = data.influencersList.find((e) => e._id = id);
        setData(Object.assign({}, data, { selectedInfluencer: elem }))
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
                            datas={data.influencersList}
                            selectedInfluencer={data.selectedInfluencer}
                            loadMore={loadMore}
                            selectInfluencer={selectInfluencer} />
                    },
                ]
            }
        },
        {
            href: 'account', className: 'icon mark', text: 'Liste des articles', page: <ListPost
                datas={data.influencersList}
                selectedInfluencer={data.selectedInfluencer}
                loadMore={loadMore}
                selectInfluencer={selectInfluencer} />
        },
        // { href: 'payment-information', className: 'icon payment', text: 'Information de paiement', page: <PaymentInfo /> },
        // {
        //     href: 'campagne', className: 'icon photos', text: 'Campagnes', page: <Publish />, subMenu: {
        //         title: 'Campagne', navList: [
        //             {
        //                 href: 'my-campagne', className: 'icon payment', text: 'Mes campagnes', page: <ListPost
        //                     datas={data.influencersList}
        //                     selectedInfluencer={data.selectedInfluencer}
        //                     loadMore={loadMore}
        //                     selectInfluencer={selectInfluencer} />
        //             },
        //             { href: 'mark', className: 'icon mark', text: 'Ajouter une campagne', page: <CreateCampagne /> },

        //         ]
        //     }
        // },
        // {
        //     href: 'influencers', className: 'icon star', text: 'Influenceurs', page: <Influencers datas={data.influencersList}
        //         selectedInfluencer={data.selectedInfluencer}
        //         loadMore={loadMore}
        //         selectInfluencer={selectInfluencer} />
        // },
        // { href: 'contact', className: 'icon message', text: 'Contact plateform', page: <MissionValidate /> },
    ]

    return (
        <div id='admin-article'>
            <NavPanel navList={navList} />
        </div>
    )
}
CustomerIndex.getInitialProps = async ({ req }) => {
    console.log('--')
    const res = await getBookList()
    const json = await res.json()
    console.log('--', res)

    return { stars: json.stargazers_count }
}

export default withAuth(CustomerIndex);
