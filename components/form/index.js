import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid';

let labelDimension = { xs: 6, ms: 12 },
    className;
const defaultDimension = { xs: 12, ms: 12 }

const LableWrapper = ({ label, labelPosition = '', ...props }) => {
    if (labelPosition.includes && labelPosition.includes('top'))
        labelDimension.xs = 12
    if (labelPosition.includes && labelPosition.includes('left'))
        className = 'text-left'

    return (
        <Grid container justify="space-between" alignItems="center" alignContent='center'>
            <Grid item {...labelDimension} className={className}>{label}</Grid>
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