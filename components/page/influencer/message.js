import Grid from '@material-ui/core/Grid';
import Message from '../../dataDisplay/message'
import Filter from '../../dataDisplay/element/filter'


const MessageComp = ({ }) => {

    const onFilter = () => console.log('filter')

    const categories = [
        {
            _id: 1,
            title: 'inbox',
            nb: 1,
        },
        {
            _id: 2,
            title: 'Envoyé',
            nb: 2,
        },
        {
            _id: 3,
            title: 'Brouillons',
            nb: 3,
        },
        {
            _id: 4,
            title: 'corbeille',
            nb: 4,
        },
    ];

    return (
        <Grid>
            <div className='message-container'>
                <Filter onFilter={onFilter} categories={categories} />
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