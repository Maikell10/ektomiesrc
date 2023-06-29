import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import Styles from "../common/Styles";
import Colors from "../constants/Colors";
import MyHeader from "../components/MyHeader";

import { store, setValue } from "../context/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GuardadoScreen from "./principal/GuardadoScreen";
import HistorialScreen from "./principal/HistorialScreen";
import ChatScreen from "./principal/ChatScreen";
import PrincipalMedScreen from "./principal/Med/PrincipalMedScreen";

export default function ColorScreenMed({ route, navigation }) {
    const [loading, setLoading] = useState(false);

    const viewRef = React.useRef(null);
    const [bgColor, setBgColor] = useState();

    useEffect(() => {
        store.dispatch(setValue(40));

        switch (route.name) {
            case "Inicio": {
                setBgColor(Colors.white);
                break;
            }
            case "Guardado": {
                setBgColor(Colors.gold);
                break;
            }
            case "Historial": {
                setBgColor(Colors.red);
                break;
            }
            case "Chat": {
                setBgColor(Colors.purple);
                break;
            }
            case "Like": {
                setBgColor(Colors.yellow);
                break;
            }
            default:
                setBgColor(Colors.white);
        }
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
        });
        return () => unsubscribe;
    }, [navigation]);

    function renderPrincipalScreen() {
        return <PrincipalMedScreen bgColor={bgColor} />;
    }

    function renderGuardadoScreen() {
        return <GuardadoScreen bgColor={bgColor} />;
    }

    function renderHistorialScreen() {
        return <HistorialScreen bgColor={bgColor} />;
    }

    function renderChatScreen() {
        return <ChatScreen bgColor={bgColor} />;
    }

    return (
        <SafeAreaView
            style={[
                Styles.container,
                Platform.OS === "android" ? { marginTop: 40 } : "",
            ]}
        >
            <MyHeader
                //menu
                //onPressMenu={() => navigation.openDrawer()}
                title={route.name}
                right="more-vertical"
                onRightPress={() => console.log("right")}
            />
            <Animatable.View
                ref={viewRef}
                easing={"ease-in-out"}
                style={Styles.container}
            >
                {/* Ventana Home */}
                {route.name == "Inicio" && renderPrincipalScreen()}

                {/* Ventana Guardado */}
                {route.name == "Guardado" && renderGuardadoScreen()}

                {/* Ventana Historial */}
                {route.name == "Historial" && renderHistorialScreen()}

                {/* Ventana Chat */}
                {route.name == "Chat" && renderChatScreen()}
            </Animatable.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
