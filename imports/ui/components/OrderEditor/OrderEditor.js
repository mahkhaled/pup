/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class OrderEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        location: {
          required: true,
        },
        comments: {
          required: false,
        },
        menuItem: {
          required: true,
        }
      },
      messages: {
        location: {
          required: 'Hey, telepathy will not work here, we need to know where the hell are you hiding.',
        },        
        menuItem: {
          required: "You have to choose an item",
        }
      },
      submitHandler() { component.handleSubmit(component.form); },
    });

    this.state = {
      selectedMenuItem: '',
    }
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingOrder = this.props.doc && this.props.doc._id;
    const methodToCall = existingOrder ? 'orders.update' : 'orders.insert';
    const doc = {
      location: form.location.value.trim(),
      comments: form.comments.value.trim(),
      menuItem: form.menuItem.value,
    };

    if (existingOrder) doc._id = existingOrder;

    Meteor.call(methodToCall, doc, (error, orderId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingOrder ? 'Order updated!' : 'Order added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/orders/${orderId}`);
      }
    });
  }

  renderMenuItemsDropdown(menuItems, doc) {
    return (      
      <select 
          name="menuItem" 
          className="form-control"            
          placeholder="select">
        { 
          menuItems.map(item => (
            <option key={item._id} value={item.name} selected={doc.menuItem == item.name}>{item.name}</option>
          )) 
        }
      </select>      
    );
  }

  render() {
    const { doc, items } = this.props;
    return (      
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}> 
        <FormGroup>
          <ControlLabel>Select Item : </ControlLabel>          
          {this.renderMenuItemsDropdown(items, doc)}                     
        </FormGroup>        

        <FormGroup>
          <ControlLabel>Location</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="location"
            defaultValue={doc && doc.location}
            placeholder="Where the hell are you hiding ?!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Comments</ControlLabel>
          <textarea
            className="form-control"
            name="comments"
            defaultValue={doc && doc.comments}
            placeholder="Any special orders ?! talabat seyadtak awamer !"
          />
        </FormGroup>
        <Button type="submit" bsStyle="success">
          {doc && doc._id ? 'Save Changes' : 'Add Order'}
        </Button>
      </form>
    );
  }
}

OrderEditor.defaultProps = {
  doc: { location: '', comments: '', menuItem: ''}, 
  items: [] 
};

OrderEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrderEditor;
