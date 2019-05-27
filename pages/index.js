import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import withAuth from '../lib/withAuth';
import withLayout from '../lib/withLayout';


class Index extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      displayName: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    user: null,
  }

  render() {
    const { user: { displayName, avatarUrl } } = this.props;

    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Settings</title>
          <meta
            name="description"
            content="Welcome."
          />
        </Head>
        <p>Welcome {displayName}</p>

      </div>
    );
  }
}

export default withAuth(withLayout(Index));
