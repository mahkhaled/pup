import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Orders from '../../../../api/Orders/Orders';
import OrderEditor from '../../../components/OrderEditor/OrderEditor';
import NotFound from '../../NotFound/NotFound';

const EditOrder = ({ doc, history }) => (doc ? (
  <div className="EditOrder">
    <h4 className="page-header">{`Editing "${doc.title}"`}</h4>
    <OrderEditor doc={doc} history={history} />
  </div>
) : <NotFound />);

EditOrder.defaultProps = {
  doc: null,
};

EditOrder.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const orderId = match.params._id;
  const subscription = Meteor.subscribe('orders.edit', orderId);

  return {
    loading: !subscription.ready(),
    doc: Orders.findOne(orderId),
  };
})(EditOrder);
