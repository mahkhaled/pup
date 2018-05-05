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
  title: {
    type: String,
    label: 'The title of the Order.',
  },
  body: {
    type: String,
    label: 'The body of the Order.',
  },
});

Orders.attachSchema(Orders.schema);

export default Orders;
