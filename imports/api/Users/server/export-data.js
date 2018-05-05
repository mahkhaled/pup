/* eslint-disable consistent-return */

import JSZip from 'jszip';
import Orders from '../../Orders/Orders';

let action;

const generateZip = (zip) => {
  try {
    zip.generateAsync({ type: 'base64' })
      .then(content => action.resolve(content));
  } catch (exception) {
    throw new Error(`[exportData.generateZip] ${exception.message}`);
  }
};

const addOrdersToZip = (orders, zip) => {
  try {
    orders.forEach((order) => {
      zip.file(`${order.title}.txt`, `${order.title}\n\n${order.body}`);
    });
  } catch (exception) {
    throw new Error(`[exportData.addOrdersToZip] ${exception.message}`);
  }
};

const getOrders = (userId) => {
  try {
    return Orders.find({ owner: userId }).fetch();
  } catch (exception) {
    throw new Error(`[exportData.getOrders] ${exception.message}`);
  }
};

const exportData = ({ userId }, promise) => {
  try {
    action = promise;
    const zip = new JSZip();
    const orders = getOrders(userId);
    addOrdersToZip(orders, zip);
    generateZip(zip);
  } catch (exception) {
    action.reject(exception.message);
  }
};

export default options =>
  new Promise((resolve, reject) =>
    exportData(options, { resolve, reject }));
