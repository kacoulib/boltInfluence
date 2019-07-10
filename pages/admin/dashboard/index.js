import React, { useState, useEffect } from "react";
import withLayout from '../../../lib/withLayout';
import NavPanel from '../../../components/admin/NavPanel';

import Home from '../../../components/page/dashboard/index';
import Validation from '../../../components/page/process/validation';
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import PostValidate from '../../../components/page/process/post-validate';

const navList = [
    { href: 'home', className: 'icon noun-loading', text: 'Exament de validation' },
    { href: 'validation', className: 'icon validation', text: 'Validation' },
    { href: 'publish', className: 'icon grid', text: 'Soumetez vos posts avant publication' },
    { href: 'post-validate', className: 'icon post', text: 'Post validé' },
    { href: 'waiting-payment', className: 'icon payment', text: 'Attente paiement' },
    { href: 'mission-validate', className: 'icon flash', text: 'Mission validée' },
]

const CustomerIndex = (props) => {
    const [data, setData] = useState({
        subscribedInfluencer: 22300, waitingInfluencer: 32300,
        subscribedMarque: 18068, waitingMarque: 5647,
        subscribedCampagne: 5435, waitingCampagne: 6453,
    });

    return (
        <NavPanel
            navList={navList}
            pages={[
                <Home
                    datas={{
                        subscribedInfluencer: data.subscribedInfluencer, waitingInfluencer: data.waitingInfluencer,
                        subscribedMarque: data.subscribedMarque, waitingMarque: data.waitingMarque,
                        subscribedCampagne: data.subscribedCampagne, waitingCampagne: data.waitingCampagne,
                    }}
                />,
                <Validation />,
                <Publish />,
                <PostValidate />,
                <MissionValidate />
            ]}
        />
    )
}

export default withLayout(CustomerIndex);
