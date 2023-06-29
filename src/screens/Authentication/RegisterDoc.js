import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { icons } from "../../constants";
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

function RegisterDoc() {
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

    const handleCreateAccount = async () => {
        setLoading(true);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async () => {
                const user = firebase.auth().currentUser;

                await user
                    .sendEmailVerification({
                        handleCodeInApp: true,
                        url: "https://ektomie-7f1ca.firebaseapp.com",
                    })
                    .then(() => {
                        console.log("Verificacion enviada");
                    });

                let size = 0;
                let userFirebase = null;
                const colRef = collection(db, "usuarios");
                const result = await getDocs(query(colRef));
                result.forEach((doc) => {
                    if (doc.data().id === user.uid) {
                        size = 1;
                        userFirebase = doc.data();
                    }
                });

                const crearUsuario = async () => {
                    if (size === 0) {
                        try {
                            userFirebase = {
                                emailVerified: null,
                                picture: null,
                                nameUser: "Médico Ektomie",
                                email: user.email,
                                cliente: false,
                                medico: true,
                                basicoR: false,
                                completado: false,
                                created: firebase.firestore.Timestamp.now(),
                            };

                            console.log(
                                "aca =>",
                                userFirebase,
                                firebase.auth().currentUser.uid
                            );

                            await firebase
                                .firestore()
                                .collection("usuarios")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    nameUser: "Médico Ektomie",
                                    email: user.email,
                                    cliente: false,
                                    medico: true,
                                    basicoR: false,
                                    completado: false,
                                    created: firebase.firestore.Timestamp.now(),
                                });
                        } catch (err) {
                            Alert.alert(err);
                            return;
                        }
                    }
                };

                await crearUsuario();

                setLoading(false);

                user.providerData[0].cliente = userFirebase.cliente;
                user.providerData[0].medico = userFirebase.medico;
                user.providerData[0].completado = userFirebase.completado;
                user.providerData[0].fotoPerfil = userFirebase.picture;
                user.providerData[0].nameUser = userFirebase.nameUser;
                store.dispatch(setUser(user.providerData[0]));
                await AsyncStorage.setItem(
                    "@auth",
                    JSON.stringify(user.providerData[0])
                );
                navigation.replace("Home");
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                setEmail("");
                setPassword("");
                if (
                    e.message === "Firebase: Error (auth/email-already-in-use)."
                ) {
                    Alert.alert("Ya existe la cuenta registrada.");
                    return;
                }
                if (e.message === "Firebase: Error (auth/invalid-email).") {
                    Alert.alert("Coloque un email válido.");
                    return;
                }
                Alert.alert(e.message);
                return;
            });
    };

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
            const jsonValue = await AsyncStorage.getItem("@auth");
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
                            cliente: false,
                            medico: true,
                            basicoR: false,
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
                                cliente: false,
                                medico: true,
                                basicoR: false,
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
                    data.basicoR = userFirebase.basicoR;
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
            {/* <Image
                source={{ uri }}
                style={[styles.image, StyleSheet.absoluteFill]}
            />
            <View
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "green",
                    position: "absolute",
                    borderRadius: 25,
                    transform: [{ rotate: "50deg" }],
                }}
            ></View>
            <View
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: "#00ddff",
                    position: "absolute",
                    borderRadius: 25,
                    bottom: 140,
                    transform: [{ rotate: "50deg" }],
                }}
            ></View> */}
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

                            <View style={{ width: "90%", marginVertical: 10 }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-SemiBold",
                                        marginLeft: 5,
                                        textAlign: "justify",
                                    }}
                                >
                                    Vamos a crear un perfil en el que podrás
                                    publicar tus servicios de salud.
                                </Text>
                            </View>

                            <View style={{ width: "90%" }}>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-Medium",
                                        color: "green",
                                        marginLeft: 5,
                                    }}
                                >
                                    Email
                                </Text>
                                <TextInput
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    keyboardType={"email-address"}
                                    style={styles.input}
                                    placeholder="ektomie@correo.com"
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 15,
                                        fontFamily: "Quicksand-Medium",
                                        color: "green",
                                        marginLeft: 5,
                                    }}
                                >
                                    Contraseña
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        height: 55,
                                        paddingHorizontal: 5,
                                        marginTop: 5,
                                        borderRadius: 5,
                                    }}
                                >
                                    <TextInput
                                        onChangeText={(text) =>
                                            setPassword(text)
                                        }
                                        value={password}
                                        style={styles.input}
                                        placeholder="contraseña"
                                        secureTextEntry={!showPass}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            width: 40,
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                        }}
                                        onPress={() => setShowPass(!showPass)}
                                    >
                                        <Image
                                            source={
                                                showPass
                                                    ? icons.eye_close
                                                    : icons.eye
                                            }
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: "gray",
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleCreateAccount()}
                                style={[styles.button]}
                            >
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontFamily: "Quicksand-Medium",
                                        color: "white",
                                    }}
                                >
                                    Registrate
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => handleGoogleSignin()}
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
                                    Inicia con Google
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
                                <Text
                                    style={{
                                        width: "55%",
                                        fontFamily: "Quicksand-Medium",
                                    }}
                                >
                                    Si ya lo has creado, continúa configurando
                                    tus datos.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => navigation.replace("Login")}
                                    style={styles.buttonRegister}
                                >
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontFamily: "Quicksand-Medium",
                                            color: "#4287ff",
                                        }}
                                    >
                                        Inicia Sesión
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    backgroundColor: COLORS.darkGray,
                                    height: 2,
                                    width: "80%",
                                    marginTop: 10,
                                    marginBottom: 5,
                                }}
                            />

                            <View style={{ width: "90%" }}>
                                <Text
                                    style={{ fontFamily: "Quicksand-Medium" }}
                                >
                                    Si necesitas ayuda puedes escribirnos a
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Quicksand-Bold",
                                        textAlign: "center",
                                    }}
                                >
                                    registro-1@ektomie.com
                                </Text>
                            </View>
                        </>
                    )}
                </View>
                {/* </BlurView> */}
            </ScrollView>

            <View style={{ width: "90%", marginBottom: 30 }}>
                <Text style={{ fontFamily: "Quicksand-Medium" }}>
                    Al registrarse, Ud acepta: Términos de Uso, Condiciones y
                    Políticas de Privacidad de nuestra plataforma
                </Text>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default RegisterDoc;

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
        height: 600,
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
        fontFamily: "Quicksand-Medium",
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
