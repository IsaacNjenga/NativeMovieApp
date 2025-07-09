import { ImageBackground } from 'react-native';
import { MediaType } from '~/interfaces/apiResults';
import { useQuery } from '@tanstack/react-query';
import { getMovieDetails } from '~/services/api';
import { Main, ScrollView, H1, YStack, Text, Paragraph, Button, useTheme } from 'tamagui';
import Animated from 'react-native-reanimated';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { Favorite } from '~/interfaces/favourites';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type DetailsPageProps = { id: string; mediaType: MediaType };

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
  const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
  const [favourites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
  const theme = useTheme();

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(+id, mediaType),
  });

  const toggleFavorite = () => {
    const current = favourites || [];
    if (!isFavorite) {
      setFavorites([
        ...current,
        {
          id,
          mediaType,
          thumb: movieQuery.data?.poster_path,
          name: movieQuery.data?.name || movieQuery.data?.title,
        },
      ]);
    } else {
      setFavorites(current.filter((item) => item.id !== id || item.mediaType !== mediaType));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <Main>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={toggleFavorite}
              background={'rgba(0, 0, 0, 0)'}
              unstyled
              borderColor={'rgba(0,0,0,0)'}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                scale={0.95}
                color={isFavorite ? theme.red9.get() : '#fff'}
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.975 }}
                animation={'bouncy'}
              />
            </Button>
          ),
        }}
      />
      <ScrollView>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w400${movieQuery.data?.backdrop_path}`,
          }}>
          <Animated.Image
            source={{ uri: `https://image.tmdb.org/t/p/w200${movieQuery.data?.poster_path}` }}
            style={{ width: 200, height: 300, margin: 10 }}
            borderRadius={6}
            sharedTransitionTag={`${movieQuery.data?.media_type === 'movie' ? 'movie' : 'tv'}-${movieQuery.data?.id}`}
          />
        </ImageBackground>
        <YStack
          p={10}
          animation={'lazy'}
          enterStyle={{ opacity: 0, y: 10 }}
          exitStyle={{ opacity: 0 }}>
          <H1 color={'$blue7'}>
            {movieQuery.data?.title || movieQuery.data?.name}{' '}
            <Text color={'$blue7'}>
              (
              {new Date(
                movieQuery.data?.release_date || movieQuery.data?.first_air_date
              ).getFullYear()}
              )
            </Text>
          </H1>
          <Paragraph theme={'alt2'}>
            {movieQuery.data?.tagline || 'No tagline available.'}
          </Paragraph>
          <Text fontSize={16}>{movieQuery.data?.overview}</Text>
        </YStack>
      </ScrollView>
    </Main>
  );
};

export default DetailsPage;
