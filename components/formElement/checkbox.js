
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { orangeColor } from '../../utils/variables/css'
import { toggleArray } from '../../utils/datas/convert'
import { FormElementWrapper } from './index'

const styles = {
    group: {
        textAlign: 'left'
    },
    root: {
        display: 'flex',
    },
    Checkbox: {
        '&$checked': {
            color: orangeColor
        }
    },
    checked: {}
};

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: 3,
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
        backgroundColor: orangeColor,
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
});

function StyledCheckbox(props) {
    const classes = useStyles();

    return (
        <Checkbox
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const CheckboxType = ({ label, value = [], onChange, name = '', showLabel, labelPosition, list, inline = true }) => {
    return (
        <FormElementWrapper label={label} showLabel={showLabel} labelPosition={labelPosition}>
            {list && list.map((elem, index) => {
                const newVal = toggleArray(value, elem.value);
                const checked = value.includes(elem.value)


                return (
                    <div className={`${!inline ? 'block' : ''}`}>
                        <FormControlLabel key={index}
                            control={
                                <StyledCheckbox
                                    checked={checked}
                                    value={elem.value}
                                    onChange={() => onChange(name, newVal)}
                                />
                            }
                            label={elem.name}
                        />
                        <style jsx>{`
                            div {
                                display: inline-block;
                                text-align: left;
                            }
                            .block {
                                display: block;
                            }
                    `}</style>
                    </div>
                )
            })}

        </FormElementWrapper>
    )
}

CheckboxType.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.array,
}

export default CheckboxType
