import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ActivityIndicator from "../components/ActivityIndicator";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon, { Icons } from "../components/Icons";
import ColorScreen from "./ColorScreen";
import Perfil from "./Perfil";

import * as Animatable from "react-native-animatable";
import Colors from "../constants/Colors";
import ProfileData from "./Perfil/ProfileData";
import FirstScreen from "./principal/Home/FirstScreen";

import { store, setUser, logOut } from "../context/redux";

import { firebase } from "../config/firebase-config";
import { getEspecialidad } from "../config/services";
import DataMedico from "../components/DataMedico";
import ServiciosScreen from "./principal/ServiciosScreen";
import ColorScreenMed from "./ColorScreenMed";
import Data2Medico from "../components/Data2Medico";
import { icons } from "../constants";
import COLORS from "../constants/Colors";
import Verification from "./Authentication/Verification";

const TabArr = [
    {
        route: "Inicio",
        label: "Inicio",
        type: Icons.Ionicons,
        activeIcon: "ios-home",
        inActiveIcon: "ios-home-outline",
        component: ColorScreen,
    },
    {
        route: "Guardado",
        label: "Guardado",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "heart-pulse",
        inActiveIcon: "heart-outline",
        component: ColorScreen,
    },
    {
        route: "Historial",
        label: "Historial",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "clipboard-account",
        inActiveIcon: "clipboard-account-outline",
        component: ColorScreen,
    },
    {
        route: "Chat",
        label: "Chat",
        type: Icons.Ionicons,
        activeIcon: "ios-chatbubbles",
        inActiveIcon: "ios-chatbubbles-outline",
        component: ColorScreen,
    },
    {
        route: "Perfil",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: Perfil,
    },

    {
        route: "ProfileData",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: ProfileData,
    },
    {
        route: "FirstScreen",
        label: "FirstScreen",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: FirstScreen,
    },

    {
        route: "ServiciosScreen",
        label: "ServiciosScreen",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: ServiciosScreen,
    },
];

const TabArrM = [
    {
        route: "Inicio",
        label: "Inicio",
        type: Icons.Ionicons,
        activeIcon: "ios-home",
        inActiveIcon: "ios-home-outline",
        component: ColorScreenMed,
    },
    {
        route: "Guardado",
        label: "Guardado",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "heart-pulse",
        inActiveIcon: "heart-outline",
        component: ColorScreenMed,
    },
    {
        route: "Historial",
        label: "Historial",
        type: Icons.MaterialCommunityIcons,
        activeIcon: "clipboard-account",
        inActiveIcon: "clipboard-account-outline",
        component: ColorScreenMed,
    },
    {
        route: "Chat",
        label: "Chat",
        type: Icons.Ionicons,
        activeIcon: "ios-chatbubbles",
        inActiveIcon: "ios-chatbubbles-outline",
        component: ColorScreenMed,
    },
    {
        route: "Perfil",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: Perfil,
    },

    {
        route: "ProfileData",
        label: "Perfil",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: ProfileData,
    },
    {
        route: "FirstScreen",
        label: "FirstScreen",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: FirstScreen,
    },

    {
        route: "ServiciosScreen",
        label: "ServiciosScreen",
        type: Icons.FontAwesome,
        activeIcon: "user-circle",
        inActiveIcon: "user-circle-o",
        component: ServiciosScreen,
    },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState, index } = props;

    if (index < 5) {
        const focused = accessibilityState.selected;
        const viewRef = useRef(null);

        useEffect(() => {
            if (focused) {
                viewRef.current.animate({
                    0: { scale: 0.5, rotate: "0deg" },
                    1: { scale: 1.5, rotate: "360deg" },
                });
            } else {
                viewRef.current.animate({
                    0: { scale: 1.5, rotate: "360deg" },
                    1: { scale: 1, rotate: "0deg" },
                });
            }
        }, [focused]);

        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1}
                style={styles.container}
            >
                <Animatable.View
                    ref={viewRef}
                    duration={1000}
                    style={styles.container}
                >
                    {index < 5 && (
                        <Icon
                            type={item.type}
                            name={focused ? item.activeIcon : item.inActiveIcon}
                            color={focused ? Colors.green : Colors.green2}
                        />
                    )}
                </Animatable.View>
            </TouchableOpacity>
        );
    }
};

