const { createTransport } = require('nodemailer');

// Lazy initialization needed because the environment variables are not
// available right from the start when they're set with dotenv
let transport;

const init = () => {
  transport = createTransport({
    post: Number(process.env.MAIL_PORT),
    host: process.env.MAIL_HOST,
    secure: Boolean(Number(process.env.MAIL_SECURE)),
    requireTLS: true,
    auth: {
      type: 'login',
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

/**
 * Send a mail
 * @param {Object} options
 * @param {String} options.to - Recipient
 * @param {String} options.subject - Subject
 * @param {String} options.content - HTML mail content
 * @param {Array<String>=} [options.cc] - Carbon Copy recipients
 * @param {Array<String>=} [options.bcc] - Blind Carbon Copy recipients
 */
const sendMail = async ({ to, subject, content, cc=[], bcc=[] } = {}) => {
  if (!transport) init();
  await transport.sendMail({
    from: process.env.MAIL_USER,
    html: content,
    to,
    subject,
    cc,
    bcc,
  });
};

module.exports = { sendMail };