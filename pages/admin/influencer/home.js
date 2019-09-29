import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import withLayout from '../../../lib/withLayout';
import UserInfo from '../../../components/dataDisplay/others/userInfo';
import StarsComp from '../../../components/dataDisplay/star'

import Link from 'next/link';

const Discover = ({ src = '../../../static/img/desert-mirage.png', isNew = true, subscribe = 'S’inscrire', href = '/' }) => (
    <div className='relative text-center'>
        <div className='cover'>
            <img src={src} />
        </div>
        <div className='discover'>
            <Link href="/about">
                <a className='block'>{!isNew ? 'Découvrez'
                    :
                    <>
                        <span>Découvrez Wow !</span>
                    </>
                }</a>
            </Link>
        </div>
        <div className='subscribe'>
            <Link href="/about">
                <a className='block red-bg'>{subscribe}</a>
            </Link>
        </div>
        <div className='hoverlay'>
            {isNew ?
                <div className='red-bg white-color'>Nouveauté</div>
                :
                <img src='../../../static/img/award.png' />}
        </div>
        <style jsx>{`
            .relative {
                border-radius: 5px;
                overflow: hidden;
            }
            .discover {
                border-left: 1px solid #979797;
                border-right: 1px solid #979797;
            }
            .subscribe a {
                display: block;
                padding: .5rem;
                color: white;
            }
            .hoverlay {
                position: absolute;
                top: 1rem;
                right: 0;
            }
            .hoverlay div {
                padding: 1rem;
            }
            .hoverlay img {
                margin-right: 1rem;
            }
            .cover img {
                width: 100%;
                display: block;
            }
        `}</style>
    </div>
)

const HomeComp = ({ user }) => {
    const [state, setState] = useState({
        currentFilter: 'mounth',
        topCampagns: [
            {
                id: '1',
                src: '../../../static/img/rectangle.png',
                title: 'Prénom',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec convallis diam, vitae facilisis nisl.',

            },
            {
                id: '2',
                src: '../../../static/img/rectangle.png',
                title: 'Prénom',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec convallis diam, vitae facilisis nisl.',

            },
            {
                id: '3',
                src: '../../../static/img/rectangle.png',
                title: 'Prénom 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec convallis diam, vitae facilisis nisl.',

            },
            {
                id: '4',
                src: '../../../static/img/rectangle.png',
                title: 'Prénom',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec convallis diam, vitae facilisis nisl.',

            }
        ],
        topInfluencers: [
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom',
                lastName: 'Nom',
                nb_campagne: 4,
                stars: 5,
                filter: 'mounth'
            },
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom',
                lastName: 'Nom',
                nb_campagne: 4,
                stars: 5,
                filter: 'mounth'
            },
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom 2',
                lastName: 'Nom',
                nb_campagne: 4,
                stars: 3,
                filter: 'mounth'
            },
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom',
                lastName: 'Nom 2',
                nb_campagne: 4,
                stars: 5,
                filter: 'week'
            },
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom 3',
                lastName: 'Nom',
                nb_campagne: 4,
                stars: 2,
                filter: 'week'
            },
            {
                src: '../../../static/img/rectangle.png',
                firstName: 'Prénom 5',
                lastName: 'Nom',
                nb_campagne: 4,
                stars: 4,
                filter: 'week'
            },
        ]
    })

    const onChange = (name, value) => setState({ ...state, [name]: value })
    const topInfluencers = state.topInfluencers.filter(e => e.filter == state.currentFilter)

    return (
        <div>
            <div className='user-info-container info-container'>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <div className='profile_container text-center'>
                            <h2>Bonjour {user.firstName}</h2>
                            <h3>Nous sommes ravis de vous accueillir !</h3>
                            <UserInfo {...user} />
                            <div className='foot'>
                                <Link href="/about">
                                    <a className='block'>Ouvrir mon profil</a>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='discover'>
                            <div>
                                <Discover />
                            </div>
                            <div>
                                <Discover isNew={false} />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className='blue-bg info-container white-color card-bg dots-blue-top no-repeat right'>
                <Grid container>
                    <Grid item xs={12}><h2>Top 4 “Campagne du moment”</h2></Grid>
                    <Grid container item xs={12}>
                        {state.topCampagns && state.topCampagns.map(({ id, src, title, description }, index) => (
                            <Grid item xs={3} key={index} className='list-spacing'>
                                <div>
                                    <img src={src} />
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <Link href={`?id=${id}`}><a className='white-color'>Information Extra</a></Link>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
            <div className='top-container info-container'>
                <Grid container>
                    <Grid item xs={6}>
                        <h2 className='no-margin top-influencer'>Top 3 influencers</h2>
                    </Grid>
                    <Grid item xs={6} className='pointer text-right'>
                        <div className={`inline-block ${state.currentFilter == 'mounth' ? 'bold' : ''}`} onClick={() => onChange('currentFilter', 'mounth')}>Mois</div>
                        <div className={`inline-block ${state.currentFilter == 'week' ? 'bold' : ''} week`} onClick={() => onChange('currentFilter', 'week')}>Semaine</div>
                    </Grid>
                    <Grid container item xs={12} justify='space-between' className='text-center'>
                        {topInfluencers && topInfluencers.map(({ firstName, lastName, src, nb_campagne, stars }, index) => (
                            <Grid item xs={3} key={index}>
                                <div className={`${index == 1 ? 'auto-scale' : ''}`}>
                                    <img src={src} />
                                    <h3>{`${firstName} + ${lastName}`}</h3>
                                    <h5>Nombre de campagne : {nb_campagne}</h5>
                                    <div><StarsComp name={firstName + index} activateSelection={false} length={stars} /></div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                .discover > div {
                    margin: auto;
                    width: 90%;
                }
                .discover > div:last-child {
                    margin-top: 2rem;
                    width: 40%;
                }
                .week {
                    padding: 0 0 7rem 1rem;
                }
                .profile_container {
                    border: 1px solid #979797;
                    border-radius: 5px;
                }
                .profile_container a {
                    display: block;
                    background-color: #242B45;
                    padding: 1rem;
                    color: white;
                }
                .auto-scale {
                    transform: scale(1.2);
                }
                .info-container {
                    padding: 4rem 2rem
                }
                .user-info-container {
                    padding-top: 3rem;
                    padding-bottom: 3rem;
                }
                .top-container {
                    padding-top: 5rem;
                    padding-bottom: 5rem;
                }
                .blue-bg {
                    padding-top: 4rem;
                    padding-bottom: 4rem;
                }
                .blue-bg, .blue-bg a {
                    color: white;
                }
            `}</style>
        </div >
    )
}

export default withLayout(HomeComp)