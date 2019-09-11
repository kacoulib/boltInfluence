import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import { buttonStyle } from '../../../utils/variables/css';
import { choiceList } from '../../../utils/variables/general'
import { marqueInformationsFields, marquePaymentFields } from '../../formElement/fields/admin/marque-detail'
import Btn from '../../elements/btn'
import TableComp, { buildTableIcon } from '../../dataDisplay/table'

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


const Index = ({ selectedElem }) => {

    const [state, setState] = useState({ ...selectedElem, currentView: 0 })

    const onChange = (name, value) => setState({ ...state, ...{ [name]: value } })

    const onSubmit = async () => {
        console.log(state)
    };
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


    return (
        <Grid container alignItems='center' justify="center">
            <Grid item container xs={12} sm={12}>
                <Grid item xs={6} sm={6}>
                    <span className={`no-margin-top pointer ${state.currentView == 0 ? 'bold' : ''}`} onClick={() => onChange('currentView', 0)}>Information</span>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <span className={`no-margin-top pointer ${state.currentView == 1 ? 'bold' : ''}`} onClick={() => onChange('currentView', 1)}>Paiements</span>
                </Grid>
            </Grid>
            {!state.currentView ? <>
                <Grid item xs={12} sm={12}>
                    <h2 className='bottom-border'>Information de contact</h2>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormGenerator
                        fields={marqueInfoFields}
                        state={state}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <h2 className='bottom-border'>Information de marque</h2>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <p className='no-margin-top red-color'>
                        <div className='inline-block icon-ring'><span className='icon'></span></div>

                        <a className='red-color'>Créer une marque page</a></p>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormGenerator
                        fields={marqueInformationsFields[0]}
                        state={state}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        settings={settings}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormGenerator
                        fields={marqueInformationsFields[1]}
                        state={state}
                        onChange={onChange}
                        onSubmit={onSubmit}
                    />
                    <div className='text-center btn-container half-width font-initial no-margin-bottom'>
                        <Btn href="#contact-us" text="Mettre à jour" onClick={() => onSubmit()} />
                        <div>
                            <a className='red-color italic tiny-text'>Supprimer compte</a>
                        </div>
                    </div>
                </Grid>

            </> : <>

                    <Grid item xs={12} sm={12}>
                        <h2 className='bottom-border'>Information de paiement</h2>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormGenerator
                            fields={marquePaymentFields}
                            state={state}
                            onChange={onChange}
                            onSubmit={onSubmit}
                            settings={settings}
                        />
                        <div className='text-center btn-container half-width font-initial no-margin-bottom'>
                            <div>
                                <a className='red-color italic tiny-text'>Arrêter l'abonnement  (30 jours)</a>
                            </div>
                            <Btn href="#contact-us" text="Mettre à jour" onClick={() => onSubmit()} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h2 className='bottom-border'>Paiements en attente</h2>
                        <div className='table-container'>
                            <TableComp

                                heads={['Campagne', 'Date', 'Total', 'Status', 'Action']}

                                rows={[
                                    ['Cartier', '23_30 Juin 2019', '264.00 €', buildTableIcon(['time']), buildTableIcon(['flash', 'ring'])],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €', buildTableIcon(['time']), buildTableIcon(['flash', 'ring'])],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €', buildTableIcon(['valid']), ''],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €', buildTableIcon(['valid']), ''],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €', buildTableIcon(['valid']), ''],
                                ]}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Paiements Bolt</h2>
                        <div className='table-container'>
                            <TableComp

                                heads={['Campagne', 'Date', 'Total']}

                                rows={[
                                    ['Cartier', '23_30 Juin 2019', '264.00 €'],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €'],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €'],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €'],
                                    ['Cartier', '23_30 Juin 2019', '264.00 €'],
                                ]}
                            />
                        </div>
                    </Grid>
                </>}
            <style jsx>{`
                h2 {
                    margin: 2rem 0;
                }
                .table-container {
                    margin-top: 30px;
                }
            `}</style>
        </ Grid>
    )
}
Index.propTypes = {
    selectedElem: PropTypes.object.isRequired,
}

export default Index;