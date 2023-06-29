import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./screens/Authentication/Login";
import RegisterScreen from "./screens/Authentication/Register";
import RegisterDocScreen from "./screens/Authentication/RegisterDoc";
import RegisterDocPrev from "./screens/Authentication/RegisterDocPrev";
import HomeScreen from "./screens/Home";
import Perfil from "./screens/Perfil";

import { TouchableOpacity, Text } from "react-native";
import ProfileOptions from "./screens/Modal/ProfileOptions";
import ProfileData from "./screens/Perfil/ProfileData";
import SubPatologyScreen from "./screens/principal/SubPatologyScreen";
import ServiciosScreen from "./screens/principal/ServiciosScreen";
import EspecialidadesScreen from "./screens/principal/Med/EspecialidadesScreen";
import OnBoarding from "./screens/OnBoarding/OnBoarding";
import PreviewScreen from "./screens/Authentication/PreviewScreen";
import PacientesScreen from "./screens/principal/Med/Menu/PacientesScreen";
import PacienteDetailScreen from "./screens/principal/Med/Menu/PacienteDetailScreen";
import HistorialPacienteScreen from "./screens/principal/Med/Menu/HistorialPacienteScreen";
import Register1Screen from "./screens/Authentication/Register1";
import Login1Screen from "./screens/Authentication/Login1";
import Chat from "./screens/Chat/Chat";
import OfertasScreen from "./screens/principal/Med/Menu/OfertasScreen";
import NuevaOfertaScreen from "./screens/principal/Med/Menu/NuevaOfertaScreen";
import ServiciosProfScreen from "./screens/principal/ServiciosProfScreen";
import VerOfertaScreen from "./screens/principal/Med/Menu/VerOfertaScreen";
import EspecialidadesCScreen from "./screens/principal/EspecialidadesCScreen";
import OfertasDuplicarScreen from "./screens/principal/Med/Menu/OfertasDuplicarScreen";
import DuplicarOfertaScreen from "./screens/principal/Med/Menu/DuplicarOfertaScreen";
import PublicacionScreen from "./screens/principal/PublicacionScreen";
import InfoDuplicarScreen from "./screens/principal/Med/Menu/InfoDuplicarScreen";
import ComprasScreen from "./screens/principal/ComprasScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
    // function DrawerNavigator() {
    //     return (
    //         <Drawer.Navigator>
    //             <Drawer.Screen
    //                 name="HomeDrawer"
    //                 component={HomeScreen}
    //                 options={{ headerShown: false, title: "Inicio" }}
    //             />
    //             <Drawer.Screen
    //                 name="Perfil"
    //                 component={Perfil}
    //                 options={{ headerShown: false }}
    //             />
    //         </Drawer.Navigator>
    //     );
    // }
    return (
        <Stack.Navigator initialRouteName="OnBoarding">
            <Stack.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PreviewScreen"
                component={PreviewScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login1"
                component={Login1Screen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register1"
                component={Register1Screen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterDocPrev"
                component={RegisterDocPrev}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RegisterDoc"
                component={RegisterDocScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            {/* ServiciosProfScreen */}
            <Stack.Screen
                name="ServiciosProfScreen"
                component={ServiciosProfScreen}
                options={{
                    headerShown: true,
                    title: "Servicios Profesionales",
                    headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                }}
            />
            {/* Oferta */}
            <Stack.Screen
                name="PublicacionScreen"
                component={PublicacionScreen}
                options={{
                    headerShown: true,
                    title: "Oferta",
                    headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                }}
            />
            {/* EspecialidadesScreen */}
            <Stack.Screen
                name="EspecialidadesCScreen"
                component={EspecialidadesCScreen}
                options={{
                    headerShown: true,
                    title: "Especialidades",
                    headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                }}
            />
            {/* ServiciosScreen */}
            <Stack.Screen
                name="ServiciosScreen"
                component={ServiciosScreen}
                options={{ headerShown: false }}
            />
            {/* SubPatologyScreen */}
            <Stack.Screen
                name="SubPatologyScreen"
                component={SubPatologyScreen}
                options={{ headerShown: false }}
            />
            {/* Perfil */}
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="ProfileData"
                component={ProfileData}
                options={{ headerShown: true }}
            /> */}
            <Stack.Screen
                name="ProfileOptions"
                component={ProfileOptions}
                options={{
                    headerShown: false,
                    presentation: "modal",
                    contentStyle: {
                        marginTop: 50,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    },
                }}
            />
            <Stack.Screen
                name="Chatt"
                component={Chat}
                options={{ headerShown: false }}
            />
            {/* Medico */}
            {/* Especialidades */}
            <Stack.Screen
                name="Especialidades"
                component={EspecialidadesScreen}
                //options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Mis Pacientes"
                component={PacientesScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Paciente"
                component={PacienteDetailScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Historial Paciente"
                component={HistorialPacienteScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Mis Ofertas de Servicio"
                component={OfertasScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Duplicar Ofertas de Servicio"
                component={OfertasDuplicarScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Detalles de Oferta"
                component={VerOfertaScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />
            <Stack.Screen
                name="Duplicar Oferta"
                component={DuplicarOfertaScreen}
                // options={{
                //     headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                //     title: "Nueva Oferta (+)",
                // }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="infoDuplicar"
                component={InfoDuplicarScreen}
                options={{
                    headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                    title: "Duplicar Oferta de Servicio",
                }}
            />
            <Stack.Screen
                name="Nueva Oferta (+)"
                component={NuevaOfertaScreen}
                options={{ headerTitleStyle: { fontFamily: "Quicksand-Bold" } }}
            />

            {/* Compras */}
            <Stack.Screen
                name="MisCompras"
                component={ComprasScreen}
                options={{
                    headerTitleStyle: { fontFamily: "Quicksand-Bold" },
                    title: "Mis Compras",
                }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
