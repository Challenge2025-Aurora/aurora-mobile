import type { ComponentType } from "react";
import HomeScreen from "../screens/HomeScreen";
import CameraScreen from "../screens/CameraScreen";
import FormularioScreen from "../screens/FormularioScreen";
import DetalhesScreen from "../screens/DetalhesScreen";
import MapaScreen from "../screens/MapaScreen";
import type { RootStackParamList } from "./types";

type RouteDef<Name extends keyof RootStackParamList> = {
  name: Name;
  component: ComponentType<any>;
  title?: string;
};

export const routes: RouteDef<keyof RootStackParamList>[] = [
  { name: "Home",       component: HomeScreen,       title: "Pátio Mottu" },
  { name: "Camera",     component: CameraScreen,     title: "Câmera" },
  { name: "Formulario", component: FormularioScreen, title: "Cadastrar Moto" },
  { name: "Detalhes",   component: DetalhesScreen,   title: "Visualizar Motos" },
  { name: "Mapa",       component: MapaScreen,       title: "Mapa do Pátio" },
] as const;
