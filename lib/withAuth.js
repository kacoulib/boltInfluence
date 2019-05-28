import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { isAdmin, RoleList } from '../utils/variables/user'
let globalUser = null;

export default (
  Page,
  { loginRequired = true, logoutRequired = false, adminRequired = false } = {},
) => class BaseComponent extends React.Component {
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

    componentDidMount() {
      const { user, isFromServer } = this.props;
      const sub = Router.pathname.split('/')[1];

      if (isFromServer) {
        globalUser = user;
      }
      // redirect depending 
      if (loginRequired) {
        if (user && RoleList.includes(user.role))
          return Router.push('/' + user.role);
        if (!logoutRequired && !user)
          return Router.push('/public/login', '/login');
      }

      if (logoutRequired && user)
        Router.push('/');
    }

    static async getInitialProps(ctx) {
      const isFromServer = !!ctx.req;
      const user = ctx.req ? ctx.req.user && ctx.req.user.toObject() : globalUser;

      if (isFromServer && user) {
        user._id = user._id.toString();
      }

      const props = { user, isFromServer };

      if (Page.getInitialProps) {
        Object.assign(props, (await Page.getInitialProps(ctx)) || {});
      }

      return props;
    }

    render() {
      const { user } = this.props;

      if (loginRequired && !logoutRequired && !user) {
        return null;
      }

      if (logoutRequired && user) {
        return null;
      }

      if (adminRequired && (!user || !isAdmin(user))) {
        return null;
      }

      return <Page {...this.props} />;
    }
  };
