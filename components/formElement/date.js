
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import { FormElementWrapper } from './index'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '90%'
    }
})
const yearLength = 4;
const names = [
    { label: 'JJ', max: 2 },
    { label: 'MM', max: 2 },
    { label: 'AAAA', max: yearLength },
];
const convertDateToState = (date) => {
    let ret = { 'JJ': null, 'MM': null, 'AAAA': null };

    if (date instanceof Date)
        ret = { 'JJ': date.getDate(), 'MM': date.getMonth(), 'AAAA': date.getFullYear() };

    return ret
}

const DateComp = ({ name, label, type, value, onChange, showLabel, unableUnderline = false, unableBoxShadow = true, error = false, labelPosition = {}, icon, ...elemProps }) => {
    const [state, setState] = useState({ value, ...convertDateToState(value) })
    const handleChange = (name) => ({ target: { value } }) => setState({ ...state, [name]: value })
    let v, lastI;
    const classes = useStyles();

    useEffect(() => {
        let { JJ, MM, AAAA } = state,
            tmp = AAAA + '';


        if ((JJ && MM) && (AAAA && (tmp.length === yearLength)))
            onChange(name, new Date(AAAA, JJ, MM));

    }, [state.value, state.JJ, state.MM, state.AAAA]);

    return (
        <FormElementWrapper label={label} showLabel={showLabel} labelPosition={labelPosition} icon={icon}>
            <Grid container>
                {names.map((elem, index) => {
                    return (
                        <Grid item xs={4} key={index}>
                            <TextField
                                key={index}
                                required
                                id={`${elem.label}${index}`}
                                label={elem.label}
                                className={classes.root}
                                onChange={handleChange(elem.label)}
                                value={state[elem.label]}
                                inputProps={{
                                    maxLength: elem.max,
                                }}
                                onInput={(e) => {
                                    v = e.target.value;
                                    lastI = v.length - 1;

                                    if (isNaN(v[lastI]))
                                        e.target.value = v.substring(0, lastI);
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>

        </FormElementWrapper>
    )
}


DateComp.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    showLabel: PropTypes.bool,
    unableUnderline: PropTypes.bool,
    unableBoxShadow: PropTypes.bool,
}

export default DateComp