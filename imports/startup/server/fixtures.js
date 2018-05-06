import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Orders from '../../api/Orders/Orders';
import MenuItems from '../../api/MenuItems/MenuItems'

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

const ordersSeed = userId => ({
  collection: Orders,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 5,
  model(dataIndex) {
    return {
      owner: userId,
      location: `Location for order number : #${dataIndex + 1}`,
      comments: `This is the description of order #${dataIndex + 1}`,
      menuItem: MenuItems.find().first,
    };
  },
});


seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      return ordersSeed(userId);
    },
  }],
  modelCount: 5,
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
  },
});
