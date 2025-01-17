import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Header from '../components/header/index';
import Footer from '../components/footer/index';
let globalUser = null;

export default function withAuth(
  BaseComponent,
  { loginRequired = true, logoutRequired = false, adminRequired = false } = {},
) {
  class App extends React.PureComponent {
    static propTypes = {
      user: PropTypes.shape({
        id: PropTypes.string,
        isAdmin: PropTypes.bool,
      }),
      isFromServer: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      user: null,
    };

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (BaseComponent.getInitialProps) {
        Object.assign(props, (await BaseComponent.getInitialProps(ctx)) || {});
      }

      return props;
    }

    componentDidMount() {
      const { user, isFromServer } = this.props;

      if (isFromServer) {
        globalUser = user;
      }

      // if (loginRequired && !logoutRequired && !user) {
      //   Router.push('/public/login', '/login');
      //   return;
      // }

      // if (adminRequired && (!user || !user.isAdmin)) {
      //   Router.push('/');
      // }

      // if (logoutRequired && user) {
      //   Router.push('/');
      // }
    }

    render() {
      const { user } = this.props;

      // if (loginRequired && !logoutRequired && !user) {
      //   return null;
      // }

      // if (adminRequired && (!user || !user.isAdmin)) {
      //   return null;
      // }

      // if (logoutRequired && user) {
      //   return null;
      // }

      return (
        <React.Fragment>
          <Header {...this.props} />
          <BaseComponent {...this.props} />
          <Footer />
        </React.Fragment>
      );
    }
  }

  return App;
}