const SEQUELIZE = require('sequelize');
const config = require('../config');
const twilio = require('twilio');

const Receipient = db.define('receipients', {
  customerName: SEQUELIZE.String,
  customerPhoneNumber: SEQUELIZE.String,
  status: { type: SEQUELIZE.String, defaultValue: 'Ready' },
  notificationStatus: { type: SEQUELIZE.String, defaultValue: 'None' },
});

Receipient.prototype.sendSmsNotification = function(message, statusCallback) {
  if (!statusCallback) {
    throw new Error('status callback is required to send notification.');
  }

  var client = twilio(config.twilioAccountSid, config.twilioAuthToken);
  var self = this;
  var options = {
    to: self.customerPhoneNumber,
    from: config.twilioPhoneNumber,
    body: message,
    statusCallback: statusCallback,
  };

  return client.messages.create(options).then(message => {
    console.log('Message sent to ' + message.to);
  });
};

module.exports = Receiptient;
