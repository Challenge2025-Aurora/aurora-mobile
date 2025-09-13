import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes, type RootStackParamList } from "./routes";
import { useStackOptions } from "./useStackOptions";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const screenOptions = useStackOptions();

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      {routes.map(r => (
        <Stack.Screen
          key={r.name}
          name={r.name}
          component={r.component}
          options={r.title ? { title: r.title } : undefined}
        />
      ))}
    </Stack.Navigator>
  );
}
