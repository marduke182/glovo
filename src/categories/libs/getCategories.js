import glovoClient from '@/shared/libs/glovoClient';
import zipObject from 'lodash/fp/zipObject';
import getStores from '@/stores/libs/getStores';

export default async () => {
  const { data, error } = await glovoClient.get(`/categories`);

  if (error) {
    return error;
  }

  const { categories } = data;

  const categoriesNames = categories.map(({ name }) => name);

  // Retrieve all stores, to calculate sleepy category
  const storesPromises = categoriesNames.map(name => getStores(name));
  const storesOfCategories = await Promise.all(storesPromises);

  const someError = storesPromises.find(({ error }) => !!error);
  if (someError) {
    return {
      error: 'Error retrieving the stores',
    }
  }

  const someStoreOpened = storesOfCategories.map((stores) => stores.some(({storeIsOpen}) => storeIsOpen));

  // Some store is opened
  const openedCategory = zipObject(categoriesNames, someStoreOpened);


  const categoriesWithSleepy = categories.map(category => ({
    ...category,
    sleepy: !openedCategory[category.name],
  }));

  return {
    categories: categoriesWithSleepy,
  };
}
