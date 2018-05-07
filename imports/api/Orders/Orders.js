/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Orders = new Mongo.Collection('Orders');

Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Orders.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this Order belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this Order was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this Order was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  deliveredTimestamp: {
    type: String,
    optional: true,
    label: 'The timestamp this Order was delivered.',    
  },
  location: {
    type: String,
    label: 'The location to deliver the Order.',
  },
  delivered: {
    type: Boolean,
    label: 'Whether this order was delivered or not',    
  },
  creationTimestamp: {
    type: String,
    label: 'Timestamp for createdAt',
  },
  comments: {
    type: String,
    optional: true,
    label: 'The comments on the Order.',
  },
  menuItem: {
    type: String,
    label: 'The item choosen for the order'
  },
  ownerName: {
    type: String,
    label: 'The name of the order requester, cached for faster resolution and less code.',
  },
});

Orders.attachSchema(Orders.schema);

export default Orders;
