import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Orders from '../../api/Orders/Orders';
import MenuItems from '../../api/MenuItems/MenuItems';
import SampleHistoricalOrders from './hackathon_orderes_data.json';
import moment from 'moment';

const allPlaces = ["1st Floor, Hall", "1st Floor, Room 1", "1st Floor, Room 3", "1st Floor, Meeting Room", "4th Floor, Comfy zone"];

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

const selectRandomLocation = () => {
  const index = Math.floor(Math.random() * allPlaces.length);
  return allPlaces[index];
}

const getSampleOrders = userId => {
  return SampleHistoricalOrders.orders.map(sampleOrder => ({
    owner: userId,
    deliveredTimestamp: moment(sampleOrder.delivered_at, 'YYYY-MM-DD HH:mm:ss Z').format('x'),    
    location: selectRandomLocation(),
    delivered: true,
    creationTimestamp: moment(sampleOrder.created_at, 'YYYY-MM-DD HH:mm:ss Z').format('x'),
    comments: 'n/a',
    menuItem: sampleOrder.item,
    ownerName: 'Agent 1',
  }))
}

const ordersSeed = userId => ({
  collection: Orders,
  environments: ['development', 'staging'],
  noLimit: false,
  data: getSampleOrders(userId),
});


seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@c.o',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin']
  },{
    email: 'user1@c.o',
    password: '123456',
    profile: {
      name: {
        first: 'Sample',
        last: 'User 1',
      },
    },
    roles: [],
    data(userId) {
      return ordersSeed(userId);
    },
  },{
    email: 'user2@c.o',
    password: '123456',
    profile: {
      name: {
        first: 'Sample',
        last: 'User 2',
      },
    },
    roles: [],
  },{
    email: 'officeboy1@c.o',
    password: '123456',
    profile: {
      name: {
        first: 'Office',
        last: 'Boy1',
      },
    },
    roles: ['office-boy'],
  },{
    email: 'officeboy2@c.o',
    password: '123456',
    profile: {
      name: {
        first: 'Office',
        last: 'Boy2',
      },
    },
    roles: ['office-boy']
  }],
  /*modelCount: 5,
  model(index, faker) {
    const userCount = index + 1;
    return {
      email: `user+${userCount}@test.com`,
      password: 'password',
      profile: {
        name: {
          first: faker.name.firstName(),
          last: faker.name.lastName(),
        },
      },
      roles: ['user'],
      data(userId) {
        return ordersSeed(userId);
      },
    };
  },*/
});
