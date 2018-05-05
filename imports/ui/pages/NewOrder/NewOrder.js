import React from 'react';
import PropTypes from 'prop-types';
import OrderEditor from '../../components/OrderEditor/OrderEditor';

const NewOrder = ({ history }) => (
  <div className="NewOrder">
    <h4 className="page-header">New Order</h4>
    <OrderEditor history={history} />
  </div>
);

NewOrder.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewOrder;
