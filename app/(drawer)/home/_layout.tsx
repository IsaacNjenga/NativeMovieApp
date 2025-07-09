import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { colorTokens } from '@tamagui/themes';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useTheme } from 'tamagui';

const Layout = () => {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.blue8.get() },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        options={{ title: 'Movie App', headerLeft: () => <DrawerToggleButton tintColor="#fff" /> }}
      />{' '}
      <Stack.Screen name="movie/[id]" options={{ title: '' }} />
    </Stack>
  );
};

export default Layout;
