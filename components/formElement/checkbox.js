
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
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

const CheckboxType = ({ classes, label, value = [], onChange, name = '', showLabel, labelPosition, list }) => (
    <FormElementWrapper label={label} showLabel={showLabel} labelPosition={labelPosition}>

        <FormGroup row classes={{ root: classes.group }}>
            {list && list.map((elem, index) => {
                const newVal = toggleArray(value, elem.name);
                const checked = value.includes(elem.name)

                return (
                    <FormControlLabel key={index}
                        control={
                            <Checkbox checked={checked} onChange={() => onChange(name, newVal)} value={elem.value} classes={{ root: classes.Checkbox, checked: classes.checked }}
                            />
                        }
                        label={elem.name}
                    />
                )
            })}

        </FormGroup>
    </FormElementWrapper>

)

CheckboxType.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.array,
}

export default withStyles(styles)(CheckboxType)
