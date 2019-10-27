import React from "react";
import withAuth from '../../lib/withAuth';
import WebKit from '../../components/page/influencer/media-kit';

const fakeUser = {
    firstName: 'Sam',
    lastName: 'Jons',
    phone: '+3398765432',
    email: 'Samjones@gmail.com',
    src: '../static/img/sam_jones.png',
    address: '223 westview boulevard, 75000, Paris France',
}

const CustomerIndex = ({ user }) => <WebKit user={user} />

export default withAuth(CustomerIndex);
