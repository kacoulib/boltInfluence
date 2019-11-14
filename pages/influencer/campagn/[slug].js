import React, { useState } from "react";
import { Grid } from '@material-ui/core';
import withAuth from '../../../lib/withAuth';
import NavBack from '../../../components/page/navBack';
import Tabs from '../../../components/dataDisplay/others/tabs';
import { BtnChild } from '../../../components/elements/btn';
import Card, { TripleCard } from '../../../components/dataDisplay/element/Card';

const Conditions = ({ }) => (
    <div>
        <div> <h3 className='full-bordered-head inline-block'>Les conditions</h3></div>
        <Grid item container xs={12} sm={12} justify="center" alignItems="center" className='card-padding-right'>
            <Grid item container xs={12} sm={12} justify="center" alignItems="center">
                <Grid item xs={2} sm={1} >
                    <span className='circle-dot'>1</span>
                </Grid>
                <Grid item xs={10} sm={11}>
                    <p>Intesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus</p>
                </Grid>
                <Grid item xs={2} sm={1} >
                    <span className='circle-dot'>2</span>
                </Grid>
                <Grid item xs={10} sm={11}>
                    <p>Intesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus</p>
                </Grid>
                <Grid item xs={2} sm={1} >
                    <span className='circle-dot'>3</span>
                </Grid>
                <Grid item xs={10} sm={11}>
                    <p>Intesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus</p>
                </Grid>
            </Grid>
        </Grid>
        <style jsx>{`
            p {
                margin: 2.5rem 0;
            }
        `}</style>
    </div>
)

const submitStyle = {
    minWidth: '25%'
}

const SubmitBtn = () => (
    <BtnChild style={submitStyle}>
        <div className='flex space-evenly'>
            <img src={'../../../static/img/icon/white-arrow-down.png'} />
            <div>Postulez</div>
        </div>
        <style jsx>{`
            .flex {
                min-width: 15%;
            }
            img, div div {
                display: inline-block;
                vertical-align: middle;
            }
            img {
                transform: rotate(-90deg);
            }
        `}</style>
    </BtnChild>
)

const CoverComp = ({ title, brand = {} }) => (
    <div className='cover'>
        <img src='../../../static/img/strawhat.jpg' />
        <div className='title'>
            <div>#{title}</div>
            <p>{brand.name}</p>
        </div>
        <div className='subscribe'>
            <SubmitBtn />
        </div>
        <div className='socials'>
            <ul>
                <li><img src='../../../static/img/icon/big-facebook.png' /></li>
                <li><img src='../../../static/img/icon/big-instagram.png' /></li>
                <li><img src='../../../static/img/icon/big-tiktok.png' /></li>
            </ul>
        </div>
        <style jsx>{`
            .cover {
                position: relative;
            }
            .title {
                position: absolute;
                left: 1rem;
                top: 1rem;
                font-size: 1.5rem;
            }
            .subscribe {
                position: absolute;
                width: 100%;
                bottom: 25%;
                text-align: center;
            }
            .socials {
                position: absolute;
                width: 100%;
                bottom: 1rem;
                text-align: right;
                padding-right: 1rem;
            }
            .socials li {
                display: inline-block;
                margin-left: 2rem;
            }
            .socials img {
                max-width: 30px;
            }
            .title div {
                font-size: 2rem;
                color: white;
            }
            img {
                display: block;
                width: 100%;
            }
        `}</style>
    </div >
)

