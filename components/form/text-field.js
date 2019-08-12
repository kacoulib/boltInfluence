import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import { FormElementWrapper } from './index'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    textField: {
        [`& fieldset`]: {
            border: 0,
            boxShadow: '0px 2px 5px #bfbfbf',
        },
    }
}))

const TextFieldComp = ({ name, label, type, value, onChange, showLabel, unableUnderline, unableBoxShadow = true }) => {
    const classes = useStyles();
    const variant = unableBoxShadow ? "outlined" : "standard"

    return (
        <FormElementWrapper label={label} showLabel={showLabel}>
            <TextField
                multiple
                type={type}
                label={showLabel ? '' : label}
                multiline={type === 'textarea'}
                fullWidth
                value={value}
                onChange={onChange(name)}
                InputProps={{
                    disableUnderline: !!unableUnderline,
                }}
                className={classes.textField}
                style={{ width: '100%' }}
                rows={8}
                variant={variant}
                rowsMax={10}
            />
        </FormElementWrapper>
    )
}


TextFieldComp.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    dimension: PropTypes.object,
    showLabel: PropTypes.bool,
    unableUnderline: PropTypes.bool,
    unableBoxShadow: PropTypes.bool,
}
export default TextFieldComp