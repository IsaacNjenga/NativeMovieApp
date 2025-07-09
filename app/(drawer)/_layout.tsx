import { colorTokens } from '@tamagui/themes';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'MovieApp',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favourites"
        options={{
          title: 'My Favourites',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default Layout;
