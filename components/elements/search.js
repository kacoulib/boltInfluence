import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,

    },
    inputContainer: {
        width: 'calc(100% - 70px)',
        paddingLeft: 10
    },
    iconButton: {
        padding: 10,
    },
};

const SearchComp = ({ classes, label = 'Recherche', onChange, onClick }) => (
    <Paper className={classes.root}>
        <InputBase
            style={styles.inputContainer}
            className={classes.input}
            placeholder={label}
            inputProps={{ 'aria-label': 'Search Google Maps' }}
        />
        <IconButton className={classes.iconButton} aria-label="Search">
            <SearchIcon />
        </IconButton>
    </Paper>
);

export default withStyles(styles)(SearchComp)
