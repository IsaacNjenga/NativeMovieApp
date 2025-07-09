import { View, Text } from 'react-native';
import React from 'react';
import { Container, Title } from '~/tamagui.config';
import { Favorite } from '~/interfaces/favourites';
import { useMMKVObject } from 'react-native-mmkv';
import { Image, ListItem, Main, ScrollView } from 'tamagui';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';

const Page = () => {
  const [favourites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  return (
    <Main>
      <Container>
        <ScrollView>
          {favourites?.map((fav) => (
            <Link
              href={{
                pathname:
                  fav.mediaType === 'movie'
                    ? '/(drawer)/favourites/movie/[id]'
                    : '/(drawer)/favourites/tv/[id]',
                params: { id: fav.id.toString() },
              }}
              asChild>
              <ListItem
                theme={'alt2'}
                backgroundColor={'#fff'}
                title={fav.name}
                size={'$4'}
                icon={() => (
                  <Animated.Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${fav.thumb}` }}
                    style={{ width: 50, height: 50 }}
                    sharedTransitionTag={`${fav.mediaType === 'movie' ? 'movie' : 'tv'}-${fav.id}`}
                  />
                )}
                pressStyle={{ backgroundColor: '#f0f0f0' }}
                ></ListItem>{' '}
            </Link>
          ))}
        </ScrollView>
      </Container>
    </Main>
  );
};

export default Page;
