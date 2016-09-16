import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Categories } from '../imports/api/categories.js';
import { Brands } from '../imports/api/brands.js';
import { Products } from '../imports/api/products.js';
import { Carts } from '../imports/api/carts.js';
import { Orders } from '../imports/api/orders.js';
import { Colors } from '../imports/api/colors.js';
import { Sizes } from '../imports/api/sizes.js';

Meteor.publish('categories', () => {
  return Categories.find({});
});

Meteor.publish('brands', () => {
  return Brands.find({});
});

Meteor.publish('products', () => {
  return Products.find({});
});

Meteor.publish('carts', () => {
  return Carts.find({});
});

Meteor.publish('orders', () => {
  return Orders.find({});
});

Meteor.publish('colors', () => {
  return Colors.find({});
});

Meteor.publish('sizes', () => {
  return Sizes.find({});
});

Meteor.publish('users', () => {
  return Meteor.users.find({});
});