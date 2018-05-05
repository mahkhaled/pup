/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import Orders from '../../Orders/Orders';

let action;

const deleteUser = (userId) => {
  try {
    return Meteor.users.remove(userId);
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteUser] ${exception.message}`);
  }
};

const deleteOrders = (userId) => {
  try {
    return Orders.remove({ owner: userId });
  } catch (exception) {
    throw new Error(`[deleteAccount.deleteOrders] ${exception.message}`);
  }
};

const deleteAccount = ({ userId }, promise) => {
  try {
    action = promise;
    deleteOrders(userId);
    deleteUser(userId);
    action.resolve();
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    deleteAccount(options, { resolve, reject }));
