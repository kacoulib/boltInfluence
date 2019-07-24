import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import MarquesAgences from '../../../components/page/marques/marquesAgences'
import Examination from '../../../components/page/process/examination';
import Validation from '../../../components/page/process/validation';
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import PostValidate from '../../../components/page/process/post-validate';



const CustomerIndex = () => {

    const [data, setData] = useState({
        marquesAgencesList: [],
        selectedMarqueAgence: null,
    })

    const loadMore = () => {
        const tmp = data.marquesAgencesList.push({ _id: '5483752', name: 'L\'Oréal', picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'En cours d\'inscription' },
            { _id: '5483752', name: 'Séphora',picture: 'influencer_jones.png', email: 'Sam.jones@gmail.com', phone: '09764314', star: 4, status: 'Inscrit' },
        )
        setData(Object.assign({}, data, { marquesAgencesList: data.marquesAgencesList }))
    }

    const selectMarquesAgences = (id) =>  {
        const elem = data.marquesAgencesList.find(e => e._id = id);
        setData(Object.assign({}, data, { selectedMarqueAgence: elem }))
    }

    const navList = [
        { id: 'account', href: 'account', className: 'icon account', text: 'Informations de contact', page: <MarquesAgences
        datas={data.marquesAgencesList} 
        loadMore={loadMore}
        selectedMarqueAgence={data.selectedMarqueAgence}
        selectMarquesAgences={selectMarquesAgences}
    />, },
        { id: 'mark', href: 'mark', className: 'icon mark', text: 'Information de marque', page: <Examination /> },
        { id: 'payment-information', href: 'payment-information', className: 'icon payment', text: 'Information de paiement', page: <Validation /> },
        { id: 'campagne', href: 'campagne', className: 'icon photos', text: 'Campagnes', page: <Publish />, subMenu: {
            title: 'Campagne', navList: [
                { id: 'mark', href: 'mark', className: 'icon mark', text: 'Information de marque', page: <Examination /> },
                { id: 'payment-information', href: 'payment-information', className: 'icon payment', text: 'Information de paiement', page: <Validation /> },        
            ]
        } },
        { id: 'influencers', href: 'influencers', className: 'icon star', text: 'Influenceurs', page: <PostValidate /> },
        { id: 'contact', href: 'contact', className: 'icon message', text: 'Contact plateform', page: <MissionValidate /> },
    ]

    return (
        <NavPanel
        navList={navList}
 
    />
    )
}

export default withLayout(CustomerIndex);
