import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const NavPanel = ({ navList, index = 0 }) => {
    const [state, setState] = useState({
        index,
        showSubMenu: false
    });
    const currentComp = navList[state.index].page;
    const nav = navList[state.index].subMenu ? navList[state.index].subMenu.navList: navList;
    console.log(nav)
    return (
        <div id='process'>
            <Grid container>
                <Grid item xs={12} sm={3}>
                    {state.showSubMenu && <h2><span onClick={()=> setState({index, showSubMenu: false})}>sdsqsqdsqd</span>{navList[state.index].subMenu.title}</h2>}
                    <ul id='process-nav'>
                        {nav && nav.map((e, i) => {
                            return (
                                <li key={i}>
                                    <Link prefetch href={`#${e.href}`}>
                                        <a className={i == state.index ? 'orange-color' : 'gray-color'} onClick={() => setState({index: i, showSubMenu: e.subMenu})}>
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
                    { currentComp }
                </Grid>
            </Grid>

        </div>
    )
};

NavPanel.propTypes = {
    navList: PropTypes.array.isRequired,
    index: PropTypes.number
}
export default NavPanel;