const CampagnDetail = ({ user, query: { campaign = {} } }) => {
    const [state, setState] = useState({
        showMarqueDetail: true,
        contents: [
            {
                count: 2,
                title: '2 vidéos',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. Pellentesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus. Donec et nisl malesuada, faucibus urna ultrices, blandit libero. Vestibulum viverra ullamcorper sapien nec mollis.',
                socials: ['instagram', 'tiktok']
            },
            {
                count: 1,
                title: 'un post',
                text: 'Pellentesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus. Donec et nisl malesuada, faucibus urna ultrices, blandit libero. Vestibulum viverra ullamcorper sapien nec mollis.',
                socials: ['instagram']
            },
            {
                count: 2,
                title: 'une storie',
                text: 'Pellentesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus. Donec et nisl malesuada, faucibus urna ultrices, blandit libero. Vestibulum viverra ullamcorper sapien nec mollis.',
                socials: ['facebook']
            },
        ]
    })
    console.log(campaign)

    return (
        <NavBack redirectUrl={`/${user.role}/campagn`} title='Campagnes'>
            <div>
                <div className='cover-container'>
                    <CoverComp {...campaign} />
                </div>
                <div className='tab-container'>
                    <div className='spacing'>
                        <Tabs>
                            <div title='La campagne'>{campaign.description}</div>
                            <div title='La marque'>{campaign.brand ? campaign.brand.name : ''}</div>
                        </Tabs>
                    </div>
                </div>
                <div className='content-container blue-bg card-bg dots-blue-top right'>
                    <div className='spacing'>
                        <Tabs
                            headerStyle={{ color: 'white' }}
                        >
                            <div title='Les Contenus'>
                                <div className='container flex space-between'>
                                    {
                                        state.contents.map(({ count, title, text, socials }, index) => (
                                            <div className='child' key={index}>
                                                <Grid container item xs={12} justify="flex-end" className='fullheight text-center'>
                                                    <Grid item xs={12}>
                                                        <div className='header'>
                                                            <div>{count}</div>
                                                            <span>{title}</span>
                                                        </div>
                                                    </Grid>
                                                    <Grid container item xs={12} alignItems="flex-start">
                                                        <Grid item xs={12}>
                                                            <div className='content'>{text}</div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item xs={12} alignItems="flex-end">
                                                        <Grid item xs={12}>
                                                            <ul className='socials-container'>
                                                                {socials && socials.map((elem, i) => (
                                                                    <li key={i} className={`social ${elem}`}></li>
                                                                ))}
                                                            </ul>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div title='Les conditions'>
                                sdfdsf
                            </div>
                        </Tabs>
                    </div>
                </div>
                <div className='inspiration-card-container spacing text-center'>
                    <Grid container xs={12}>
                        <Grid container item xs={6}>
                            <h3 className='full-bordered-head inline-block'>Les inspirations</h3>
                        </Grid>
                        <Grid container item xs={6}></Grid>
                        <TripleCard src='../../../static/img/rectangle.png' borderColor='gray' badgeColor='red' />
                    </Grid>
                </div>
                <div className='condition-container spacing'>
                    <Conditions />
                </div>
                <div className='reward-container spacing blue-bg white-color text-center'>
                    <Grid container xs={12}>
                        <Grid container item xs={6}></Grid>
                        <Grid container item xs={6}>
                            <h3 className='full-bordered-head inline-block auto'>Le reward</h3>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} alignItems="center">
                        <Grid container item xs={6} >
                            <Card src='../../../static/img/rectangle.png' borderColor='gray' badgeColor='red' />
                        </Grid>
                        <Grid container item xs={6}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. </p>
                        </Grid>
                    </Grid>
                </div>

                <div className='subscribe text-center double-padding black-bg white-color'>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.</div>
                </div>
                <div className='subscribe triple-padding text-center'>
                    <SubmitBtn />
                </div>
                <style jsx>{`
                    .spacing {
                        padding: 0 1rem;
                    }
                    .inspiration-card-container {
                        position: relative;
                        padding-top: 2rem;
                        padding-bottom: 5rem;
                        z-index: 1;
                    }
                    .inspiration-card-container h3 {
                        margin-bottom: 130px;
                    }
                    .reward-container {
                        padding: 2.5rem 5rem 5rem;
                    }
                    .condition-container {
                        background-color: #F4F3F8;
                    }
                    .content-container {
                        padding: 2rem 0 8rem;
                    }
                    .socials-container {
                        text-alig: center;
                    }
                    .social {
                        margin: 5px;
                    }
                    .child {
                        width: calc(33% - 5px);
                        border-radius: 5px;
                        background-color: white;
                        padding: 1rem;
                        border: 1px solid #F13F4B;
                    }
                    .content {
                        padding: 1.5rem 0;
                    }
                    .header div {
                        margin: 1rem auto;
                        border-radius: 50%;
                        width: 75px;
                        height: 75px;
                        padding: 1rem;
                        font-size: 2rem;
                        background: ;
                        color: white;
                        text-align: center;
                    }
                    .container .child:nth-child(1) .header div {
                        background-color: #F13F4B;
                    }
                    .container .child:nth-child(2) .header div {
                        background-color: #242B45;
                    }
                    .container .child:nth-child(3) .header div {
                        background-color: #DEDEE8;
                    }
                `}</style>
            </div>
        </NavBack>
    )
}

CampagnDetail.getInitialProps = async ({ query }) => {

    return { query }
}

export default withAuth(CampagnDetail, { showAside: false, showSideProfile: false });
