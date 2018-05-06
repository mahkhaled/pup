import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Orders from '../../../../api/Orders/Orders';
import SEO from '../../../components/SEO/SEO';
import NotFound from '../../NotFound/NotFound';

const handleRemove = (orderId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('orders.remove', orderId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Order deleted!', 'success');
        history.push('/orders');
      }
    });
  }
};

const renderOrder = (doc, match, history) => (doc ? (
  <div className="ViewOrder">
    <SEO
      title={doc.comments}
      description={doc.comments}
      url={`orders/${doc._id}`}
      contentType="article"
      published={doc.createdAt}
      updated={doc.updatedAt}
      twitter="clvrbgl"
    />
    <div className="page-header clearfix">
      <h4 className="pull-left">
        { doc && doc.menuItem }            
      </h4>
      {Meteor.isClient && doc.owner == Meteor.userId() && !doc.delivered ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { doc.ownerName }
    { " - " }
    { doc && doc.location }
    <br/>
    <br/>
    <b>comments : </b>
    { doc && doc.comments }
  </div>
) : <NotFound />);

const ViewOrder = ({ doc, match, history }) => (renderOrder(doc, match, history));

ViewOrder.defaultProps = {
  doc: null,
};

ViewOrder.propTypes = {
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const orderId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('orders.view', orderId);

    return {
      doc: Orders.findOne(orderId),
    };
  }),
)(ViewOrder);
