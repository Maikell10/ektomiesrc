import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { SIZES, icons } from "../../constants";
import COLORS from "../../constants/Colors";
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
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import ActivityIndicator from "../../components/ActivityIndicator";

import "expo-dev-client";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "../../config/firebase-config";
import { collection, getDocs, query } from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

const logoEk = require("../../../assets/icons/logo_ek2.png");
const logoGoogle = require("../../../assets/icons/icons8-logo-de-google-96.png");
const uri =
    "https://clinicadrrull.com/wp-content/uploads/2021/02/Ozono-terapia.jpg";

import { store, setUser, auth, db } from "../../context/redux";

function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.authGoogle.androidClientId,
        iosClientId: Constants.manifest.extra.authGoogle.iosClientId,
        expoClientId: Constants.manifest.extra.authGoogle.expoClientId,
    });
    const [authGoogle, setAuthGoogle] = useState();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        setLoading(true);
        if (response?.type === "success") {
            setAuthGoogle(response.authentication);
            getUserData(response.authentication);
        } else {
            setLoading(false);
        }
    }, [response]);

    useEffect(() => {
        setLoading(true);
        const getPersistedAuth = async () => {
            const jsonValue = await AsyncStorage.getItem("@auth");
            //console.log("jsonValue", JSON.stringify(jsonValue));
            if (jsonValue != null) {
                setLoading(false);
                const authFromJson = JSON.parse(jsonValue);
                setAuthGoogle(authFromJson);
                navigation.replace("Home");
            } else {
                setLoading(false);
                await AsyncStorage.clear();
                store.dispatch(setUser(null));
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

        //const googleProvider = new GoogleAuthProvider();

        var credential = GoogleAuthProvider.credential(
            auth.apiKey,
            resp.accessToken
        );
        signInWithCredential(auth, credential).then(async (data) => {
            let size = 0;
            let userFirebase = null;
            const colRef = collection(db, "usuarios");
            const result = await getDocs(query(colRef));
            result.forEach((doc) => {
                if (doc.id === data.user.uid) {
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
                    setUserInfo(data);

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
                    <Image source={logoEk} style={styles.profilePicture} />

                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <Text
                                style={{
                                    fontSize: SIZES.h2,
                                    marginBottom: 10,
                                    textAlign: "center",
                                    fontFamily: "Quicksand-Medium",
                                }}
                            >
                                Bienvenido!
                            </Text>

                            <Text
                                style={{
                                    fontSize: 15,
                                    marginBottom: 20,
                                    fontFamily: "Quicksand-Medium",
                                }}
                            >
                                Ektomie
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
                                    source={logoGoogle}
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
                                onPress={() => navigation.navigate("Login1")}
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
                                    Entra con tu email
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                {/* </BlurView> */}
            </ScrollView>

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
        height: 550,
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
        backgroundColor: "#F3F3F3",
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
