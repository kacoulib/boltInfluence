
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { orangeColor } from '../../utils/variables/css'
import { toggleArray } from '../../utils/datas/convert'
import { FormElementWrapper } from './index'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: 'white',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,

            backgroundImage: `radial-gradient(#F13F4B,#F13F4B 48%,transparent 52%)`,
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
});

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const styles = {
    root: {
        display: 'flex',
    },
    radio: {
        '&$checked': {
            color: orangeColor
        }
    },
};

const RadioType = ({ classes, list, label, showLabel, labelPosition, value, onChange, name = '' }) => {
    const handleChange = ({ target: { value } }) => onChange(name, value);

    return (
        <FormElementWrapper label={label} showLabel={showLabel} labelPosition={labelPosition}>

            <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup onChange={handleChange} value={value + ''} row>
                    {list && list.map((elem, key) => (
                        <FormControlLabel key={key} value={elem.value + ''}
                            control={
                                <StyledRadio classes={{ root: classes.radio, checked: classes.checked }} />
                            }
                            label={elem.name} />
                    )
                    )}
                </RadioGroup>
            </FormControl>
        </FormElementWrapper>
    )
}

RadioType.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
}

export default withStyles(styles)(RadioType)
