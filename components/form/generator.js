import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
import Wysiwyg from './wysiwyg'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ChipList from '../../components/form/chipList';
import Select from './select';
import Radio from './radio';
import Upload from './upload';
import Checkbox from './checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ReactSelect from './reactSelect'
import ColorPicker from 'material-ui-color-picker'
import TextField from './text-field'
/*

    <FormGenerator
        fields={fieldsMarque}
        state={state}
        onChange={onChange}
        settings={{ showLabel: { xs: 6 } }}
    />

    // input
    const form = [{ //input
        label: "Nom de la marque",
        name: "name",
        type: 'input',
        required: true,
        disableUnderline: true,
        width: 4,
        formControlStyle: {},
        props: {
            style: {},
        },
    }]

    // select
    const select = {

    {
        label: "Description",
        name: "description",
        type: 'textarea',
        required: true,
        width: 4
        }
    ]
    // ReactSelect
    const select = {

    {
        label: "Description",
        name: "description",
        type: 'react-select',
        required: true,
        width: 4,
        props: {
            list: [
                { value: 'chocolate', label: 'Chocolate' },
                ...
            ]
        }
    }
    ]
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


const FormGenerator = ({ fields, classes, state, onChange, toggleList, settings, align = 'center' }) => {

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
                        const elemSettings = {
                            unableUnderline: settings.unableUnderline,
                            unableBoxShadow: settings.unableBoxShadow
                        }

                        return (
                            <Grid key={key} item {...dimentions}>
                                {textTypes.includes(elem.type) && (
                                    <TextField
                                        onChange={handleChange}
                                        showLabel={showLabel}
                                        value={state[elem.name] || inputDefaultProps}
                                        elemProps={elemProps}
                                        {...{ ...elem, ...elemSettings }}
                                    />
                                )
                                    || elem.type == 'wysiwyg' && (
                                        <Wysiwyg
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
                                        <Grid container>
                                            {showLabel && <Grid item {...labelSpacing}>{elem.label}</Grid>}

                                            <Grid item {...labelSpacing}>

                                                <div>
                                                    <Checkbox name={elem.name} label={elem.label} value={state[elem.name]} onChange={onChange} {...elemProps} />
                                                </div>
                                            </ Grid>
                                        </ Grid>
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
    settings: PropTypes.object,
    toggleList: PropTypes.func,
    align: PropTypes.string
}

export default withStyles(styles)(FormGenerator);
