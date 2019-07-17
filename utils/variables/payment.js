const Bolt = 'bolt';
const Influencer = 'influencer';
const PaymentExecutionList = [Bolt, Influencer];

const isExecutedByBolt = (payment) => payment && payment.execution === Bolt;
const isExecutedByInfluencer = (payment) => payment && payment.execution === Influencer;

module.exports = {
  PaymentExecutionList,
  Bolt,
  Influencer,

  isExecutedByBolt,
  isExecutedByInfluencer,
};
