import { Link } from 'expo-router';
import { Card, Image, Paragraph, Text, YStack } from 'tamagui';
import { Result } from '~/interfaces/apiResults';

const header = process.env.EXPO_PUBLIC_HEADER_KEY;
const fallImg = 'https://pbs.twimg.com/media/GvXufs-XkAAFRYv?format=jpg&name=small';

type MovieCardProps = { movie: Result };

//add tv type
const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/(drawer)/home/movie/${movie.id}`} asChild>
      <Card
        elevate
        width={150}
        height={280}
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.975 }}
        animation={'bouncy'}
        backgroundColor={'#030b2e'}>
        <Card.Header p={0}>
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : fallImg,
            }}
            alt={movie.title}
            style={{ width: 150, height: 200 }}
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
