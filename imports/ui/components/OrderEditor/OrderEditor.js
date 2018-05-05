/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
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
        description: {
          required: true,
        },
      },
      messages: {
        location: {
          required: 'Hey, telepathy will not work here, we need to know where the hell are you hiding.',
        },
        description: {
          required: "Well, I'm not your Mom! you need to say what you want exactly !!",
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingOrder = this.props.doc && this.props.doc._id;
    const methodToCall = existingOrder ? 'orders.update' : 'orders.insert';
    const doc = {
      location: form.location.value.trim(),
      description: form.description.value.trim(),
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

  render() {
    const { doc } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>        
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <textarea
            className="form-control"
            name="description"
            defaultValue={doc && doc.description}
            placeholder="Tell me exactly what you want . We won't take 'Ay 7aga' as an answer ! "
          />
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
        <Button type="submit" bsStyle="success">
          {doc && doc._id ? 'Save Changes' : 'Add Order'}
        </Button>
      </form>
    );
  }
}

OrderEditor.defaultProps = {
  doc: { location: '', description: '' },
};

OrderEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default OrderEditor;
