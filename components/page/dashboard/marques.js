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

const Index = ({ datas, selectedElem, setSelection, loadMore, setNavTitle }) => {
    if (selectedElem)
        return (<Detail selectedElem={selectedElem} setNavTitle={setNavTitle} />);

    return (
        <Grid container alignItems='center' justify="center" style={styles.container} >
            <Grid item xs={12} sm={12} style={styles.childContainer}>
                <h2>Marques & agences</h2>
                {datas && datas.map((elem, i) => (
                    <Grid key={i} container alignItems="stretch" justify="center" className='influencers_list'>
                        <Grid item xs={4} sm={4} className='center-text'>
                            <div className='influencers_img' style={{ backgroundImage: "url(" + InfluenceurJones + ")" }}><div></div>
                                <img src={InfluenceurJones} />
                            </div>
                        </Grid>
                        <Grid item container xs={8} sm={8} justify="space-between" style={styles.influencer_info_container}>
                            <Grid item container alignItems='center' justify="center" xs={12} sm={12}>
                                <Grid item xs={11} sm={11} className='text-center'><span>{`${elem.firstName} ${elem.lastName}`}</span></Grid>
                                <Grid item xs={1} sm={1} className='text-right'><span className='icon write pointer' onClick={() => setSelection(elem._id)}></span></Grid>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <p>ID : {elem._id}</p>
                                <p>Email : {elem.email}</p>
                                <p>Numéro de téléphone : {elem.phone}</p>
                            </Grid>

                            <Grid item container xs={12} sm={12}>
                                <Grid item xs={6} sm={6}><p style={styles.status}>{elem.status}</p></Grid>
                                <Grid item xs={6} sm={6}><p style={styles.status} className='text-right'>{elem.isActif ? 'Actif' : ''}</p></Grid>
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
    setSelection: PropTypes.func.isRequired,
    loadMore: PropTypes.func
}

export default Index;