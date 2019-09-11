import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../../formElement/generator'
import { buttonStyle } from '../../../utils/variables/css';
import { choiceList } from '../../../utils/variables/general'
import { userInfoFields, userAcountFields, userPaymentFields } from '../../formElement/fields/admin/influencer-detail'
import Btn from '../../elements/btn'

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

const Index = ({ selectedInfluencer }) => {

    const [state, setState] = useState(selectedInfluencer)

    const onChange = (name, value) => {
        console.log(name, value)
        setState(Object.assign({}, state, { [name]: value }))
    };
    const onSubmit = async () => {
        console.log(state)
    };


    return (
        <Grid container alignItems='center' justify="center">
            <Grid item xs={12} sm={12}>
                <h2 className='bottom-border no-margin-top'>Information de contact</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormGenerator
                    fields={userInfoFields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
            </Grid>
            <Grid item xs={12} sm={12}>
                <h2 className='bottom-border'>Information de compte</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormGenerator
                    fields={userAcountFields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
                <div className='text-center btn-container half-width font-initial no-margin-bottom'>
                    <Btn href="#contact-us" text="Changer de mot de passe" onClick={() => onSubmit()} />
                    <div>
                        <a className='red-color italic tiny-text'>Supprimer compte</a>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12}>
                <h2 className='bottom-border'>Information de paiement</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
                <FormGenerator
                    fields={userPaymentFields}
                    state={state}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    settings={{ showLabel: { xs: 6 } }}
                />
            </Grid>
            <Grid item xs={12}>
                <div className='text-center btn-container half-width'>
                    <Btn href="#contact-us" text="Mettre à jour" onClick={() => onSubmit()} />
                </div>
            </Grid>
            <style jsx>{`
                h2 {
                    margin: 2rem 0;
                }
            `}</style>
        </ Grid>
    )
}
Index.propTypes = {
    selectedInfluencer: PropTypes.object.isRequired,
}

export default Index;