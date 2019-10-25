import React, { useState, useEffect } from "react";
import withLayout from '../../lib/withLayout';
import NavPanel from '../../components/admin/NavPanel';

import Examination from '../../components/page/process/examination';
import Validation from '../../components/page/process/validation';
import Publish from '../../components/page/process/publish';
import MissionValidate from '../../components/page/process/mission-validate';
import PostValidate from '../../components/page/process/post-validate';

const navList = [
    { href: 'examination', className: 'icon noun-loading', text: 'Exament de validation' },
    { href: 'validation', className: 'icon validation', text: 'Validation' },
    { href: 'publish', className: 'icon grid', text: 'Soumetez vos posts avant publication' },
    { href: 'post-validate', className: 'icon post', text: 'Post validé' },
    { href: 'waiting-payment', className: 'icon payment', text: 'Attente paiement' },
    { href: 'mission-validate', className: 'icon flash', text: 'Mission validée' },
]

const CustomerIndex = (props) => (
    <NavPanel
        navList={navList}
        index={0}
        showNav={true}
        pages={[<Examination />, <Validation />, <Publish />, <PostValidate />, <MissionValidate />, <Examination />]}
    />
)

export default withLayout(CustomerIndex);
