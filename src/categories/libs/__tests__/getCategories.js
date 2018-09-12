import glovoClient from '../../../shared/libs/glovoClient';
import getCategories from '../getCategories';
import * as getStores from '../../../stores/libs/getStores';

jest.mock('../../../shared/libs/glovoClient');
jest.mock('../../../stores/libs/getStores');

const categoriesResponse = {
  "categories":[
    {
      "id":3,
      "label":"Snacks",
      "name": "snacks",
      "openIcon":"http://localhost:3000/img/snacks-open.png",
      "sleepIcon":"http://localhost:3000/img/snacks-sleep.png"
    },
    {
      "id":2,
      "label":"Gifts",
      "name": "gifts",
      "openIcon":"http://localhost:3000/img/gifts-open.png",
      "sleepIcon":"http://localhost:3000/img/gifts-sleep.png"
    },
    {
      "id":1,
      "label":"Restaurants",
      "name": "restaurants",
      "openIcon":"http://localhost:3000/img/restaurants-open.png",
      "sleepIcon":"http://localhost:3000/img/restaurants-sleep.png"
    },
    {
      "id":4,
      "label":"Wonders",
      "name": "wonders",
      "openIcon":"http://localhost:3000/img/wonders-open.png",
      "sleepIcon":"http://localhost:3000/img/wonders-sleep.png"
    }
  ]
};

const stores = {
  snacks: [
    {
      storeIsOpen: true,
    }
  ],
  gifts: [
    {
      storeIsOpen: true,
    }
  ],
  restaurants: [
    {
      storeIsOpen: true,
    }
  ],
  wonders: [
    {
      storeIsOpen: false,
    }
  ]
};

const categoriesExpected = {
  "categories":[
    {
      "id":3,
      "label":"Snacks",
      "name": "snacks",
      "openIcon":"http://localhost:3000/img/snacks-open.png",
      "sleepIcon":"http://localhost:3000/img/snacks-sleep.png",
      "sleepy": false,
    },
    {
      "id":2,
      "label":"Gifts",
      "name": "gifts",
      "openIcon":"http://localhost:3000/img/gifts-open.png",
      "sleepIcon":"http://localhost:3000/img/gifts-sleep.png",
      "sleepy": false,
    },
    {
      "id":1,
      "label":"Restaurants",
      "name": "restaurants",
      "openIcon":"http://localhost:3000/img/restaurants-open.png",
      "sleepIcon":"http://localhost:3000/img/restaurants-sleep.png",
      "sleepy": false,
    },
    {
      "id":4,
      "label":"Wonders",
      "name": "wonders",
      "openIcon":"http://localhost:3000/img/wonders-open.png",
      "sleepIcon":"http://localhost:3000/img/wonders-sleep.png",
      "sleepy": true,
    }
  ]
};

test('should return categories with sleepy property', async () => {
  jest.spyOn(getStores, 'default').mockImplementation(async (category) => ({ stores: stores[category]}));
  glovoClient.get.mockImplementation(async () => ({ data: categoriesResponse }));

  expect(getCategories()).resolves.toEqual(categoriesExpected);
});
