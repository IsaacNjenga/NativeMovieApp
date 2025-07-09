import { Stack } from 'expo-router';
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
      <Stack.Screen name="movie/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
      <Stack.Screen name="tv/[id]" options={{ title: '', headerBackTitle: 'Back' }} />
    </Stack>
  );
};

export default Layout;
