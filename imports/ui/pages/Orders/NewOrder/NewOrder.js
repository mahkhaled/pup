import React from 'react';
import PropTypes from 'prop-types';
import OrderEditor from '../../../components/OrderEditor/OrderEditor';
import MenuItems from '../../../../api/MenuItems/MenuItems'
import Locations from '../../../../api/Locations/Locations'

import { withTracker } from 'meteor/react-meteor-data';

const NewOrder = ({ history, items, locations }) => (
  <div className="NewOrder">
    <h4 className="page-header">New Order</h4>
    <OrderEditor history={history} items={items} locations={locations}/>
  </div>
);

NewOrder.propTypes = {
  history: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withTracker(({ match }) => {
  const menuSubscription = Meteor.subscribe('menuItems');
  const locationsSubscription = Meteor.subscribe('locations');

  return {
    loading: !menuSubscription.ready() || !locationsSubscription.ready(),
    items: MenuItems.find().fetch(),  
    locations: Locations.find().fetch(),  
  };
})(NewOrder);