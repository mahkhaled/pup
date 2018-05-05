import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';


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

const handleDelivered = (orderId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('orders.deliver', orderId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Order delivered!', 'success');
      }
    });
  }
};

const OrdersList = ({
  orders, showActionButtons, match, history
}) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Location</th>
        <th>
        {
          Roles.userIsInRole(Meteor.userId(), ['office-boy']) ?
            'Requester'
          :
            ''
        }
        </th>
        <th>Description</th>
        <th>Created</th>
        <th />
        <th />
      </tr>
    </thead>
    <tbody>
      {orders.map(({
        _id, location, ownerName, delivered, createdAt, description,
      }) => (
        <tr key={_id}>
          <td>{location}</td>
          <td>
          {
            Roles.userIsInRole(Meteor.userId(), ['office-boy']) ?
              ownerName
            :
              ''
          }
          </td>
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
            {                     
              !showActionButtons ?
                  ''
                :
                  Roles.userIsInRole(Meteor.userId(), ['office-boy']) ?                    
                     <Button
                        bsStyle="success"
                        onClick={() => handleDelivered(_id)}
                        disabled={delivered}
                        block >
                      Delivered
                    </Button>                  
                  :
                    <Button
                        bsStyle="danger"
                        onClick={() => handleRemove(_id)}
                        disabled={delivered}
                        block >
                      Delete
                    </Button>
            }
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

OrdersList.defaultProps = {
  orders: [],  
  showActionButtons: true,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  showActionButtons: PropTypes.bool.isRequired,
};

export default OrdersList;