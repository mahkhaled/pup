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
        title: {
          required: true,
        },
        body: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        body: {
          required: 'This thneeds a body, please.',
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
      title: form.title.value.trim(),
      body: form.body.value.trim(),
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
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={doc && doc.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Body</ControlLabel>
          <textarea
            className="form-control"
            name="body"
            defaultValue={doc && doc.body}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
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
  doc: { title: '', body: '' },
};

OrderEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default OrderEditor;
