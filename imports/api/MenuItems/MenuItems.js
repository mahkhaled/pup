/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const MenuItems = new Mongo.Collection('MenuItems');

MenuItems.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

MenuItems.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

MenuItems.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the menu-item.',
  },
});

MenuItems.attachSchema(MenuItems.schema);

export default MenuItems;
