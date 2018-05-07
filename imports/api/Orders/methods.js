/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Orders from './Orders';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';

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
    check(doc, {
      location: String,
      comments: String,      
      menuItem: String,
    });

    try {
      const haveAValidName = Meteor.user() && Meteor.user().profile && Meteor.user().profile.name;
      const ownerName = !haveAValidName ? '' : ( Meteor.user().profile.name.first + ' ' + Meteor.user().profile.name.last );
      return Orders.insert({ 
        owner: this.userId, 
        ...doc, 
        ownerName: ownerName,
        delivered: false,
        creationTimestamp: moment().format('x'),
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'orders.update': function ordersUpdate(doc) {
    check(doc, {
      _id: String,
      location: String,
      comments: String,
      menuItem: String,
    });

    try {
      const orderId = doc._id;
      const docToUpdate = Orders.findOne(orderId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Orders.update(orderId, { $set: doc });
        return orderId; // Return _id so we can redirect to order after update.
      }

      throw new Meteor.Error('403', 'Sorry, dude. You\'re not allowed to edit this order.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'orders.deliver': function ordersUpdate(orderId) {
    check(orderId, String);

    try {

      if ( Roles.userIsInRole(this.userId, ['office-boy']) ) {
        Orders.update({_id: orderId} , 
          { 
            $set: { 
              delivered: true,
              deliveredTimestamp: moment().format('x'),
            } 
          });
        return orderId; // Return _id so we can redirect to order after update.
      }

      throw new Meteor.Error('403', 'Sorry, dude. You\'re not allowed to edit this order.');
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

      throw new Meteor.Error('403', 'Sorry, dude. You\'re not allowed to delete this order.');
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