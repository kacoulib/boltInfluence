const express = require('express');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const next = require('next');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const nextRoutes = require('./routes/next-routes')

const { setupMangopay } = require('./utils/mangopay');
const instagramAuth = require('./auth/instagram');
const googleAuth = require('./auth/google');
const facebookAuth = require('./auth/facebook');
const twitterAuth = require('./auth/twitter');
const twitchAuth = require('./auth/twitch');
const pinterestAuth = require('./auth/pinterest');
const basicAuth = require('./auth/basic');
const routes = require('./routes');
const serverRoutes = require('./routes/server');
const User = require('./models/User');
const { parse } = require('url')
const logger = require('./logs');
const { insertTemplates } = require('./models/EmailTemplate');
const { RoleList, isInfluencer, isBusiness, userProfileCompeleteFields } = require('../utils/variables/user')

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL_PROD;

const mangopayConfig = {
  clientId: process.env.MANGOPAY_CLIENTID,
  clientApiKey: process.env.MANGOPAY_APIKEY,
  debugMode: dev,
};
if (process.env.MANGOPAY_BASE_URL) {
  mangopayConfig.baseUrl = process.env.MANGOPAY_BASE_URL;
}
// console.log(setupMangopay(mangopayConfig).config);

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose
  .connect(MONGO_URL, options)
  .catch(err => {
    logger.error(err.message);
    process.exit(1);
  });

// fake DB
const messages = [];

// socket.io server
console.log('---');
io.on('connect', (socket) => {
  console.log('--------connected');
  socket.on('message', (data) => {
    console.log('server', data);
    messages.push(data);
    socket.emit('message', data);
  });
});

const port = process.env.PORT || 8000;
const ROOT_URL = process.env.ROOT_URL || `http://localhost:${port}`;

const URL_MAP = {
  '/login': '/public/login',
  '/my-books': '/customer/my-books',
};

const userProfilePercent = (user) => {
  let count = 0;
  if (!user)
    return 0;

  userProfileCompeleteFields.map(e => { count += user[e] ? 1 : 0; console.log(user[e] ? '' : `${e} = ${user[e]}`) });

  return ((count / userProfileCompeleteFields.length) * 100)
}

const nextApp = next({ dev });
const handle = nextRoutes.getRequestHandler(nextApp);

nextApp.prepare().then(async () => {
  app.use(compression())
  const MongoStore = mongoSessionStore(session);
  const sess = {
    name: 'builderbook.sid',
    secret: 'HD2w.)q*VqRT4/#NK2M/,E^B)}FED5fWU!dKe[wk',
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // expires in 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      path: '/',
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    },
  };
  if (!dev) {
    app.set('trust proxy', 1);
    sess.cookie = {
      ...sess.cookie,
      secure: true,
      domain: 'bolt-influence.com',
      sameSite: true,
    };
  }

  app.use(cors({
    origin: true,
    allowedHeaders: [
      'X-Forwarded-Port',
      'X-Forwarded-Proto',
      'X-Forwarded-Protocol',
      'X-Forwarded-Ssl',
      'X-Url-Scheme',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept'
    ],
    credentials: true,
  }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  app.use(session(sess));
  app.use(passport.initialize());
  app.use(passport.session());


  app.use((req, res, next) => {
    next();
  });

  passport.serializeUser((user, cb) => {
    cb(null, user._id.toString());
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, User.publicFields(), (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  googleAuth({ app, ROOT_URL });
  instagramAuth({ app, ROOT_URL });
  facebookAuth({ app, ROOT_URL });
  twitterAuth({ app, ROOT_URL });
  twitchAuth({ app, ROOT_URL });
  pinterestAuth({ app, ROOT_URL });
  basicAuth({ app, nextApp });

  routes(app);
  serverRoutes(app, nextApp);

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });


  app.get('*', (req, res) => {
    let parsedUrl = parse(req.url, true),
      { pathname, query } = parsedUrl,
      url = URL_MAP[pathname],
      { user } = req,
      redirectUrl;
    // if (isInfluencer(user)) {
    //   if ((user.profilePercent = userProfilePercent(user)) < 70)
    //     nextApp.render(req, res, '/influencer/renseignement');
    //   return
    // }
    // if (RoleList.includes(user.role)) {
    //   redirectUrl = isBusiness(user) ? `/marques${pathname}` : `/${user.role}${pathname}`;
    //   nextApp.render(req, res, redirectUrl);
    //   console.log(redirectUrl, pathname)
    //   return;
    // }
    // else
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
