import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import UserProfile from '../../dataDisplay/others/userInfo'

const containerStyle = {
    padding: '0 3rem'
}
const noNavContainerStyle = {
    padding: '0 2.4rem'
}


const NavPanel = (props) => {
    const { navList, index = 0, navTitle = null, resetNav, showSubMenu = false, showNav, showSideProfile, user = {}, topTitleLeft, pathname } = props;

    let [state, setState] = useState({
        index,
        showSubMenu,
        subMenuIndex: index,
        resetTopNav: false,
        limit: 2,
        offset: 0,
    }),
        topNav = navList[state.index],
        nav = topNav && navList[state.index].subMenu ? navList[state.index].subMenu.navList : navList,
        currentComp;

    const getCurrent = () => {
        let tmp;

        if (state.showSubMenu && topNav.subMenu.navList[state.subMenuIndex])
            tmp = topNav.subMenu.navList[state.subMenuIndex];
        else if (topNav)
            tmp = topNav;
        return tmp;
    }
    if ((currentComp = getCurrent())) {
        currentComp = currentComp
    }

    const setNavigation = (index, hasSubMenu) => {
        if (state.showSubMenu)
            setState({ index: state.index, showSubMenu: state.showSubMenu, subMenuIndex: index, resetTopNav: !state.resetTopNav })
        else
            setState({ index, showSubMenu: hasSubMenu || state.showSubMenu, subMenuIndex: 0, resetTopNav: !state.resetTopNav })

        if (resetNav)
            resetNav()
    }

    return (
        <div id='dashboard' className={currentComp.dashboardClassName}>
            {topTitleLeft ? <Grid container className='top-menu'>
                <Grid item xs={12} sm={3}>
                    <div className='top-menu-title pointer' onClick={resetNav}>Admin</div>
                </Grid>
                <Grid item xs={12} sm={9} container style={containerStyle}>
                    <div className='top-title red-color'>{navTitle}</div>
                </Grid>
            </Grid> : ''}
            <Grid container>
                {state.showSubMenu && <Grid item xs={12} sm={12}>
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <h2 id='subMenuTitle' className='text-right' onClick={() => setState({ index, showSubMenu: false })}></h2>
                        </Grid>
                    </Grid>
                </Grid>
                }
                {showNav && <Grid item xs={12} sm={3}>
                    <div>
                        <ul id='dashboard-nav'>
                            {nav && nav.map((e, i) => (
                                <li key={i}>
                                    <Link prefetch href={`${e.href}`}>
                                        <a className={e.href == pathname ? 'orange-color active' : 'gray-color'} onClick={() => setNavigation(i, !!e.subMenu)}>
                                            <span className={e.className}></span>
                                            <span>{e.text}</span>
                                        </a>
                                    </Link>
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                    {showSideProfile ? <div className='user-info'>
                        <UserProfile size='' color='red' {...user} />
                    </div> : ''}
                </Grid>}
                <Grid item xs={12} sm={showNav ? 9 : 12} container style={showNav ? containerStyle : noNavContainerStyle} className={currentComp.contentClassName}>
                    {props.children}
                </Grid>
            </Grid>
            <style jsx>{`
                .user-info {
                    padding-top: 5rem;
                }
            `}</style>
        </div>
    )
};

NavPanel.propTypes = {
    navList: PropTypes.array.isRequired,
    index: PropTypes.number
}
export default NavPanel;
