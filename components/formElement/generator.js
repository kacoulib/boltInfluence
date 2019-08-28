import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';

import Wysiwyg from './wysiwyg'
import ChipList from './chipList';
import Select from './select';
import Radio from './radio';
import Upload from './upload';
import Checkbox from './checkbox';
import ReactSelect from './reactSelect'
import ColorPicker from 'material-ui-color-picker'
import TextField from './text-field'
/*

    <FormGenerator
        fields={fieldsMarque}
        state={state}
        onChange={onChange}
        errors={[]}
        settings={{ showLabel: { xs: 6 } }}
    />
*/
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        height: 140,
        width: 100,
    },
    formControl: {
        padding: theme.spacing(1),
        width: '100%',
    },
    inputControl: {
        backgoundColor: 'red'
    },
    formLabel: {
        paddingLeft: '1rem'
    },
    InputLabelProps: {
        paddingLeft: '1rem'
    },
    control: {
        padding: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});


const FormGenerator = ({ fields, classes, state, onChange, toggleList, settings = {}, errors = [], align = 'center' }) => {

    const textTypes = ['input', 'password', 'email', 'number', 'textarea', 'date', 'datetime-local'],
        selectTypes = ['select'],
        spacing = 4,
        defaultDimension = { xs: 12 };

    const handleChange = (name) => ({ target: { value } }) => onChange(name, value)
    const showLabel = settings && settings.showLabel;
    const labelSpacing = showLabel ? settings.showLabel : defaultDimension;

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            <FormControl className={classes.container} required={true}>
                <Grid container className={classes.root} spacing={spacing} alignItems="center">
                    {fields && fields.map((elem, key) => {
                        const dimentions = elem.dimension ? elem.dimension : defaultDimension;
                        const elemProps = elem.props;
                        const inputDefaultProps = elemProps && elemProps.defaultValue ? elemProps.defaultValue : '';
                        const error = errors.includes(elem.name);
                        const elemSettings = settings
                        const containerStyle = elem.type == 'checkbox' ? { paddingTop: 0, paddingBottom: 0 } : {}

                        return (
                            <Grid key={key} item {...dimentions} style={containerStyle}>
                                {textTypes.includes(elem.type) && (
                                    <TextField
                                        error={error}
                                        onChange={handleChange}
                                        showLabel={showLabel}
                                        value={state[elem.name] || inputDefaultProps}
                                        elemProps={elemProps}
                                        {...{ ...elem, ...elemSettings }}
                                    />
                                )
                                    || elem.type == 'wysiwyg' && (
                                        <Wysiwyg
                                            error={error}
                                            value={state[elem.name]}
                                            onChange={onChange}
                                            showLabel={showLabel}
                                            {...elem}
                                        />
                                    )
                                    || elem.type == 'chipList' && (
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>
                                                <p>{elem.label && <span >{elem.label}</span>}</p>
                                                <ChipList onClick={toggleList} onDelete={toggleList}
                                                    {...elemProps}
                                                />
                                            </ Grid>
                                        </ Grid>
                                    )
                                    || selectTypes.includes(elem.type) && (
                                        <Select
                                            error={error}
                                            onChange={handleChange}
                                            showLabel={showLabel}
                                            value={state[elem.name] || inputDefaultProps}
                                            elemProps={elemProps}
                                            list={elem.list}
                                            {...{ ...elem, ...elemSettings }}
                                        />
                                    )
                                    || elem.type == 'react-select' && (
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>
                                                <FormControl className={classes.formControl} required={elem.props && elem.props.required} style={elem.formControlStyle}>
                                                    {elem.label && <span >{elem.label}</span>}
                                                    <ReactSelect
                                                        name={elem.name}
                                                        options={elemProps.list}
                                                        value={state[elem.name]}
                                                        onChange={(value) => onChange(elem.name, value) && console.log(value, state[elem.name])}
                                                    />
                                                </FormControl>
                                            </ Grid>
                                        </ Grid>
                                    )
                                    || elem.type == 'img' && (
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>

                                                <div>
                                                    <img src={state[elem.name]} {...elemProps} onChange={onChange} />
                                                </div>
                                            </ Grid>
                                        </ Grid>
                                    )
                                    || elem.type == 'radio' && (
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>

                                                <div>
                                                    <Radio name={elem.name} label={showLabel ? '' : elem.label} value={state[elem.name]} onChange={onChange} {...elemProps} />
                                                </div>
                                            </ Grid>
                                        </ Grid>
                                    )
                                    || elem.type == 'checkbox' && (
                                        <Checkbox name={elem.name} label={elem.label} value={state[elem.name]} onChange={onChange} {...elemProps} />
                                    )
                                    || elem.type == 'color' && (
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>
                                                <div>
                                                    <ColorPicker
                                                        name={elem.name}
                                                        value={state[elem.name] || '#000'}
                                                        onChange={value => onChange(elem.name, value)}
                                                    />
                                                </div>
                                            </ Grid>
                                        </ Grid>
                                    )
                                    || elem.type == 'upload' && (
                                        <Upload
                                            error={error}
                                            name={elem.name}
                                            defaultValue={state[elem.name]}
                                            label={elem.label}
                                            showLabel={showLabel}
                                            value={state[elem.name]}
                                            onChange={value => onChange(elem.name, value)}
                                            {...elemProps}
                                        />
                                    )
                                }
                            </Grid>
                        )
                    }








                    )}
                </Grid>
            </FormControl>
        </form>
    )
}

FormGenerator.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    state: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.array,
    settings: PropTypes.object,
    toggleList: PropTypes.func,
    align: PropTypes.string
}

export default withStyles(styles)(FormGenerator);
