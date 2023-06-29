import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Platform,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Alert,
} from "react-native";
import { store } from "../../context/redux";
import COLORS from "../../constants/Colors";
import FormInput from "../../components/FormInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MyHeader from "../../components/MyHeader";

import { firebase } from "../../config/firebase-config";
import { getRegiones, updateUser } from "../../config/services";

// You can import from local files
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";

const ProfileData = ({ navigation }) => {
    const user = navigation.getState().routes[5].params.usuario;
    const onPress = navigation.getState().routes[5].params.logout;

    const [nameUser, setNameUser] = useState("");
    const [especialidad, setEspecialidad] = useState("");

    const [genderOpen, setGenderOpen] = useState(false);
    const { handleSubmit, control } = useForm();

    const [regionOpen, setRegionOpen] = useState(false);
    const [regionValue, setRegionValue] = useState(null);
    const [estadoOpen, setEstadoOpen] = useState(false);
    const [estadoValue, setEstadoValue] = useState(null);

    const [loading, setLoading] = useState(false);
    const onCompanyOpen = useCallback(() => {
        setGenderOpen(false);
    }, []);

    // Firebase variables
    //const [user, setUser] = useState(null);
    const [userUID, setUserUID] = useState(null);
    const [regiones, setRegiones] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        console.log(store.getState().user);

        setNameUser(user.nameUser);
        setRegionValue(null);
        setEstadoValue(null);
        if (store.getState().user?.payload?.region) {
            setRegionValue(store.getState().user?.payload?.region);
        }
        if (store.getState().user?.payload?.estado) {
            setEstadoValue(store.getState().user?.payload?.estado);
        }

        getFirebaseData();
    }, []);

    const getFirebaseData = async () => {
        const jsonValue = await AsyncStorage.getItem("@currentUser");
        setUserUID(JSON.parse(jsonValue).uid);

        //const user = await AsyncStorage.getItem("@auth");
        //setUserUID(JSON.parse(user));
        //console.log("valor", JSON.parse(jsonValue).uid);

        const regionesFire = await getRegiones();

        setRegiones(regionesFire);

        //setLoading(false);
    };

    function handleRegionChange() {
        if (regionValue !== null) {
            const region = regiones.filter((item) => item.id === regionValue);
            const estados = region[0].estados.map((item) => {
                let est = {
                    ["label"]: item.estado,
                    ["value"]: item.id,
                    ...item,
                };
                return est;
            });
            setEstados(estados);
        }
    }

    function handleEstadoChange() {
        if (estadoValue !== null) {
            const estado = estados.filter((item) => item.id === estadoValue);

            console.log(estado);
        }
    }

    const handleGuardarPerfil = async () => {
        if (regionValue === null || estadoValue === null) {
            Alert.alert("Debe cargar todos los campos");
            return;
        }

        setLoading(true);
        const user = await updateUser(
            userUID,
            nameUser,
            regionValue,
            estadoValue
        );
        setLoading(false);
        Alert.alert("Datos editados satisfactoriamente");
        return;
    };

    if (regiones.length === 0) {
        return (
            <View>
                <Text style={{ fontFamily: "Quicksand-Bold" }}>Cargando</Text>
            </View>
        );
    }

    return (
        <SafeAreaView
            style={[
                Platform.OS === "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <MyHeader
                menu
                onPressMenu={() => navigation.navigate("Perfil")}
                title={"Datos de Perfil"}
                right="more-vertical"
                onRightPress={() =>
                    navigation.navigate("ProfileOptions", {
                        usuario: user,
                        logout: onPress,
                    })
                }
            />

            <View style={{ alignItems: "center", height: "100%" }}>
                <FormInput
                    label={"Nombre Completo"}
                    value={nameUser}
                    containerStyle={{
                        marginTop: 20,
                        width: "90%",
                        marginBottom: 5,
                    }}
                    inputStyle={{ padding: 7 }}
                    onChange={(value) => {
                        setNameUser(value);
                    }}
                />

                <Text style={styles.label}>Región</Text>
                <Controller
                    name="region"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View
                            style={[styles.dropdownCompany, { zIndex: 100001 }]}
                        >
                            <DropDownPicker
                                style={styles.dropdown}
                                open={regionOpen}
                                value={regionValue} //companyValue
                                items={regiones}
                                setOpen={setRegionOpen}
                                setValue={setRegionValue}
                                setItems={setRegiones}
                                placeholder="Selecciona una Región"
                                placeholderStyle={styles.placeholderStyles}
                                loading={loading}
                                activityIndicatorColor="#5188E3"
                                searchable={true}
                                searchPlaceholder="Buscar"
                                onOpen={onCompanyOpen}
                                onChangeValue={() => {
                                    handleRegionChange();
                                }}
                            />
                        </View>
                    )}
                />

                {regionValue && (
                    <>
                        <Text style={styles.label}>Estado</Text>
                        <Controller
                            name="estado"
                            defaultValue=""
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.dropdownCompany}>
                                    <DropDownPicker
                                        style={styles.dropdown}
                                        open={estadoOpen}
                                        value={estadoValue} //companyValue
                                        items={estados}
                                        setOpen={setEstadoOpen}
                                        setValue={setEstadoValue}
                                        setItems={setEstados}
                                        placeholder="Selecciona un Estado"
                                        placeholderStyle={
                                            styles.placeholderStyles
                                        }
                                        loading={loading}
                                        activityIndicatorColor="#5188E3"
                                        searchable={true}
                                        searchPlaceholder="Buscar"
                                        onOpen={onCompanyOpen}
                                        onChangeValue={() => {
                                            handleEstadoChange();
                                        }}
                                    />
                                </View>
                            )}
                        />
                    </>
                )}

                {user.medico && (
                    <FormInput
                        label={"Especialidad"}
                        value={especialidad}
                        containerStyle={{
                            marginTop: 8,
                            width: "90%",
                        }}
                        onChange={(value) => {
                            setEspecialidad(value);
                        }}
                    />
                )}

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        marginTop: Dimensions.get("window").height - 250,
                        backgroundColor: COLORS.green,
                        height: 45,
                        width: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 15,
                    }}
                    onPress={() => handleGuardarPerfil()}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontFamily: "Quicksand-Bold",
                        }}
                    >
                        Guardar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        borderStyle: "solid",
        borderColor: "#B7B7B7",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        paddingStart: 10,
        marginBottom: 15,
    },
    label: {
        marginVertical: 5,
        color: "grey",
        width: "90%",
        color: "gray",
        fontSize: 15,
        fontFamily: "Quicksand-Medium",
    },
    placeholderStyles: {
        color: "grey",
        fontFamily: "Quicksand-Medium",
    },
    dropdownCompany: {
        width: "90%",
        marginBottom: 5,
        zIndex: 100000,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        backgroundColor: "lightgrey",
        color: "grey",
        height: 50,
    },
});

export default ProfileData;
