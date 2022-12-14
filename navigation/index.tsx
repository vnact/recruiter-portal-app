/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, Entypo, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ColorSchemeName, Pressable } from 'react-native'

import Colors, { blackColor, mainColor, whiteColor } from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import RootScreen from '../screens/LoginScreen/RootScreen'
import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import SignInScreen from '../screens/LoginScreen/SignInScreen'
import SignUpScreen from '../screens/LoginScreen/SignUpScreen'
import HomeScreen from '../screens/Home/HomeScreen'

import InfoCandidateScreen from '../screens/InfoScreen/InfoCandidateScreen'
import { CCreateEducationScreen } from '../screens/InfoScreen/CCreateEducationScreen'
import CCreateInfoScreen from '../screens/InfoScreen/CCreateInfoScreen'
import { CCreateExpScreen } from '../screens/InfoScreen/CCreateExpScreen'
import { CCreateSkillScreen } from '../screens/InfoScreen/CCreateSkillScreen'
import { SearchResultScreen } from '../screens/SearchScreen/SearchScreen'
import CVScreen from '../screens/InfoScreen/CVScreen'
import { JobDetailScreen } from '../screens/JobDetailScreen/JobDetailScreen'
import { selectIsLoggedIn, selectLoading } from '../reducers/authSlice'
import { useAppDispatch, useAppSelector } from '../app/hook'
import SplashScreen from '../screens/SplashScreen'
import ListJobScreen from '../screens/ListJobScreen/ListJobScreen'
import { GetSelfAction } from '../reducers/userSlice'
import { ListJobCompanyScreen } from '../screens/CompanyScreen/ListJobCompanyScreen'
import { useEffect } from 'react'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const loading = useAppSelector(selectLoading)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(GetSelfAction())
  }, [])

  if (loading == 'loading') {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, animation: 'none' }} />
      </Stack.Navigator>
    )
  }
  return (
    <Stack.Navigator>
      {!(isLoggedIn && loading === 'success') ? (
        <>
          <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Screen name="InfoCandidate" component={InfoCandidateScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CCreateEducation" component={CCreateEducationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CCreateInfo" component={CCreateInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CCreateExp" component={CCreateExpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CCreateSkill" component={CCreateSkillScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SearchResult" component={SearchResultScreen} options={{ headerShown: true }} />
          <Stack.Screen name="CVSScreen" component={CVScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="CompanyList"
            component={ListJobCompanyScreen}
            options={{ headerShown: true, title: 'C??ng vi???c t???i c??ng ty' }}
          />
          <Stack.Screen
            name="JobDetailScreen"
            component={JobDetailScreen}
            options={{
              // headerStyle: {
              //   backgroundColor: whiteColor,
              // },
              // headerTintColor: blackColor,
              headerShown: false,
              // headerBackTitle: '',
              // headerLeft: () => <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />,
            }}
          />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const color = '#59CE8F'
  return (
    <BottomTab.Navigator
      initialRouteName="RootTab"
      screenOptions={{
        tabBarActiveTintColor: mainColor,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: whiteColor,
        },
        headerStyle: { backgroundColor: whiteColor },
      }}
    >
      <BottomTab.Screen
        name="JobList"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'JobList'>) => ({
          title: 'Vi???c l??m',
          headerTitleAlign: 'center',
          headerTintColor: '#333333',
          // tabBarLabelStyle: { color: mainColor },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase-variant-outline" size={28} color={color} />
          ),
          headerLeft: () => (
            <Feather
              name="bell"
              size={25}
              style={{
                marginLeft: 20,
              }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="CV"
        component={InfoCandidateScreen}
        options={{
          headerShown: false,
          headerTintColor: '#333333',
          title: 'H??? s??',
          tabBarIcon: ({ color }) => <AntDesign name="idcard" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="List"
        component={ListJobScreen}
        options={{
          headerShown: false,
          headerTintColor: '#333333',
          title: 'Danh s??ch',
          tabBarIcon: ({ color }) => <Entypo name="list" size={28} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>['name']; color: string }) {
  return <Feather size={25} style={{ marginBottom: -3 }} {...props} />
}
