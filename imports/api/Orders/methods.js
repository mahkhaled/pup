/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Orders from './Orders';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'orders.findOne': function ordersFindOne(orderId) {
    check(orderId, Match.OneOf(String, undefined));

    try {
      return Orders.findOne(orderId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'orders.insert': function ordersInsert(doc) {
    console.log(doc)
    check(doc, {
      location: String,
      description: String,
    });

    try {
      return Orders.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'orders.update': function ordersUpdate(doc) {
    check(doc, {
      _id: String,
      location: String,
      description: String,
    });

    try {
      const orderId = doc._id;
      const docToUpdate = Orders.findOne(orderId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Orders.update(orderId, { $set: doc });
        return orderId; // Return _id so we can redirect to order after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this order.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'orders.remove': function ordersRemove(orderId) {
    check(orderId, String);

    try {
      const docToRemove = Orders.findOne(orderId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
        return Orders.remove(orderId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this order.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'orders.insert',
    'orders.update',
    'orders.remove',
  ],
  limit: 5,
  timeRange: 1000,
});