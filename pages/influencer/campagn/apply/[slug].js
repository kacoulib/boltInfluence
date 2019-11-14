import React, { useState } from "react";
import { Grid } from '@material-ui/core';
import withAuth from '../../../../lib/withAuth';
import NavBack from '../../../../components/page/navBack';
import Btn from '../../../../components/elements/btn';
import Card from '../../../../components/dataDisplay/element/Card';


const CoverComp = ({ title, brand = {} }) => (
    <div className='cover'>
        <img src='../../../static/img/strawhat.jpg' />
        <div className='title'>
            <div>#{title}</div>
            <p>{brand.name}</p>
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
        date: 'le 16 juin 2019 et le 14 juillet 2019',
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
                <div className='spacing tab-container'>
                    <h3 className='bordered-head'>Date limit de publication</h3>
                    <p className='red-color'>Vous devrez publier entre {state.date}</p>
                </div>

                <div className='inspiration-card-container spacing'>
                    <h2 className='bordered-head'>Produits et récompenses</h2>
                    <Grid container xs={12} className='text-center'>
                        <Grid container item xs={12}>
                            <Grid xs={6}>
                                <Card src='../../../static/img/rectangle.png' borderColor='blue' badgeColor='blue' />
                            </Grid>
                            <Grid xs={6}>
                                <h3 className='blue-color'>Produits Sojade</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. </p>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} >
                            <Grid xs={6}>
                                <h3 className='red-color'>Produits Sojade</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. </p>
                            </Grid>
                            <Grid xs={6}>
                                <Card src='../../../static/img/rectangle.png' borderColor='red' badgeColor='red' />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div className='subscribe text-center double-padding blue-bg white-color'>
                    <div>Si la marque souhaite amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus. Pellentesque eget lacus iaculis, sagittis arcu lacinia, consectetur 300€ velit. </div>
                </div>
                <div className='spacing'>
                    <h2 className='bordered-head'>Ajoutez vos coordonnées d’expédition</h2>
                    <div className='subscribe triple-padding text-center'>

                        <Btn text='Finaliser' />
                    </div>
                </div>

                <style jsx>{`
                    .spacing {
                        padding: 0 1rem;
                    }
                    .inspiration-card-container {
                        position: relative;
                        padding-top: 2rem;
                        padding-bottom: 5rem;
                        background-color: #F4F3F8;
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
