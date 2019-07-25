import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import MarquesAgences from '../../../components/page/marques/marquesAgences'
import Examination from '../../../components/page/process/examination';
import Validation from '../../../components/page/process/validation';
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import PostValidate from '../../../components/page/process/post-validate';
import CreateCampagne from '../../../components/page/marques/campagne/create';
import ListCampagne from '../../../components/page/marques/campagne/list';



const CustomerIndex = () => {

    const [data, setData] = useState({
        campagneList: [],
        selectedMarqueAgence: null,

        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [
            { _id: '5483752', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'L\'Oréal', status: 'doing' },
            { _id: '5483752', name: 'LOréal campagne', picture: 'influencer_jones.png', marque: 'Sephora', status: 'active' },
            { _id: '5483752', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'Hilton', status: 'done' }],
        selectedInfluencer: null
    })

    const loadMore = () => {
        const tmp = data.campagneList.push({ _id: '5483752', name: 'L\'Oréal', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', status: 'En cours d\'inscription' },
            { _id: '5483752', name: 'Séphora', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', status: 'Inscrit' },
        )
        setData(Object.assign({}, data, { campagneList: data.campagneList }))
    }

    const selectMarquesAgences = (id) => {
        const elem = data.campagneList.find(e => e._id = id);
        setData(Object.assign({}, data, { selectedMarqueAgence: elem }))
    }
    const selectInfluencer = (id) => {
        const elem = data.influencersList.find((e) => e._id = id);
        setData(Object.assign({}, data, { selectedInfluencer: elem }))
    }

    const navList = [
        { href: 'mark', className: 'icon mark', text: 'Information de marque', page: <CreateCampagne /> },
        {
            href: 'account', className: 'icon account', text: 'Informations de contact', page: <MarquesAgences
                datas={data.campagneList}
                loadMore={loadMore}
                selectedMarqueAgence={data.selectedMarqueAgence}
                selectMarquesAgences={selectMarquesAgences}
            />,
        },
        { href: 'mark', className: 'icon mark', text: 'Information de marque', page: <Examination /> },
        { href: 'payment-information', className: 'icon payment', text: 'Information de paiement', page: <Validation /> },
        {
            href: 'campagne', className: 'icon photos', text: 'Campagnes', page: <Publish />, subMenu: {
                title: 'Campagne', navList: [
                    {
                        href: 'my-campagne', className: 'icon payment', text: 'Mes campagnes', page: <ListCampagne
                            datas={data.influencersList}
                            selectedInfluencer={data.selectedInfluencer}
                            loadMore={loadMore}
                            selectInfluencer={selectInfluencer} />
                    },
                    { href: 'mark', className: 'icon mark', text: 'Ajouter une campagne', page: <Examination /> },

                ]
            }
        },
        { href: 'influencers', className: 'icon star', text: 'Influenceurs', page: <PostValidate /> },
        { href: 'contact', className: 'icon message', text: 'Contact plateform', page: <MissionValidate /> },
    ]

    return (
        <NavPanel navList={navList} />
    )
}

export default withLayout(CustomerIndex);
