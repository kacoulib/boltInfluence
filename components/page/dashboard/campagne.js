import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import Button from '@material-ui/core/Button';
import Detail from './marque-detail'
import StarsComp from '../../../components/dataDisplay/star'


const cardContainer = {
    padding: '1rem',
    color: 'white',
    backgroundColor: '#242B45',
    margin: '.5em'
}
const styles = {
    cardContainer,
    rightCardContainer: Object.assign({}, cardContainer, { backgroundColor: '#F13F4B' }),
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    cardText: { margin: '.5em 0 0' },
    status: { color: '#F13F4B' },
    stars: { width: '50%' },
    influencer_img_container: { height: 'auto', paddingTop: 5 },
    influencer_info_container: { padding: '0 1rem' },
}

const Index = ({ datas, selectedElem, loadMore }) => {
    if (selectedElem)
        return (<Detail selectedElem={selectedElem} />);

    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2 className='no-margin-top'>Campagnes</h2>
                {datas && datas.map((elem, i) => (
                    <Grid key={i} container alignItems="stretch" justify="center" className='influencers_list'>
                        <Grid item xs={4} sm={4} className='center-text'>
                            <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")" }}><div></div>
                                <img src={InfluenceurJones} />
                            </div>
                        </Grid>
                        <Grid item container xs={8} sm={8} justify="space-between" style={styles.influencer_info_container}>
                            <Grid item container xs={12} sm={12} justify="space-between" style={styles.influencer_info_container}>
                                <Grid item container xs={12} sm={12}>
                                    <Grid item xs={12} sm={12}><h2 className='no-margin'>{`${elem.firstName} ${elem.lastName}`}</h2></Grid>
                                    <Grid item xs={12} sm={12}><span>{`${elem.firstName} ${elem.lastName}`}</span></Grid>
                                </Grid>

                                <Grid item container xs={12} sm={12} alignContent='center' className='text-center'>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Administrer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Activer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Cloturer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status} className='text-right'>Messages</p></Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => loadMore()}>More</Button>
            <style jsx>{`
                p {
                    margin: 0;
                    font-size: 1rem;
                }
            `}</style>
        </ Grid>
    )
}
Index.propTypes = {
    datas: PropTypes.object.isRequired,
    loadMore: PropTypes.func
}

export default Index;