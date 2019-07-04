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
    { href: 'account', className: 'icon account', text: 'Informations de contact' },
    { href: 'mark', className: 'icon mark', text: 'Information de marque' },
    { href: 'payment-information', className: 'icon payment', text: 'Information de paiement' },
    { href: 'campagne', className: 'icon photos', text: 'Campagnes' },
    { href: 'influencers', className: 'icon star', text: 'Influenceurs' },
    { href: 'contact', className: 'icon message', text: 'Contact plateform' },
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
                                <li key={i}>
                                    <Link prefetch href={`#${e.href}`}>
                                        <a className={i == activeLink ? 'orange-color' : 'gray-color'} onClick={() => setActiveLink(i)}>
                                            <span className={e.className}></span>
                                            <span>{e.text}</span>
                                        </a>
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