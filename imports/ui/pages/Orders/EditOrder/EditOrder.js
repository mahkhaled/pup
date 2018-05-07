import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Orders from '../../../../api/Orders/Orders';
import MenuItems from '../../../../api/MenuItems/MenuItems'
import Locations from '../../../../api/Locations/Locations'
import OrderEditor from '../../../components/OrderEditor/OrderEditor';
import NotFound from '../../NotFound/NotFound';

const EditOrder = ({ doc, history, items, locations }) => (doc ? (
  <div className="EditOrder">    
    <h4 className="page-header">Editing Order</h4>
    <OrderEditor doc={doc} history={history} items={items} locations={locations} />
  </div>
) : <NotFound />);

EditOrder.defaultProps = {
  doc: null,
};

EditOrder.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(({ match }) => {
  const orderId = match.params._id;
  const orderSubscription = Meteor.subscribe('orders.edit', orderId);
  const menuSubscription = Meteor.subscribe('menuItems');
  const locationSubscription = Meteor.subscribe('locations');

  return {
    loading: !orderSubscription.ready() || !menuSubscription.ready() || !locationSubscription.ready(),
    items: MenuItems.find().fetch(),
    locations: Locations.find().fetch(),
    doc: Orders.findOne(orderId),
  };
})(EditOrder);
