/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { IJob } from './constants/interface'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: undefined
  Modal: undefined
  NotFound: undefined
  SignIn: undefined
  SignUp: undefined
  Home: NavigatorScreenParams<RootTabParamList> | undefined
  InfoCandidate: undefined
  CCreateEducation: { id?: number }
  CCreateInfo: undefined
  CCreateExp: { id?: number }
  CCreateSkill: { id?: number }
  SearchResult: { jobs: IJob[] } | undefined
  CVSScreen: undefined
  JobDetailScreen: { id: number }
  Splash: undefined
  JobList: undefined
  CompanyList: { id: number }
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  RootTab: undefined
  List: undefined
  CV: undefined
  JobList: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>
