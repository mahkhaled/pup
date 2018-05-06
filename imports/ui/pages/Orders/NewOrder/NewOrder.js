import React from 'react';
import PropTypes from 'prop-types';
import OrderEditor from '../../../components/OrderEditor/OrderEditor';
import MenuItems from '../../../../api/MenuItems/MenuItems'
import { withTracker } from 'meteor/react-meteor-data';

const NewOrder = ({ history, items }) => (
  <div className="NewOrder">
    <h4 className="page-header">New Order</h4>
    <OrderEditor history={history} items={items}/>
  </div>
);

NewOrder.propTypes = {
  history: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker(({ match }) => {
  const menuSubscription = Meteor.subscribe('menuItems');

  return {
    loading: !menuSubscription.ready(),
    items: MenuItems.find().fetch(),    
  };
})(NewOrder);