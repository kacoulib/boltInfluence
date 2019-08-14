import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';

const labelDimension = { xs: 6, ms: 12 }
const defaultDimension = { xs: 12, ms: 12 }

const LableWrapper = ({ label, ...props }) => {
    return (
        <Grid container justify="space-between" alignItems="center" alignContent='center'>
            <Grid item {...labelDimension}>{label}</Grid>
            <Grid item {...labelDimension}>{props.children}</Grid>
        </Grid>
    )
}

const FormElementWrapper = ({ showLabel = false, ...props }) => {
    if (showLabel)
        return (<LableWrapper {...props} />)

    return (<Grid item {...defaultDimension}>{props.children}</Grid>)
}
FormElementWrapper.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
}

export { FormElementWrapper }