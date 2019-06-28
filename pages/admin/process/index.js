import React, { useState, useEffect } from "react";

import withLayout from '../../../lib/withLayout';
import Grid from '@material-ui/core/Grid';

const navList = [
    { className: 'icon noun-loading', text: 'Exament de validation' },
    { className: 'icon validation', text: 'Validation' },
    { className: 'icon grid', text: 'Soumetez vos posts avant publication' },
    { className: 'icon post', text: 'Post validé' },
    { className: 'icon payment', text: 'Attente paiement' },
    { className: 'icon flash', text: 'Mission validée' },
]

const CustomerIndex = (props) => {
    const [activeLink, setActiveLink] = useState(0)

    return (
        <div id='process'>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <ul id='process-nav'>
                        {navList.map((e, i) => {
                            return (
                                <li onClick={() => setActiveLink(i)} >
                                    <span className={e.className}></span>
                                    <a className={i == activeLink ? 'orange-color' : 'inactive-link'}>{e.text}</a>
                                </li>
                            )
                        })}
                    </ul>
                </Grid>
                <Grid item xs={12} sm={9}>
                    {props.children}
                </Grid>
            </Grid>

        </div>
    )
};

export default withLayout(CustomerIndex);
