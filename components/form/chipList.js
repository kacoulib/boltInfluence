import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.unit,
    },
});

const ChipList = ({ list, onClick, onDelete, classes }) => (
    list.map((elem, i) => (
        <Chip
            key={i}
            avatar={
                <Avatar>
                    <img src={elem.icon} />
                </Avatar>
            }
            label={elem.label}
            onClick={() => onClick(i)}
            onDelete={() => onDelete(i)}
            deleteIcon={elem.selected ? <CancelIcon /> : <DoneIcon />}
            className={classes.chip}
            style={{ opacity: elem.selected ? 1 : .5 }}
        />
    )
    )
)

ChipList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        icon: PropTypes.string.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}
export default withStyles(styles)(ChipList)