/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Orders from './Orders';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'Orders.findOne': function OrdersFindOne(OrderId) {
    check(OrderId, Match.OneOf(String, undefined));

    try {
      return Orders.findOne(OrderId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Orders.insert': function OrdersInsert(doc) {
    check(doc, {
      title: String,
      body: String,
    });

    try {
      return Orders.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Orders.update': function OrdersUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const OrderId = doc._id;
      const docToUpdate = Orders.findOne(OrderId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Orders.update(OrderId, { $set: doc });
        return OrderId; // Return _id so we can redirect to Order after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this Order.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Orders.remove': function OrdersRemove(OrderId) {
    check(OrderId, String);

    try {
      const docToRemove = Orders.findOne(OrderId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
        return Orders.remove(OrderId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this Order.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'Orders.insert',
    'Orders.update',
    'Orders.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