function HomeScreen(props) {
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [notVerified, setNotVerified] = useState(false);

    const [basicoRMedico, setBasicoRMedico] = useState(false);
    const [basicoR2Medico, setBasicoR2Medico] = useState(false);
    const [isMedico, setIsMedico] = useState(false);
    //const [user, setUser] = useState(null);

    //const auth = getAuth(app);

    const navigation = useNavigation();

    const logout = async () => {
        setLoading(true);
        const jsonValue = await AsyncStorage.getItem("@auth");
        logOut;
        if (jsonValue != null) {
            const authFromJson = JSON.parse(jsonValue);
            if (authFromJson.accessToken) {
                await AuthSession.revokeAsync(
                    {
                        token: authFromJson.accessToken,
                    },
                    {
                        revocationEndpoint:
                            "https://oauth2.googleapis.com/revoke",
                    }
                );
            }
            await AsyncStorage.clear();
            store.dispatch(setUser(null));
            setLoading(false);
            navigation.replace("Login");
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            const jsonValue = await AsyncStorage.getItem("@auth");
            const currentUser = await AsyncStorage.getItem("@currentUser");
            //console.log("La sesion en asyn", jsonValue);
            if (jsonValue === null) {
                logout();
            } else {
                if (!JSON.parse(jsonValue).emailVerified) {
                    if (JSON.parse(jsonValue).emailVerified === undefined) {
                        if (!JSON.parse(jsonValue).verified_email) {
                            setNotVerified(true);
                        } else {
                            setNotVerified(false);
                            const user = firebase
                                .firestore()
                                .collection("usuarios")
                                .doc(JSON.parse(currentUser).uid)
                                .get()
                                .then(async (snapshot) => {
                                    if (snapshot.exists) {
                                        let user = {
                                            cliente: snapshot.data().cliente,
                                            medico: snapshot.data().medico,
                                            completado:
                                                snapshot.data().completado,
                                            created:
                                                snapshot.data().created.seconds,
                                            email: snapshot.data().email,
                                            nameUser: snapshot.data().nameUser,
                                            picture: snapshot.data().picture,
                                            id_region:
                                                snapshot.data().id_region,
                                            id_estado:
                                                snapshot.data().id_estado,
                                        };
                                        if (user.medico) {
                                            //setIsMedico(user.medico);
                                            if (!snapshot.data().basicoR) {
                                                setBasicoRMedico(false);
                                            } else {
                                                setBasicoRMedico(true);
                                            }

                                            if (!snapshot.data().basicoR2) {
                                                setBasicoR2Medico(false);
                                            } else {
                                                setBasicoR2Medico(true);
                                            }

                                            user.basicoR =
                                                snapshot.data().basicoR;
                                            user.basicoR2 =
                                                snapshot.data().basicoR2;
                                            user.ramas = snapshot.data().ramas;
                                            user.especialidades =
                                                snapshot.data().especialidades;
                                            user.id_profesion =
                                                snapshot.data().id_profesion;
                                            user.id_tec_aux_asist =
                                                snapshot.data().id_tec_aux_asist;
                                            user.id_establecimiento =
                                                snapshot.data().id_establecimiento;
                                        } else {
                                            //setIsMedico(user.medico);
                                            setBasicoRMedico(true);
                                            setBasicoR2Medico(true);
                                        }

                                        store.dispatch(setUser(user));
                                    } else {
                                        console.log("No existe el usuario");
                                        logout();
                                    }
                                });
                        }
                    } else {
                        setNotVerified(true);
                    }
                } else {
                    setNotVerified(false);
                    firebase
                        .firestore()
                        .collection("usuarios")
                        .doc(JSON.parse(currentUser).uid)
                        .get()
                        .then(async (snapshot) => {
                            if (snapshot.exists) {
                                let user = {
                                    cliente: snapshot.data().cliente,
                                    medico: snapshot.data().medico,
                                    completado: snapshot.data().completado,
                                    created: snapshot.data().created.seconds,
                                    email: snapshot.data().email,
                                    nameUser: snapshot.data().nameUser,
                                    picture: snapshot.data().picture,
                                    id_region: snapshot.data().id_region,
                                    id_estado: snapshot.data().id_estado,
                                };

                                if (user.medico) {
                                    user.basicoR = snapshot.data().basicoR;
                                    user.basicoR2 = snapshot.data().basicoR2;
                                    user.ramas = snapshot.data().ramas;
                                    user.especialidades =
                                        snapshot.data().especialidades;
                                    user.id_profesion =
                                        snapshot.data().id_profesion;
                                    user.id_tec_aux_asist =
                                        snapshot.data().id_tec_aux_asist;
                                    user.id_establecimiento =
                                        snapshot.data().id_establecimiento;

                                    //setIsMedico(user.medico);
                                    if (!snapshot.data().basicoR) {
                                        setBasicoRMedico(false);
                                    } else {
                                        setBasicoRMedico(true);
                                    }

                                    if (!snapshot.data().basicoR2) {
                                        setBasicoR2Medico(false);
                                    } else {
                                        setBasicoR2Medico(true);
                                    }
                                } else {
                                    //setIsMedico(user.medico);
                                    setBasicoRMedico(true);
                                    setBasicoR2Medico(true);
                                }

                                store.dispatch(setUser(user));
                            } else {
                                console.log("No existe el usuario");
                                logout();
                            }
                        });
                }
            }
            setLoading(false);
        };
        checkSession();
    }, [props, isFocused]);

    useEffect(() => {
        getIsMed();
    }, [props]);

    const getIsMed = async () => {
        const isMed = await AsyncStorage.getItem("isMedico");

        if (isMed === "true") {
            setIsMedico(true);
        } else {
            setIsMedico(false);
        }
    };

    if (notVerified) {
        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BlurView intensity={90} tint="light">
                        <View style={styles.login}>
                            {loading ? (
                                <ActivityIndicator />
                            ) : (
                                <Verification logout={logout} />
                            )}
                        </View>
                    </BlurView>
                </ScrollView>
                <StatusBar style="auto" />
            </View>
        );
    }

    if (loading) {
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        );
    }

    if (!basicoRMedico && !loading && !basicoR2Medico) {
        return (
            <DataMedico
                navigation={navigation}
                basicoR2Medico={basicoR2Medico}
            />
        );
    }

    if (!basicoR2Medico && !loading) {
        return (
            <Data2Medico
                navigation={navigation}
                basicoRMedico={basicoRMedico}
            />
        );
    }

    if (isMedico) {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 60,
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        left: 16,
                        borderRadius: 16,
                    },
                    tabBarItemStyle: {
                        height: 60,
                    },
                }}
            >
                {TabArrM.map((item, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={item.route}
                            component={item.component}
                            options={{
                                tabBarButton: (props) => (
                                    <TabButton
                                        {...props}
                                        item={item}
                                        index={index}
                                    />
                                ),
                            }}
                        />
                    );
                })}
            </Tab.Navigator>
        );
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    left: 16,
                    borderRadius: 16,
                },
                tabBarItemStyle: {
                    height: 60,
                },
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        component={item.component}
                        options={{
                            tabBarButton: (props) => (
                                <TabButton
                                    {...props}
                                    item={item}
                                    index={index}
                                />
                            ),
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    login: {
        width: 350,
        height: 650,
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
    },
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#37fa5a",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        borderColor: "white",
        borderWidth: 1,
    },
    buttonRegister: {
        marginLeft: 10,
    },
});
