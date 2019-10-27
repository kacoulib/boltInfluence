import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import { buttonStyle } from '../../../utils/variables/css';
import { choiceList } from '../../../utils/variables/general'
import { marqueInformationsFields, marquePaymentFields } from '../../formElement/fields/admin/marque-detail'
import Btn from '../../elements/btn'
import TableComp, { buildTableIcon } from '../../dataDisplay/table'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import InfluenceurSam from '../../../static/img/screen11.png'
import InstagramIcon from '../../../static/img/icon/full-instagram.png'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}

const settings = { showLabel: { xs: 6 } }


const Index = ({ selected, setNavTitle }) => {

    const [state, setState] = useState({ ...selected, currentView: 0 })

    const onChange = (name, value) => setState({ ...state, ...{ [name]: value } })

    const onSubmit = async () => {

    };
    useEffect(() => setNavTitle && setNavTitle('L’Oréal'), [])

    return (
        <Grid container>
            <Grid item container xs={12} sm={12} className='admin_campagne_header'>
                <Grid container xs={12} sm={12}>
                    <Grid item xs={4} sm={4}>
                        <span className={`no-margin-top pointer ${state.currentView == 0 ? 'bold' : ''}`} onClick={() => onChange('currentView', 0)}>Information</span>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <span className={`no-margin-top pointer ${state.currentView == 1 ? 'bold' : ''}`} onClick={() => onChange('currentView', 1)}>Propositions</span>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <span className={`no-margin-top pointer ${state.currentView == 2 ? 'bold' : ''}`} onClick={() => onChange('currentView', 2)}>Influenceurs</span>
                    </Grid>
                </Grid>
            </Grid>
            {state.currentView != 2 ? <>
                <Grid item xs={12} sm={12}>
                    <Grid container xs={12} sm={12} alignContent='center' alignItems='center'>
                        <Grid item container xs={4} sm={4} className='bold no-margin-top'><p>Créateur</p></Grid>
                        <Grid item xs={2} sm={2} className='bold'><p className='text-center no-margin-top'>Status</p></Grid>
                        <Grid item xs={2} sm={2} className='bold'><p className='text-center no-margin-top'>Délivrables</p></Grid>
                        <Grid item xs={2} sm={2} className='bold'><p className='text-center no-margin-top'>Unités totales</p></Grid>
                        <Grid item xs={2} sm={2} className='bold'><p className='text-center no-margin-top'>Coût</p></Grid>
                    </Grid>
                    {selected.propositions && selected.propositions.map((elem, index) => (
                        <div className='contain'>
                            <Grid key={index} container xs={12} sm={12} alignContent='center' alignItems='center' className='influencers_list'>
                                <Grid item container xs={4} sm={4}>
                                    <Grid item xs={6} sm={6}>
                                        <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")" }}>
                                            <img src={InfluenceurJones} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <div className='author'>
                                            <p>{`${elem.role}`}</p>
                                            <p>{`${elem.firstName} ${elem.lastName}`}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} sm={2}><p className='text-center'>{elem.status}</p></Grid>
                                <Grid item xs={2} sm={2}><p className='text-center'>{elem.delivery}</p></Grid>
                                <Grid item xs={2} sm={2}><p className='text-center'>{elem.total}</p></Grid>
                                <Grid item xs={2} sm={2}><p className='text-center'>{elem.price}</p></Grid>
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </> : <>
                    <Grid item xs={12} sm={12} alignItems='center' justify="center">
                        {selected.influencers && selected.influencers.map((elem, index) => (
                            <div className='contain influencers_list pointer'>
                                <Grid key={index} container xs={12} sm={12} alignContent='center' alignItems='center'>
                                    <Grid item container xs={8} sm={8} alignContent='center' alignItems='center'>
                                        <div className='influencers_campagne_list'>
                                            <img src={InfluenceurSam} />
                                            <div className='social_icon'><img src={InstagramIcon} /></div>

                                        </div>
                                        <div className='author'>
                                            <div>{`${elem.firstName} ${elem.lastName}`}</div>
                                            <div>Date de publication: {elem.date}</div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4}><Btn text="Prêt pour l'évaluation" /></Grid>
                                </Grid>
                            </div>
                        ))}
                    </Grid>
                </>
            }
            <style jsx>{`
                        h2 {
                            margin: 2rem 0;
                        }
                        .btn-container > div {
                            padding-left: 2rem;
                        }
                        .custom-container {
                            background: white;
                            color: black;
                            border-radius: 5px;
                            padding: 1rem;
                        }
                        .contain {
                            background-color: #F4F3F8;
                            margin-bottom: 1rem;
                        }
                        .contain.influencers_list {
                            padding: 1rem 0;
                        }
                        .contain:hover {
                            background-color: #DEDEE8;
                        }
                        .influencers_campagne_list {
                            position: relative;
                        }
                        .influencers_campagne_list .social_icon {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                        }
                        .influencers_campagne_list img {
                            max-width: 100px;
                            border-radius: 100%;
                            vertical-align: middle;
                        }
                        .author p, .author div {
                            padding-left: .5rem;
                        }
                    `}</style>
        </ Grid>
    )
}
Index.propTypes = {
    selected: PropTypes.object.isRequired,
}

export default Index;