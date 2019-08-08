
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import { orangeColor } from '../../utils/variables/css'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    Checkbox: {
        '&$checked': {
            color: orangeColor
        }
    },
    checked: {}
});

const CheckboxType = ({ classes, label, value, onChange, name = '', style }) => {
    const [val, setValue] = useState(value)

    const handleChange = ({ target: { value } }) => {
        setValue(value);
        onChange(name, value)
    };

    console.log(label)

    style = Object.assign({ display: 'flex', flexDirection: 'row' }, style)

    return (

        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox checked={val} onChange={handleChange} value="checkedA" classes={{ root: classes.Checkbox, checked: classes.checked }}
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
    value: PropTypes.string,
}

export default withStyles(styles)(CheckboxType)
