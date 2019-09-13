import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.07;

const styles = theme => {
    return ({
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 700,
        },
    })
};
const TableComp = ({ classes, rows, heads }) => (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    {heads && heads.map(head => (
                        <TableCell key={head}><div className='red-color table-head'>{head}</div></TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows && rows.map((row, key) => (
                    <TableRow key={key}>
                        {row.map((r, i) => (
                            <TableCell key={`${key}-${i}`}><div className='table-content'>{r}</div></TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
);


const icons = {
    flash: 'icon-blue-flash',
    time: 'icon-blue-time',
    valid: 'icon-valide-red',
    ring: 'icon-ring',
}

export const buildTableIcon = (datas) => (
    <div>
        {datas && datas.map(elem => (
            <div key={elem} className={`inline-block ${icons[elem]}`}><span className='icon'></span></div>
        ))}
    </div>
)
export default withStyles(styles)(TableComp)