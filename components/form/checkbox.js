
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import { orangeColor } from '../../utils/variables/css'

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

const CheckboxType = ({ classes, label, value, onChange, name = '' }) => {
    // const [val, setValue] = useState(value)

    // const handleChange = ({ target: { value } }) => {
    //     setValue(value);
    //     console.log('(', value, ')')
    //     onChange(name, value)
    // };

    console.log(name, ' ', value)


    return (

        <FormGroup row classes={{ root: classes.group }}>
            <FormControlLabel
                control={
                    <Checkbox checked={value} onChange={onChange(name)} value={value} classes={{ root: classes.Checkbox, checked: classes.checked }}
                    />
                }
                label={label}
            />
        </FormGroup>
    )
}

CheckboxType.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.bool,
}

export default withStyles(styles)(CheckboxType)
