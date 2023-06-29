import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import React from "react";
import COLORS from "../../constants/Colors";
import { icons } from "../../constants";

const Verification = ({ logout }) => {
    function handleEmailVerified() {
        logout();
        //firebase.auth().signOut();
        Alert.alert(
            //title
            "Atención!",
            //body
            "Inicie sesión si ya verificó su cuenta",
            [
                {
                    text: "Ok",
                    //onPress: () => console.log("Ok Alert"),
                    style: "cancel",
                },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
        );
    }

    function resendEmail() {
        firebase
            .auth()
            .currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: "https://ektomie-7f1ca.firebaseapp.com",
            })
            .then(() => {
                console.log("Email re-enviado");
                Alert.alert(
                    //title
                    "Éxito!",
                    //body
                    "Verificacion enviada",
                    [
                        {
                            text: "Ok",
                            //onPress: () => console.log("Ok Alert"),
                            style: "cancel",
                        },
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                );
            })
            .catch((err) => {
                console.log(err.message);
                Alert.alert(
                    //title
                    "Error!",
                    //body
                    "Intente de nuevo más tarde",
                    [
                        {
                            text: "Ok",
                            style: "cancel",
                        },
                    ],
                    { cancelable: false }
                    //clicking out side of alert will not cancel
                );
            });
    }

    return (
        <>
            <Image source={icons.logoEk} style={styles.profilePicture} />

            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 10,
                    alignItems: "center",
                }}
            >
                <Text>Te damos la bienvenida a </Text>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>ektomie</Text>
            </View>

            <Text style={{ color: "gray", fontWeight: "600" }}>
                Hemos enviado un mensaje de verificación a la dirección de
                correo eléctronico registrada,como método para proteger tu
                cuenta.
            </Text>

            <View>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "400",
                        color: "green",
                        marginLeft: 5,
                        marginVertical: 25,
                    }}
                >
                    ¿Ya verificaste tu email?
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => handleEmailVerified()}
                style={[styles.button]}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: "500",
                        color: "white",
                    }}
                >
                    Continuar
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity onPress={() => resendEmail()}>
                    <Text style={{ fontWeight: "600", color: COLORS.dark }}>
                        Si no llegas a recibir el correo electrónico de
                        verificación, Toca aquí.
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    backgroundColor: COLORS.darkGray,
                    height: 2,
                    width: "80%",
                    marginTop: 5,
                    marginBottom: 15,
                }}
            />

            <View>
                <Text
                    style={{
                        color: COLORS.skyBlue,
                        fontWeight: "800",
                        marginBottom: 10,
                    }}
                >
                    Sección de ayuda -{">"} ¿Cómo obtengo el mensaje de correo
                    electrónico de verificación que necesito para comenzar a
                    usar la app?
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Vuelve a añadir tu nueva dirección de correo electrónico,
                    con cuidado de comprobar que no haya ningún error
                    ortotipográfico y no se hayan incluido caracteres
                    especiales.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Consulta la carpeta de spam o correo no deseado (si utilizas
                    Gmail, comprueba también las carpetas Promociones y Social).
                </Text>
            </View>
        </>
    );
};

export default Verification;

const styles = StyleSheet.create({
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
        resizeMode: "contain",
    },
    button: {
        width: 250,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.greeEk,
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
