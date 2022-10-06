/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  SignIn: undefined
  SignUp: undefined
  Home: undefined
  InfoCandidate: undefined
  CCreateEducation: undefined
  CCreateInfo: undefined
  CCreateExp: undefined
  CCreateSkill: undefined
<<<<<<< HEAD
  Search: undefined
=======
  CVSScreen: undefined
<<<<<<< HEAD
>>>>>>> 2cce46910487b1b4733a1c166c9e6c1e1bab5379
=======
  JobDetailScreen: undefined
>>>>>>> 48cc865 (feat:job detail)
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
  Home: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
