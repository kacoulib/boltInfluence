import Grid from '@material-ui/core/Grid';
import Message from '../../dataDisplay/message'
import Filter from '../../dataDisplay/element/filter'


const MessageComp = ({ }) => {

    const onFilter = () => console.log('filter')

    return (
        <Grid>
            <div className='message-container'>
                <Filter onFilter={onFilter} />
            </div>
            <div>
                <Message />
            </div>
            <style jsx>{`
                .message-container {
                    margin-bottom: 3rem;
                }
                .nb {
                    display: inline-block;
                }
                .uppper {
                font-size: 1rem;
            }
            `}</style>
        </Grid>
    )
}

export default MessageComp