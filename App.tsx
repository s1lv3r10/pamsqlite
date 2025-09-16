import { useEffect, useCallback, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SplashScreen from 'expo-splash-screen';

import Home from './components/Home';
import Start from './components/Start';

import { BottomTabParams } from './utils/types';
import { ContainerStyles, MainTheme, ThemeType } from './utils/styles';

const Stack = createBottomTabNavigator<BottomTabParams, 'Nav'>();

// 🔥 Componente do Header com Logo + Texto
function HeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('./img/logo.png')}
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
      <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
        Entre Folhas
      </Text>
    </View>
  );
}

function RootStack() {
  const theme = useTheme<ThemeType>();

  return (
    <Stack.Navigator
      id="Nav"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.azulPrincipal,
          height: 85,
        },
        headerTintColor: theme.colors.onPrimary ?? '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerTitleAlign: 'center',
        headerTitle: () => <HeaderTitle />,

        tabBarStyle: {
          backgroundColor: theme.colors.azulPrincipal,
          height: 70,
        },
        tabBarActiveTintColor: theme.colors.onPrimary ?? '#fff',
        tabBarInactiveTintColor: theme.colors.onPrimary ?? '#fff',
        tabBarItemStyle: {
          alignItems: 'center',
          margin: 5,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Livros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-blank-variant" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen 
        name='Start'
        component={Start}
        options={{
          title: 'Usuários',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

// ⏳ Splash control
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Simula carregamento de recursos (ex: fontes, dados)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAppReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null; // Splash continua visível
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <PaperProvider theme={MainTheme}>
          <RootStack />
        </PaperProvider>
      </NavigationContainer>
    </View>
  );
}
