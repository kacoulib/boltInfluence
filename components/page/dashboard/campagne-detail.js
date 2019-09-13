import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import { buttonStyle } from '../../../utils/variables/css';
import { choiceList } from '../../../utils/variables/general'
import { marqueInformationsFields, marquePaymentFields } from '../../formElement/fields/admin/marque-detail'
import Btn from '../../elements/btn'
import TableComp, { buildTableIcon } from '../../dataDisplay/table'
import Popup from '../../dataDisplay/others/popup'
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


const Index = ({ selectedElem, setNavTitle }) => {

    const [state, setState] = useState({ ...selectedElem, currentView: 0, modal: false })

    const onChange = (name, value) => setState({ ...state, ...{ [name]: value } })

    const onSubmit = async () => {

        console.log(state)
    };
    useEffect(() => setNavTitle && setNavTitle('L’Oréal'), [])

    const marqueInfoFields = [
        {
            label: "Choix de la page marque",
            name: "marque",
            type: 'select',
            list: [{ name: 'Marque1', value: 'marque 1' }, { name: 'Marque2', value: 'second marque' }],
            required: true, dimension: { xs: 6, sm: 6 }
        },
        { label: "Image", name: "contact_logo", type: 'upload', required: true, props: { style: { textAlign: 'center' } } },
        { label: "Bio", name: "bio", type: 'textarea', placeholder: 'Texte libre de présentation', required: true, }
    ]
    const campagnesList = [
        { _id: '5483752', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
        { _id: '5483753', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
        { _id: '5483754', role: 'Créateur', firstName: 'Sam', lastName: 'Jones', status: 'Brouillon', delivery: '2', total: '4', price: '800€' },
    ]
    const influencersList = [
        { _id: '5483755', firstName: 'Sam', lastName: 'Jones', picture: 'influencer_jones.png', date: '05-08-2019' }
    ]
    console.log(selectedElem)
    return (
        <Grid container alignItems='center' justify="center">
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
                    {selectedElem.propositions && selectedElem.propositions.map((elem, index) => (
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
                    <Grid item xs={12} sm={12}>
                        {selectedElem.influencers && selectedElem.influencers.map((elem, index) => (
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

            <Popup open={state.modal} handleClose={() => onChange('modal', false)}>
                <h2 className='modal-head'><div className='inline-block icon-blue-flash'><span className='icon'></span></div>Relance de paiement pour la campagne L’Oréal</h2>
                <div className='custom-container'>
                    <p>Lorem ipsum,</p>

                    <p>dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.</p>

                    <p>Pellentesque eget lacus iaculis, sagittis arcu lacinia, consectetur velit. Nam id risus lectus. Donec et nisl malesuada, faucibus urna ultrices, blandit libero.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ligula velit, molestie sit amet pretium consectetur, mollis at risus.</p>

                    <p>Merci,</p>

                    <p>L’équipe Bolt Influence</p>
                </div>
                <div className='btn-container modal'>
                    <div className='inline-block'><a onClick={() => onChange('modal', false)}> Annuler </a></div>
                    <div className='inline-block'><Btn text="Envoyer" onClick={() => onChange('modal', false)} /></div>
                </div>
            </Popup>
            <style jsx>{`
                        h2 {
                            margin: 2rem 0;
                        }
                        h2.modal-head {
                            color: black;
                            text-align: right;
                        }
                        .table-container {
                            margin-top: 30px;
                        }
                        .icon-blue-flash {
                            padding-right: 1rem;
                        }
                        .btn-container.modal {
                            padding-top: 1rem;
                            text-align: right;
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
    selectedElem: PropTypes.object.isRequired,
}

export default Index;