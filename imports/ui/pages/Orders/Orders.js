import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import OrdersCollection from '../../../api/Orders/Orders';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';
import OrdersList from '../../components/Orders/OrdersList';
import { Roles } from 'meteor/alanning:roles';

const StyledOrders = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const Orders = ({
  loading, ordersInProgress, oldOrders, match, history, blankIcon
}) => (!loading ? (
  <StyledOrders>
    <div className="page-header clearfix">
      <h4 className="pull-left">Orders In Progress</h4>
      {
        Roles.userIsInRole(Meteor.userId(), ['office-boy']) ?
          ""
        :
          <Link className="btn btn-success pull-right" to={`${match.url}/new`}>Add Order</Link>
      }
      
    </div>
    {
      ordersInProgress.length ?
          <OrdersList
            orders={ordersInProgress}
            showActionButtons={true}
            history={history}
            match={match}
          />    
       :          
         Roles.userIsInRole(Meteor.userId(), ['office-boy']) ?
          <BlankState
            icon={{ style: 'solid', symbol: 'smile' }}
            title="Wohoaaa, we have no more!"
            subtitle="You can take some well deserved rest."            
          />
         :
          <BlankState
            icon={{ style: 'solid', symbol: 'utensils' }}
            title="Yesss, it's snack time!"
            subtitle="Let's fill your energy tanks up."
            action={{
              style: 'success',
              onClick: () => history.push(`${match.url}/new`),
              label: 'I need my snack',
            }}
          />
    }     
    <div className="page-header clearfix">
      <h4 className="pull-left">Delivered Orders</h4>      
    </div>
    {     
      <OrdersList
        orders={oldOrders}
        showActionButtons={false}
        history={history}
        match={match}
      /> 
    }
  </StyledOrders>
) : <Loading />);

Orders.propTypes = {
  loading: PropTypes.bool.isRequired,
  ordersInProgress: PropTypes.arrayOf(PropTypes.object).isRequired,
  oldOrders: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('orders');
  return {
    loading: !subscription.ready(),
    ordersInProgress: OrdersCollection.find({delivered:false}).fetch(),
    oldOrders: OrdersCollection.find({delivered:true}).fetch(),
  };
})(Orders);
