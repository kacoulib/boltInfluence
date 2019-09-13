import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import InfluenceurJones from '../../../static/img/pictures/influencer_jones.png'
import Button from '@material-ui/core/Button';
import Detail from './campagne-detail'
import Messages from './campagne-messages'
import StarsComp from '../../../components/dataDisplay/star'
import MessageComp from '../../../components/dataDisplay/message'

const styles = {
    container: { padding: '0 3em' },
    childContainer: { marginBottom: '3em' },
    status: { color: '#F13F4B' },
    influencer_info_container: { padding: '1rem' },
}

const Index = ({ datas, selectedElem, showMessageView = false, toggleMessageView, setNavTitle, setShowNav, setSelection, loadMore }) => {
    if (selectedElem)
        return (<Detail selectedElem={selectedElem} setNavTitle={setNavTitle} />);
    else if (showMessageView) {
        setShowNav()
        return (<MessageComp showOptions={false} />);
    }

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
                        <Grid item container xs={8} sm={8} style={styles.influencer_info_container}>
                            <Grid item container xs={12} sm={12}>
                                <Grid item container xs={12} sm={12}>
                                    <Grid item xs={12} sm={12}><h3 className='no-margin'>{`${elem.name}`}</h3></Grid>
                                    <Grid item xs={12} sm={12}><span>{`${elem.agence}`}</span></Grid>
                                </Grid>

                                <Grid item container xs={12} sm={12} alignContent='center' className='text-center'>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status} onClick={() => setSelection(elem._id)}>Administrer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Activer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status}>Cloturer</p></Grid>
                                    <Grid item xs={3} sm={3}><p className='pointer' style={styles.status} onClick={() => toggleMessageView(elem._id)}>Messages</p></Grid>
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