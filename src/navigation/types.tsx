import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type MainStackParamList = {
  Home: undefined;
  Camera: undefined;
  Formulario: undefined;
  Detalhes: undefined;
  Mapa: undefined;
};

export type ProfileStackParamList = { PerfilHome: undefined };
export type OthersStackParamList  = { OutrosHome: undefined };

export type RootTabParamList = {
  Main:   NavigatorScreenParams<MainStackParamList>;
  Perfil: NavigatorScreenParams<ProfileStackParamList>;
  Outros: NavigatorScreenParams<OthersStackParamList>;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
export type RootTabScreenProps<T extends keyof RootTabParamList> =
  BottomTabScreenProps<RootTabParamList, T>;
