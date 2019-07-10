import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const NavPanel = ({ pages, navList, index = 0 }) => {
    const [activeLink, setActiveLink] = useState(index);
    const currentComp = pages[activeLink] ? pages[activeLink] : pages[0];

    return (
        <div id='process'>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    <ul id='process-nav'>
                        {navList && navList.map((e, i) => {
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
                    {currentComp}
                </Grid>
            </Grid>

        </div>
    )
};

NavPanel.propTypes = {
    pages: PropTypes.node.isRequired,
    navList: PropTypes.array.isRequired,
    index: PropTypes.number
}
export default NavPanel;
