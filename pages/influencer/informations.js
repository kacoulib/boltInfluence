import React, { useState, useEffect } from "react";
import withAuth from '../../lib/withAuth';
import InfluencersDetail from '../../components/page/dashboard/influencer-detail';

const CustomerIndex = ({ user }) => (<InfluencersDetail user={user} />)

export default withAuth(CustomerIndex);
