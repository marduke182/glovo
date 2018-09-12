import glovoClient from '@/shared/libs/glovoClient';

import mapStore from './mapStore';

export default async (category) => {
  const { data, error } = await glovoClient.get(`stores?category=${category}`);

  if (error) {
    return { error };
  }

  return {
    stores: data.stores.map(mapStore)
  };
}
