import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import MarquesAgences from '../../../components/page/marques/marquesAgences'
import Examination from '../../../components/page/process/examination';
import Influencers from '../../../components/page/marques/influencers'
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import PostValidate from '../../../components/page/process/post-validate';
import CreateCampagne from '../../../components/page/marques/campagne/create';
import ListCampagne from '../../../components/page/marques/campagne/list';
import ContactInfo from '../../../components/page/marques/info-contact';
import MarqueInfo from '../../../components/page/marques/info-marque';
import PaymentInfo from '../../../components/page/marques/info-payment';



const CustomerIndex = () => {

    const [data, setData] = useState({
        campagneList: [],
        selectedMarqueAgence: null,

        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,

        influencersList: [
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'mother', text: 'Mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'L\'Oréal', status: 'doing' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' },], firstName: 'Sam', lastName: 'James', name: 'LOréal campagne', picture: 'influencer_jones.png', marque: 'Sephora', status: 'active' },
            { _id: '5483752', location: 'Saratoga, CA, USA', interests: [{ name: 'travel', text: 'Travel' }, { name: 'mother', text: 'mother' }, { name: 'mode', text: 'Mode' }], firstName: 'Sam', lastName: 'James', name: 'Campagne Naked blushed', picture: 'influencer_jones.png', marque: 'Hilton', status: 'done' }],
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
        // { href: 'mark', className: 'icon mark', text: 'Ajouter une campagne', page: <CreateCampagne /> },

        { href: 'mark', className: 'icon mark', text: 'Information de marque', page: <ContactInfo /> },
        {
            href: 'account', className: 'icon account', text: 'Informations de contact', page: <MarqueInfo />,
        },
        { href: 'payment-information', className: 'icon payment', text: 'Information de paiement', page: <PaymentInfo /> },
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
                    { href: 'mark', className: 'icon mark', text: 'Ajouter une campagne', page: <CreateCampagne /> },

                ]
            }
        },
        {
            href: 'influencers', className: 'icon star', text: 'Influenceurs', page: <Influencers datas={data.influencersList}
                selectedInfluencer={data.selectedInfluencer}
                loadMore={loadMore}
                selectInfluencer={selectInfluencer} />
        },
        { href: 'contact', className: 'icon message', text: 'Contact plateform', page: <MissionValidate /> },
    ]

    return (
        <div id='admin-marque'>
            <NavPanel navList={navList} />
        </div>
    )
}

export default withLayout(CustomerIndex);
