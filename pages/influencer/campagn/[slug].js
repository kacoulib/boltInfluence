import React, { useState } from "react";

import withAuth from '../../../lib/withAuth';
import NavBack from '../../../components/page/navBack';
import Tabs from '../../../components/dataDisplay/others/tabs';

const CarouselComp = ({ titles = [], toogle, campaign, value }) => (
    <div>
        <ul>
            <li><h3 onClick={() => toogle(true)}>{titles[0]}</h3></li>
            <li><h3 onClick={() => toogle(false)}>{titles[1]}</h3></li>
        </ul>
        {value ?
            <div>
                {campaign.description}
            </div> :
            <div>
                {campaign.brand ? campaign.brand.name : ''}
            </div>}
        <style jsx>{`
            ul li {
                display: inline-block;
                width: 50%;
            }
            h3 {
                cursor: pointer;
            }
        
        `}</style>
    </div>
)

const CampagnDetail = ({ user, query: { campaign } }) => {
    const [state, setState] = useState({
        showMarqueDetail: true,
    })
    const onChange = (name, value) => setState({ ...state, [name]: value })
    console.log(campaign)

    return (
        <NavBack redirectUrl={`/${user.role}/campagn`} title='Campagnes'>
            <div>
                <Tabs>
                    <div title='first'>1</div>
                    <div title='second'>2</div>
                </Tabs>
                <CarouselComp
                    titles={['La campagne', 'La marque']}
                    toogle={(value) => onChange('showMarqueDetail', value)}
                    value={state.showMarqueDetail} campaign={campaign} />
                <style jsx>{`
                
                `}</style>
            </div>
        </NavBack>
    )
}

CampagnDetail.getInitialProps = async ({ query }) => {

    return { query }
}

export default withAuth(CampagnDetail, { showAside: false, showSideProfile: false });
