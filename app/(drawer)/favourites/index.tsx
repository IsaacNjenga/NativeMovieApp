import { View, Text } from 'react-native';
import React from 'react';
import { Title } from '~/tamagui.config';
import { Favorite } from '~/interfaces/favourites';
import { useMMKVObject } from 'react-native-mmkv';

const Page = () => {
  const [favourites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  return (
    <View>
      <Title>Favourites</Title>
    </View>
  );
};

export default Page;
