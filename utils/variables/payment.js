const Bolt = 'bolt';
const Influencer = 'influencer';
const PaymentExecutionList = [Bolt, Influencer];

const Pending = 'pending';
const Succeeded = 'succeeded';
const Failed = 'failed';
const PaymentStatusList = [Pending, Succeeded, Failed];

const isExecutedByBolt = (payment) => payment && payment.execution === Bolt;
const isExecutedByInfluencer = (payment) => payment && payment.execution === Influencer;

const isPending = (payment) => payment && payment.status === Pending;
const isSucceeded = (payment) => payment && payment.status === Succeeded;
const isFailed = (payment) => payment && payment.status === Failed;

module.exports = {
  PaymentExecutionList,
  Bolt,
  Influencer,

  PaymentStatusList,
  Pending,
  Succeeded,
  Failed,

  isExecutedByBolt,
  isExecutedByInfluencer,

  isPending,
  isSucceeded,
  isFailed,
};
