import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from 'tamagui';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Layout = () => {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.red9.get() },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'My Favourites',
          headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        }}
      />
    </Stack>
  );
};

export default Layout;
