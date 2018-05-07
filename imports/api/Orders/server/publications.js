import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orders from '../Orders';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment'

Meteor.publish('orders', function orders() {
  const queryConditions = {
    creationTimestamp: {
      $gt : moment().subtract(7, 'days').format('x')
    }
  }
  const querySorting = { 
    sort : { creationTimestamp: -1 }
  }

  if ( Roles.userIsInRole(this.userId, ['office-boy']) ) {    
    return Orders.find({
        ...queryConditions
      },
      querySorting
    );
  } else {
    return Orders.find({ 
        ...queryConditions,
        owner: this.userId 
      }, 
      querySorting
    );
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
