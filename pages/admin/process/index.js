import React, { useState, useEffect } from "react";

import withLayout from '../../../lib/withLayout';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Examination from '../../../components/page/process/examination';
import Validation from '../../../components/page/process/validation';
import Publish from '../../../components/page/process/publish';
import MissionValidate from '../../../components/page/process/mission-validate';
import PostValidate from '../../../components/page/process/post-validate';

const navList = [
    { href: 'examination', className: 'icon noun-loading', text: 'Exament de validation' },
    { href: 'validation', className: 'icon validation', text: 'Validation' },
    { href: 'publish', className: 'icon grid', text: 'Soumetez vos posts avant publication' },
    { href: 'post-validate', className: 'icon post', text: 'Post validé' },
    { href: 'waiting-payment', className: 'icon payment', text: 'Attente paiement' },
    { href: 'mission-validate', className: 'icon flash', text: 'Mission validée' },
]

const getComp = (i) => {
    switch (i) {
        case 0:
            return <Examination />;
        case 1:
            return <Validation />;
        case 2:
            return <Publish />;
        case 3:
            return <PostValidate />;
        case 5:
            return <MissionValidate />;
        default:
            return <Examination />;
    }
}

const CustomerIndex = (props) => {
    const [activeLink, setActiveLink] = useState(3);

    return (
        <div id='process'>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <ul id='process-nav'>
                        {navList.map((e, i) => {
                            return (
                                <li key={i} onClick={() => setActiveLink(i)} >
                                    <span className={e.className}></span>
                                    <Link prefetch href={`#${e.href}`}>
                                        <a className={i == activeLink ? 'orange-color' : 'gray-color'}>{e.text}</a>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
                <Grid item xs={12} sm={9} container>
                    {getComp(activeLink)}
                </Grid>
            </Grid>

        </div>
    )
};

export default withLayout(CustomerIndex);
