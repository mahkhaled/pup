import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orders from '../Orders';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('orders', function orders() {
  if ( Roles.userIsInRole(this.userId, ['office-boy']) ) {
    return Orders.find({}, { sort : { createdAt: -1 }});
  } else {
    return Orders.find({ owner: this.userId }, { sort : { createdAt: -1 }});
  }
});

// Note: orders.view is also used when editing an existing order.
Meteor.publish('orders.view', (orderId) => {
  check(orderId, String);
  return Orders.find({ _id: orderId });
});

Meteor.publish('orders.edit', function ordersEdit(orderId) {
  check(orderId, String);
  return Orders.find({ _id: orderId, owner: this.userId });
});
