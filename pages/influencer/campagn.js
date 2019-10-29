import React from "react";
import withAuth from '../../lib/withAuth';
// import Campagne from '../../components/page/dashboard/campagne';
import Campagn from '../../components/page/influencer/campagne';
import NavBack from '../../components/page/navBack';



const CustomerIndex = ({ user }) => {

    const setSelection = id => {
        const selected = state.datas ? state.datas.find((e) => e._id == id) : null;

        onChange('selected', selected)
    }
    const onChange = (name, value) => setState({ ...state, [name]: value })

    const setElemProps = (title, requestName) => ({
        title,
        setSelection: setSelection,
        selected: [],
        datas: null,
        loadMore: () => loadMore(requestName)
    })
    const data = setElemProps('Campagnes', 'campaigns')

    return (
        <Campagne {...data} />
    )
}
const CampagnComp = ({ user }) => <NavBack redirectUrl={`/${user.role}/informations`} title='Campagnes'><Campagn /></NavBack>

export default withAuth(CampagnComp, { showAside: false, showSideProfile: false });
