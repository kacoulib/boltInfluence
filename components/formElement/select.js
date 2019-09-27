import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import PropTypes from 'prop-types'
import { FormElementWrapper } from './index'
import { makeStyles } from '@material-ui/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    select: {
        [`& fieldset`]: {
            border: 0,
            boxShadow: '0px 2px 5px #bfbfbf',
        },
    }

}))
const fullwidth = {
    width: '100%',
}
const labelStyle = {
    paddingLeft: 10
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
    select: {
        [`& fieldset`]: {
            border: 0,
            boxShadow: '0px 2px 5px #bfbfbf',
        },
    },
    noBackground: {
        '&:focus': {
            backgroundColor: 'none',
        },
    }
};
const SelectType = ({ name, label, type, value, list, onChange, showLabel, variant, unableUnderline, multiple, unableBoxShadow = true, error = false, classes, labelPosition = {}, elemProps = {} }) => {
    if (unableBoxShadow)
        elemProps.style = { ...{ boxShadow: '0px 2px 5px #bfbfbf' }, ...elemProps.style };
    if ((!unableBoxShadow && !unableUnderline) || variant == 'outlined')
        variant = 'outlined';

    return (
        <FormElementWrapper label={label} showLabel={showLabel} labelPosition={labelPosition}>
            <FormControl
                style={elemProps.style ? { ...elemProps.style, ...fullwidth } : fullwidth}
                error={error}
            >
                {!showLabel ? <InputLabel htmlFor={name} style={labelStyle}>{label}</InputLabel> : ''}
                <Select
                    multiple={multiple}
                    value={value ? value : multiple ? [] : ''}
                    onChange={onChange(name)}
                    input={variant ? <OutlinedInput id={name} /> : <Input id={name} />}
                    disableUnderline={!!!unableUnderline}
                    required={true}
                    style={fullwidth}
                    className={unableBoxShadow ? classes.select : ''}
                // {...elemProps}
                >
                    {list && list.map((elem, key) => (
                        <MenuItem key={`${elem.name}-${key}`} value={elem.value}>
                            {elem.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FormElementWrapper>
    )
}
const SelectComp = (props) => {
    const classes = useStyles();

    return (<SelectType {...{ ...props, classes }} />)
}


SelectComp.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    showLabel: PropTypes.bool,
    unableUnderline: PropTypes.bool,
    unableBoxShadow: PropTypes.bool,
}
export default SelectComp