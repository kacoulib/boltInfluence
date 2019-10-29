import React, { useState } from "react";
import { useRouter } from 'next/router'
import NavPanel from '../admin/navPanel/index'
import { InfluencerNav } from '../admin/navPanel/data'

const AsideComp = (props) => {
    const [state, setState] = useState({
        navTitle: null,
        showMessageView: false,
        showNav: true,
        showSubMenu: false,
    });
    const { pathname } = useRouter()

    return (
        <>
            <NavPanel
                pathname={pathname}
                showNav={state.showNav}
                navList={InfluencerNav}
                showSideProfile={props.showSideProfile}
                user={props.user}
            >
                {props.children}
            </NavPanel>
        </>
    )
}

export default AsideComp