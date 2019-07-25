import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

const NavPanel = ({ navList, index = 0 }) => {
    const [state, setState] = useState({
        index,
        showSubMenu: false,
        subMenuIndex: index,
    });
    let nav = navList[state.index].subMenu ? navList[state.index].subMenu.navList : navList;
    let currentComp;

    if (state.showSubMenu && navList[state.index].subMenu.navList[state.subMenuIndex])
        currentComp = navList[state.index].subMenu.navList[state.subMenuIndex].page;
    else
        currentComp = navList[state.index].page;

    const setNavigation = (index, hasSubMenu) => {
        if (state.showSubMenu)
            setState({ index: state.index, showSubMenu: state.showSubMenu, subMenuIndex: index })
        else
            setState({ index, showSubMenu: hasSubMenu || state.showSubMenu, subMenuIndex: index })
    }
    return (
        <div id='process'>
            <Grid container>
                {state.showSubMenu && <Grid item xs={12} sm={12}>
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <h2 id='subMenuTitle' className='text-right' onClick={() => setState({ index, showSubMenu: false })}>{navList[state.index].subMenu.title}</h2>
                        </Grid>
                    </Grid>
                </Grid>
                }
                <Grid item xs={12} sm={3}>
                    <ul id='process-nav'>
                        {nav && nav.map((e, i) => {
                            return (
                                <li key={i}>
                                    <Link prefetch href={`#${e.href}`}>
                                        <a className={i == state.index ? 'orange-color' : 'gray-color'} onClick={() => setNavigation(i, !!e.subMenu)}>
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
    navList: PropTypes.array.isRequired,
    index: PropTypes.number
}
export default NavPanel;
