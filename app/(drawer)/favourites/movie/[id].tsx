import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import DetailsPage from '~/components/detailsPage';
import { MediaType } from '~/interfaces/apiResults';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};

export default Page;
