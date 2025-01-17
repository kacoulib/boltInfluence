import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import FormGenerator from '../formElement/generator'
import Btn from '../elements/btn'

import Button from '@material-ui/core/Button';
import { customRequest } from '../../lib/api/http/index';
import { buildToArray, buildFromArray } from '../../utils/datas/convert'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: { ...cardContainer, ...{ backgroundColor: '#F13F4B' } },
    container: { padding: '0 3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    footer: { marginBottom: '3rem' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '1rem' },
}


const defaultState = {
    title: '',
    content: '',
}

const Index = ({ selected = {}, isEdit = false, onSubmit, fields, path, editIdenfier, setNavTitle, editTitle, title }) => {

    const [state, setState] = useState(selected)

    useEffect(() => {
        const newState = { ...state }

        isEdit && fields && fields.map(elem => {
            if (elem.type == 'react-select') {
                newState[elem.name] = elem.props.list.filter(e => state[elem.name].includes(e.value));
            }
        })
        const displayTitle = isEdit ? editTitle : title
        setNavTitle && setNavTitle(displayTitle);
        setState(newState)
    }, [])
    const onChange = (name, value) => value && setState({ ...state, [name]: value });


    const handleOnSubmit = async () => {
        const newState = { ...state }
        fields && fields.map(elem => {
            if (elem.type == 'react-select')
                newState[elem.name] = buildToArray(state[elem.name]);
        })

        await customRequest({ path: isEdit ? `${path}/${newState[editIdenfier]}` : path, state: newState, method: isEdit ? 'PUT' : 'POST' })
        if (!isEdit)
            setState(selected)
    };
    return (
        <Grid container alignItems='center' justify="center">
            <Grid item xs={12} sm={12}>
                <FormGenerator fields={fields} state={state} onChange={onChange} />
            </Grid>
            <Grid item xs={12} justify='center' className='center-text' style={styles.footer}>
                <div className='text-center btn-container half-width no-margin-bottom'>
                    <Btn href="#contact-us" text={isEdit ? 'Mettre à jour' : 'créer'} onClick={() => onSubmit ? onSubmit(state) : handleOnSubmit()} />
                </div>
                {/* <Button variant="contained" type="submit" className='submit large' onClick={() => onSubmit ? onSubmit(state) : handleOnSubmit()}>
                    {isEdit ? 'Mettre à jour' : 'créer'}
                </Button> */}
            </Grid>
        </ Grid>
    )
}


export default Index;