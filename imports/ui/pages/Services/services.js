import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
//TODO-SERVICES : Create a services API
import ServicesCollection from '../../../api/Services/Services';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledServices = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (orderId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('orders.remove', orderId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Order deleted!', 'success');
      }
    });
  }
};

const Orders = ({
  loading, orders, match, history,
}) => (!loading ? (
  <StyledOrders>
    <div className="page-header clearfix">
      <h4 className="pull-left">Orders</h4>
      <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Order</Link>
    </div>
    {orders.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Location</th>
            <th>Description</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map(({
            _id, location, createdAt, comments,
          }) => (
            <tr key={_id}>
              <td>{location}</td>
              <td>{description}</td>
              <td>{timeago(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="You're plum out of orders, friend!"
        subtitle="Add your first order by clicking the button below."
        action={{
          style: 'success',
          onClick: () => history.push(`${match.url}/new`),
          label: 'Create Your First Order',
        }}
      />}
  </StyledOrders>
) : <Loading />);

Orders.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('services');
  return {
    loading: !subscription.ready(),
    orders: OrdersCollection.find().fetch(),
  };
})(Orders);
