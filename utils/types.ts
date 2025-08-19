import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

export type BottomTabParams = {
    Home: undefined,
    User: undefined,
    Start: undefined,
}

export type UserNavProps = BottomTabScreenProps<BottomTabParams, 'User', 'nav'>
export type HomeNavProps = BottomTabScreenProps<BottomTabParams, 'Home', 'nav'>
export type StartNavProps = BottomTabScreenProps<BottomTabParams, 'Start', 'nav'>