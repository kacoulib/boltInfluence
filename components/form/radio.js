
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { orangeColor } from '../../utils/variables/css'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    radio: {
        '&$checked': {
            color: orangeColor
        }
    },
    checked: {}
});

const RadioType = ({ classes, list, helpText, value, onChange, name = '', style }) => {
    const [val, setValue] = useState(value)

    const handleChange = ({ target: { value } }) => {
        setValue(value);
        onChange(name, value)
    };

    style = Object.assign({ display: 'flex', flexDirection: 'row' }, style)

    return (

        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">{helpText}</FormLabel>
            <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={val}
                onChange={handleChange}
                style={style}
            >
                {list && list.map((elem, key) => (<FormControlLabel key={key} value={elem.name} control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />} label={elem.value} />))}
            </RadioGroup>
        </FormControl>
    )
}

RadioType.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    value: PropTypes.string,
}

export default withStyles(styles)(RadioType)
