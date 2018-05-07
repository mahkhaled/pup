import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import MenuItems from '../MenuItems';

Meteor.publish('menuItems', function menuItems() {
  return MenuItems.find({}, {sort: {name: 1}});
});