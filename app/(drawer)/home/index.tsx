import { ImageBackground } from 'react-native';
import { Input, Main, ScrollView, Spinner, YStack } from 'tamagui';
import { Container, Subtitle, Title } from '~/tamagui.config';
import { useQuery } from '@tanstack/react-query';
import { discoverMoviesList, discoverTVList, getList, searchList } from '~/services/api';
import { useState } from 'react';
import MovieCard from '~/components/MovieCard';
import useDebounce from '~/utils/useDebounce';
import { Result } from '~/interfaces/apiResults';

//type PageProps = {id:string, mediaType: MediaY};

const Page = () => {
  const [searchString, setSearchString] = useState('');
  const debouncedString = useDebounce(searchString, 300);

  const listQuery = useQuery({ queryKey: ['list'], queryFn: getList });
  const discoverMoviesQuery = useQuery({ queryKey: ['discoverList'], queryFn: discoverMoviesList });
  const discoverTVQuery = useQuery({ queryKey: ['discoverTVList'], queryFn: discoverTVList });
  const searchQuery = useQuery<{ results: Result[] }>({
    queryKey: ['searchList', debouncedString],
    queryFn: () => searchList(debouncedString),
    enabled: debouncedString.length > 0,
  });

  return (
    <Main>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=900&auto=format&fit=crop&q=60',
        }}
        style={{ width: '100%', height: 250, backdropFilter: 'blur(4px)' }}>
        <Container>
          <YStack backgroundColor={'rgba(0,0,0,0.4)'} borderRadius={16} p={5}>
            <Title
              color="#fff"
              enterStyle={{ opacity: 0, scale: 1.5, y: -10 }}
              animation="quick"
              borderRadius={16}
              p={10}>
              Movies & TV
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

      {(discoverMoviesQuery.isLoading || searchQuery.isLoading) && (
        <Spinner size="large" color={'$blue10'} py={14} />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={10}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}
        backgroundColor={'$background'}>
        {searchQuery.data?.results ? (
          <>
            {searchQuery.data?.results && (
              <>
                {searchQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} mediaType="movie" />
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {discoverMoviesQuery.data?.results && (
              <>
                {discoverMoviesQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} mediaType="movie" />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <Subtitle p={10} animation={'lazy'} enterStyle={{ opacity: 0 }}>
        {searchQuery.data?.results ? 'Search Results: ' : 'Discover TV'}
      </Subtitle>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        py={10}
        contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
        {searchQuery.data?.results ? (
          <>
            {searchQuery.data?.results && (
              <>
                {searchQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} mediaType="tv" />
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {discoverTVQuery.data?.results && (
              <>
                {discoverTVQuery.data?.results.map((item) => (
                  <MovieCard key={item.id} movie={item} mediaType="tv" />
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
