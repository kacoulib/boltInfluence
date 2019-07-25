import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    img: { width: 30 },
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
}

const Index = ({ datas: { subscribedInfluencer, waitingInfluencer, subscribedMarque, waitingMarque, subscribedCampagne, waitingCampagne } }) => {
    const tmp = [
        {
            title: 'Nombre d\'influenceurs',
            card: [{ text: 'Inscrit', nb: subscribedInfluencer }, { text: 'En attente', nb: waitingInfluencer }]
        },
        {
            title: 'Marques',
            card: [{ text: 'Inscrites', nb: subscribedMarque }, { text: 'En attente', nb: waitingMarque }]
        },
        {
            title: 'Campagnes',
            card: [{ text: 'Nombres de campagnes', nb: subscribedCampagne }, { text: 'En attente', nb: waitingCampagne }]
        }
    ]
    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            {tmp.map((elem, i) => (
                <Grid key={i} item xs={12} sm={12} style={styles.childContainer}>
                    <h2>{elem.title}</h2>
                    <Grid container alignItems='center' justify="center" >
                        {elem.card.map((e, j) => (
                            <Grid key={j + 'elem-child'} item xs={12} sm={4} className='center-text'>
                                <div style={j % 2 == 0 ? styles.cardContainer : styles.rightCardContainer}>
                                    <img src={e.icon} style={styles.img} />
                                    <div>{e.text}</div>
                                    <h3 style={styles.cardText}>{e.nb}</h3>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
        </ Grid>
    )
}
Index.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Index;