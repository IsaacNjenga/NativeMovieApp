import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { Card, Paragraph, Text, YStack } from 'tamagui';
import { Result } from '~/interfaces/apiResults';

const fallImg = 'https://pbs.twimg.com/media/GvXufs-XkAAFRYv?format=jpg&name=small';

type MovieCardProps = { movie: Result; mediaType: 'movie' | 'tv' };

const MovieCard = ({ movie, mediaType }: MovieCardProps) => {
  return (
    <Link
      href={{
        pathname: `/(drawer)/home/${mediaType === 'movie' ? 'movie' : 'tv'}/[id]`,
        params: { id: movie.id.toString() },
      }}
      asChild>
      <Card
        elevate
        width={180}
        height={300}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation={'bouncy'}
        backgroundColor={'#030b2e'}>
        <Card.Header p={0}>
          <Animated.Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : fallImg,
            }}
            alt={movie.title}
            style={{ width: 180, height: 200 }}
            sharedTransitionTag={`${movie.media_type === 'movie' ? 'movie' : 'tv'}-${movie.id}`}
          />
        </Card.Header>
        <Card.Footer p={10}>
          <YStack>
            <Text fontSize={20} color={'lightblue'}>
              {movie.title || movie.name}
            </Text>
            <Paragraph theme={'alt2'}>
              {new Date(movie.release_date! || movie.first_air_date!).getFullYear()}
            </Paragraph>
          </YStack>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default MovieCard;
