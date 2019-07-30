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

const navList = [
    { href: 'account', className: 'icon account', text: 'Informations de contact' },
    { href: 'mark', className: 'icon mark', text: 'Information de marque' },
    { href: 'payment-information', className: 'icon payment', text: 'Information de paiement' },
    { href: 'campagne', className: 'icon photos', text: 'Campagnes' },
    { href: 'influencers', className: 'icon star', text: 'Influenceurs' },
    { href: 'contact', className: 'icon message', text: 'Contact plateform' },
]

const CustomerIndex = () => {

    const [data, setData] = useState({
        influencersList: []
    })

    const loadMore = () => {
        const tmp = data.influencersList.push({ _id: '5483752', name: 'L\'Oréal', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En cours d\'inscription' },
            { _id: '5483752', name: 'Séphora', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        )
        setData(Object.assign({}, data, { influencersList: data.influencersList }))
    }

    return (
        <NavPanel
            navList={navList}
            pages={[
                <MarquesAgences
                    datas={data.influencersList}
                    loadMore={loadMore}
                />,
                <Examination />,
                <Validation />,
                <Publish />,
                <PostValidate />,
                <MissionValidate />
            ]}
        />
    )
}

export default withLayout(CustomerIndex);
