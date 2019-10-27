import React from "react";
import withAuth from '../../lib/withAuth';

import Dashboard from '../../components/page/influencer/dashboard';

const CustomerIndex = ({ user }) => (<Dashboard user={user} />)

export default withAuth(CustomerIndex);
