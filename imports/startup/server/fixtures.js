import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Orders from '../../api/Orders/Orders';
import MenuItems from '../../api/MenuItems/MenuItems';
import Locations from '../../api/Locations/Locations';
import SampleHistoricalOrders from './hackathon_orderes_data.json';
import moment from 'moment';

const allPlaces = ["1st Floor, Hall", "1st Floor, Room 1", "1st Floor, Room 3", "1st Floor, Meeting Room", "4th Floor, Comfy zone"];

seeder(Locations, {
  environments: ['development', 'staging'],
  noLimit: true,
  wipe: true,
  data: allPlaces.map(placeName => ({
    name: placeName,
  })),
})

seeder(MenuItems, {
  environments: ['development', 'staging'],
  noLimit: true,
  wipe: true,
  data: [
    {name: "Tea-Red (Lipton)"},
    {name: "Tea-Green (Lipton)"},
    {name: "Nescafe"},
    {name: "Mint (Hot drink)"},
    {name: "Galaxy - hazlenut"},
    {name: "Galaxy - Dairy milk"},
    {name: "Biscuits"},
    {name: "Twinkies"},
    {name: "Nutri-Fit"},
    {name: "Lambada"},
    {name: "Snickers"},
    {name: "Chipsy (Cheese)"},
    {name: "Lays (Cheese)"},
    {name: "Green Salad"},
    {name: "Pop Corn"},
    {name: "Coffee"}, 
  ],
})

const selectLocation = (userId) => {
  const sum = userId.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const locations = Locations.find().fetch()
  const index = (sum % locations.length);
  return locations[index];
}

const getSampleOrders = (userId, index) => {
  return SampleHistoricalOrders.orders
    .filter(sampleOrder => `Agent ${index+1}` == sampleOrder.agent)
    .map(sampleOrder => ({
      owner: userId,
      deliveredTimestamp: moment(sampleOrder.delivered_at, 'YYYY-MM-DD HH:mm:ss Z').format('x'),    
      location: selectLocation(userId)._id,
      locationName: selectLocation(userId).name,
      delivered: true,
      creationTimestamp: moment(sampleOrder.created_at, 'YYYY-MM-DD HH:mm:ss Z').format('x'),
      comments: 'n/a',
      menuItem: sampleOrder.item,
      ownerName: sampleOrder.agent,
    }))
}

const ordersSeed = (userId, index) => ({
  collection: Orders,
  environments: ['development', 'staging'],
  noLimit: true,
  data: getSampleOrders(userId, index),
});


seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@c.o',
    password: '1234',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin']
  },
  {
    email: 'officeboy1@c.o',
    password: '1234',
    profile: {
      name: {
        first: 'Office',
        last: 'Boy1',
      },
    },
    roles: ['office-boy'],
  },{
    email: 'officeboy2@c.o',
    password: '1234',
    profile: {
      name: {
        first: 'Office',
        last: 'Boy2',
      },
    },
    roles: ['office-boy']
  }],
  modelCount: 50,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user${userCount}@c.o`,
      password: '1234',
      profile: {
        name: {
          first: "Agent",
          last: `${userCount}`,
        },
      },
      roles: ['user'],
      data(userId) {
        return ordersSeed(userId, index);
      },
    };
  },
});
