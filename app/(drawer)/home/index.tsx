import { ImageBackground } from 'react-native';
import { Input, Main, ScrollView, Spinner, YStack } from 'tamagui';
import { Container, Subtitle, Title } from '~/tamagui.config';
import { useQuery } from '@tanstack/react-query';
import { discoverList, getList, searchList } from '~/services/api';
import { useState } from 'react';
import MovieCard from '~/components/MovieCard';
import useDebounce from '~/utils/useDebounce';
import { Result } from '~/interfaces/apiResults';

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);

  const listQuery = useQuery({ queryKey: ['list'], queryFn: getList });
  const discoverQuery = useQuery({ queryKey: ['discoverList'], queryFn: discoverList });
  const searchQuery = useQuery<{ results: Result[] }>({
    queryKey: ['searchList', debouncedString],
    queryFn: () => searchList(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main>
      <ImageBackground
        source={{ uri: 'https://pbs.twimg.com/media/GvSDwPiXwAAAN4L?format=jpg&name=small' }}
        style={{ width: '100%', height: 200 }}>
        <Container>
          <YStack>
            <Title color="#fff" enterStyle={{ opacity: 0, scale: 1.5, y: -10 }} animation="quick">
              Trending
            </Title>
            <Input
              placeholder="Search..."
              placeholderTextColor="white"
              style={{ backgroundColor: 'rgba(0,0,0,0)', marginTop: 10, color: '#fff' }}
              borderWidth={2}
              size={'$4'}
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
          </YStack>
        </Container>
      </ImageBackground>
      <Subtitle p={10} animation={'lazy'} enterStyle={{ opacity: 0 }}>
        {searchQuery.data?.results ? 'Search Results: ' : 'Discover Movies'}
      </Subtitle>

      {(discoverQuery.isLoading || listQuery.isLoading) && (
        <Spinner size="large" color={'$blue10'} py={14} />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={40}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results ? (
          <>
            {searchQuery.data?.results && (
              <>
                {searchQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {discoverQuery.data?.results && (
              <>
                {discoverQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>
    </Main>
  );
};

export default Page;
