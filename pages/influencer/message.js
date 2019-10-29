import React from "react";
import withAuth from '../../lib/withAuth';
import Message from '../../components/page/influencer/message';


const CustomerIndex = ({ user }) => (<Message selected={user} />)

export default withAuth(CustomerIndex, { showSideProfile: true });
