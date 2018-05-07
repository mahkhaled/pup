/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Locations = new Mongo.Collection('Locations');

Locations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Locations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Locations.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'The name of the location',
  },
});

Locations.attachSchema(Locations.schema);

export default Locations;
