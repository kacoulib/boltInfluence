import React from 'react';

import withLayout from '../../lib/withLayout';
import withAuth from '../../lib/withAuth';

import Card from '../../components/elements/Card';

const NewsDetails = () => (
  <div style={{ padding: '10px 45px' }}>
    <h3>Your books</h3>
	<Card />
  </div>
);

export default withLayout(NewsDetails);
