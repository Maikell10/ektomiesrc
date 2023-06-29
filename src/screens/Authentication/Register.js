import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import COLORS from "../../constants/Colors";
import { icons } from "../../constants";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { BlurView } from "expo-blur";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "../../config/firebase-config";
import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActivityIndicator from "../../components/ActivityIndicator";
import { collection, getDocs, query } from "firebase/firestore/lite";

import { useNavigation } from "@react-navigation/native";

import { store, setUser, auth, db } from "../../context/redux";

const uri =
    "https://clinicadrrull.com/wp-content/uploads/2021/02/Ozono-terapia.jpg";

function LoginScreen() {
    const [showPass, setShowPass] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.authGoogle.androidClientId,
        iosClientId: Constants.manifest.extra.authGoogle.iosClientId,
        expoClientId: Constants.manifest.extra.authGoogle.expoClientId,
    });

    useEffect(() => {
        setLoading(true);
        if (response?.type === "success") {
            getUserData(response.authentication);
        } else {
            setLoading(false);
        }
    }, [response]);

    useEffect(() => {
        setLoading(true);
        const getPersistedAuth = async () => {
            setLoading(false);
            const jsonValue = await AsyncStorage.getItem("auth");
            if (jsonValue != null) {
                const authFromJson = JSON.parse(jsonValue);

                navigation.replace("Home");
            }
        };
        getPersistedAuth();
    }, []);

    const getUserData = async (resp) => {
        let userInfoResponse = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${resp.accessToken}` },
            }
        );

        var credential = GoogleAuthProvider.credential(
            auth.apiKey,
            resp.accessToken
        );
        signInWithCredential(auth, credential).then(async (data) => {
            let size = 0;
            let userFirebase = null;
            const colRef = collection(db, "usuarios");
            let result = await getDocs(query(colRef));
            result.forEach((doc) => {
                if (doc.data().id === data.user.uid) {
                    size = 1;
                    userFirebase = doc.data();
                }
            });

            const crearUsuario = async () => {
                if (size === 0) {
                    try {
                        userFirebase = {
                            nameUser: data.user.displayName,
                            email: data.user.email,
                            cliente: true,
                            completado: false,
                            picture: data.user.photoURL,
                            created: firebase.firestore.Timestamp.now(),
                        };

                        await firebase
                            .firestore()
                            .collection("usuarios")
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                nameUser: userFirebase.nameUser,
                                email: userFirebase.email,
                                picture: userFirebase.picture,
                                cliente: true,
                                completado: false,
                                created: firebase.firestore.Timestamp.now(),
                            });
                    } catch (err) {
                        console.log(err);
                        setLoading(false);
                        Alert.alert(err);
                        return;
                    }
                }

                userInfoResponse.json().then((data) => {
                    data.cliente = userFirebase.cliente;
                    data.medico = userFirebase.medico;
                    data.completado = userFirebase.completado;
                    data.picture = userFirebase.picture;
                    data.nameUser = userFirebase.nameUser;
                    data.accessToken = resp.accessToken;

                    const persistAuth = async (item) => {
                        await AsyncStorage.setItem(
                            "@auth",
                            JSON.stringify(item)
                        );

                        await AsyncStorage.setItem(
                            "@currentUser",
                            JSON.stringify(firebase.auth().currentUser)
                        );
                    };
                    persistAuth(data);

                    store.dispatch(setUser(data));
                    setLoading(false);
                    navigation.replace("Home");
                });
            };

            await crearUsuario();
        });
    };

    const handleGoogleSignin = async () => {
        setLoading(true);
        await promptAsync({ useProxy: false, showInRecents: true });
    };

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
                {/* <BlurView intensity={90} tint="light"> */}
                <View style={styles.login}>
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <Image
                                source={icons.logoEk}
                                style={styles.profilePicture}
                            />

                            <Text
                                style={{
                                    fontSize: 19,
                                    marginBottom: 10,
                                    fontFamily: "Quicksand-SemiBold",
                                }}
                            >
                                Vamos a comenzar
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    marginBottom: 20,
                                    fontFamily: "Quicksand-Medium",
                                }}
                            >
                                Crear cuenta
                            </Text>

                            <TouchableOpacity
                                onPress={() => handleGoogleSignin()}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: "#F3F3F3",
                                        borderColor: "green",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        marginVertical: 10,
                                    },
                                ]}
                            >
                                <Image
                                    source={icons.logoGoogle}
                                    style={styles.logoGoogle}
                                />
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontFamily: "Quicksand-Medium",
                                        color: "gray",
                                        marginLeft: 7,
                                    }}
                                >
                                    Continuar con Google
                                </Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: COLORS.darkGray,
                                    height: 2,
                                    width: "80%",
                                    marginTop: 5,
                                    marginBottom: 5,
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Register1")}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: "#ffffff",
                                        borderColor: "green",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "row",
                                        marginVertical: 10,
                                    },
                                ]}
                            >
                                <Image
                                    source={icons.email1}
                                    style={styles.logoGoogle}
                                />
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontFamily: "Quicksand-Medium",
                                        color: "gray",
                                        marginLeft: 7,
                                    }}
                                >
                                    Registrarse con email
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {/* </BlurView> */}
            </ScrollView>

            <View style={{ width: "90%", marginBottom: 30 }}>
                <Text
                    style={{
                        fontFamily: "Quicksand-Regular",
                        fontSize: 13,
                    }}
                >
                    Al registrarse, Ud acepta: Términos de Uso, Condiciones y
                    Políticas de Privacidad de nuestra plataforma
                </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        height: 530,
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
        alignItems: "center",
        padding: 10,
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: 1,
        marginVertical: 10,
        resizeMode: "contain",
    },
    logoGoogle: { width: 35, height: 35 },
    input: {
        width: 250,
        height: 40,
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#ECECEC",
        marginBottom: 10,
    },
    button: {
        width: "90%",
        height: 45,
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
