import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Colors from "../constants/Colors";
import { icons } from "../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../config/firebase-config";
import {
    getRegiones,
    getCiudadesMunicipios,
    getEspecialidades,
    updateMedicoData1,
    getProfesiones,
    getTecAuxAsist,
    getEstablecimiento,
} from "../config/services";

import FormInput from "./FormInput";

import ActivityIndicator from "../components/ActivityIndicator";
import SelectModal from "./SelectModal";
import Especialidades from "../screens/Modal/Especialidades";

const DataMedico = ({ navigation, basicoRMedico }) => {
    const [genderOpen, setGenderOpen] = useState(false);
    const { handleSubmit, control } = useForm();

    const [nameUser, setNameUser] = useState("");
    const [telefono, setTelefono] = useState("");
    const [regiones, setRegiones] = useState("");
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [direccion, setDireccion] = useState("");
    const [especialidades, setEspecialidades] = useState([]);
    const [profesiones, setProfesiones] = useState([]);
    const [tecAuxAsists, setTecAuxAsists] = useState([]);
    const [establecimientos, setEstablecimientos] = useState([]);

    const [userUID, setUserUID] = useState(null);
    const [regionOpen, setRegionOpen] = useState(false);
    const [regionValue, setRegionValue] = useState(null);
    const [estadoOpen, setEstadoOpen] = useState(false);
    const [estadoValue, setEstadoValue] = useState(null);
    const [ciudadOpen, setCiudadOpen] = useState(false);
    const [ciudadValue, setCiudadValue] = useState(null);
    const [municipioValue, setMunicipioValue] = useState(null);
    const [especialidadOpen, setEspecialidadOpen] = useState(false);
    const [especialidadValue, setEspecialidadValue] = useState(null);
    const [tecAuxAsistValue, setTecAuxAsistValue] = useState(null);
    const [establecimientoValue, setEstablecimientoValue] = useState(null);
    const [profesionValue, setProfesionValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const onCompanyOpen = useCallback(() => {
        setGenderOpen(false);
    }, []);

    const [especialidad, setEspecialidad] = useState("");
    const [profesion, setProfesion] = useState("");
    const [tecAuxAsist, setTecAuxAsist] = useState("");
    const [establecimiento, setEstablecimiento] = useState("");
    const [region, setRegion] = useState("");
    const [estado, setEstado] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setRegion("");
        setEstado("");
        setCiudad("");
        setEspecialidad("");
        setProfesion("");
        setTecAuxAsist("");
        setEstablecimiento("");
        setRegionValue(null);
        setEstadoValue(null);
        setCiudadValue(null);
        setMunicipioValue(null);
        setEspecialidadValue(null);
        setProfesionValue(null);
        setTecAuxAsistValue(null);
        setEstablecimientoValue(null);
        getFirebaseData();
    }, []);

    useEffect(() => {
        const getEspModal = async () => {
            const espModal = await AsyncStorage.getItem("especialidades");

            if (espModal) {
                setEspecialidades(JSON.parse(espModal));
            } else {
                setEspecialidades([]);
            }
        };
        getEspModal();
    }, [modalVisible]);

    const getFirebaseData = async () => {
        const jsonValue = await AsyncStorage.getItem("@currentUser");
        setUserUID(JSON.parse(jsonValue).uid);

        const regionesFire = await getRegiones();

        setRegiones(regionesFire);

        let especialidadesFire1 = [
            {
                key: 0,
                section: true,
                label: "Especialidades",
            },
        ];
        const especialidadesFire = await getEspecialidades();
        especialidadesFire.unshift(especialidadesFire1[0]);
        setEspecialidades(especialidadesFire);

        let profesionesFire1 = [
            {
                key: 0,
                section: true,
                label: "Profesiones",
            },
        ];
        const profesionesFire = await getProfesiones();
        profesionesFire.unshift(profesionesFire1[0]);
        setProfesiones(profesionesFire);

        let tecAuxAsistFire1 = [
            {
                key: 0,
                section: true,
                label: "Técnico, Auxiliar o Asistente",
            },
        ];
        const tecAuxAsistFire = await getTecAuxAsist();
        tecAuxAsistFire.unshift(tecAuxAsistFire1[0]);
        setTecAuxAsists(tecAuxAsistFire);

        let establFire1 = [
            {
                key: 0,
                section: true,
                label: "Tipo de Establecimiento",
            },
        ];
        const establFire = await getEstablecimiento();
        establFire.unshift(establFire1[0]);
        setEstablecimientos(establFire);
    };

    function handleRegionChange(option) {
        setRegion(option);
        setRegionValue(option.value);
        setEstadoValue(null);
        if (option.value !== null) {
            const region = regiones.filter((item) => item.id === option.value);
            const estados = region[0].estados.map((item) => {
                let est = {
                    ["key"]: item.id,
                    ["label"]: item.estado,
                    ["value"]: item.id,
                    ...item,
                };
                return est;
            });
            setEstados(estados);
        }
    }

    const handleEstadoChange = async (option) => {
        setEstado(option);
        setEstadoValue(option.value);
        setCiudadValue(null);
        setCiudades([]);
        if (option.value !== null) {
            const ciu_mun = await getCiudadesMunicipios(option.value);
            const ciudades = ciu_mun[0].ciudades.map((item) => {
                let reg = item;
                reg = {
                    ["key"]: item.id,
                    ["label"]: item.ciudad,
                    ["value"]: item.id,
                    ...item,
                };
                return reg;
            });
            setCiudades(ciudades);

            const municipios = ciu_mun[0].municipios.map((item) => item);
            setMunicipios(municipios);
        }
    };

    const handleCiudadChange = async (option) => {
        console.log(option);
        setCiudad(option);
        setCiudadValue(option.value);
        setMunicipioValue(null);
        if (option.value !== null) {
            ciudades.filter((item) => item.value === option.value);
            const municipio = municipios.filter(
                (item) => item.id === ciudades[0].id_municipio
            );
            setMunicipioValue(municipio[0].municipio);
        }
    };

    const handleEspecialidadChange = async () => {
        if (especialidadValue !== null) {
        }
    };

    const emptyComponent = () => {
        return (
            <View style={{ padding: 8 }}>
                <Text>No hay Data</Text>
            </View>
        );
    };

    function handleSubmitForm() {
        console.log(especialidades);
        if (nameUser === "") {
            Alert.alert("Debe ingresar su Nombre Completo");
        } else if (telefono === "") {
            Alert.alert("Debe ingresar un teléfono");
        } else if (regionValue === "" || regionValue === null) {
            Alert.alert("Debe Seleccionar una Región");
        } else if (estadoValue === "" || estadoValue === null) {
            Alert.alert("Debe Seleccionar un Estado");
        } else if (ciudadValue === "" || ciudadValue === null) {
            Alert.alert("Debe Seleccionar una Ciudad");
        } else if (
            (profesionValue === "" || profesionValue === null) &&
            (tecAuxAsistValue === "" || tecAuxAsistValue === null)
        ) {
            Alert.alert(
                "Alerta!",
                "Debe Seleccionar una Profesión o una opción entre Técnico, Auxiliar, Asistente o Ayudante"
            );
        } else if (
            establecimientoValue === "" ||
            establecimientoValue === null
        ) {
            Alert.alert("Debe Seleccionar un Tipo de Establecimiento");
        } else {
            updateMedicoData1(
                userUID,
                nameUser,
                telefono,
                regionValue,
                estadoValue,
                ciudadValue,
                municipioValue,
                direccion,
                profesionValue,
                especialidades,
                tecAuxAsistValue,
                establecimientoValue
            );
            Alert.alert(
                "Éxito",
                "Bienvenido a Ektomie, próximamente será contactado por nuestro staff. (Puede Iniciar Sesión)",
                [
                    {
                        text: "Ok",
                        onPress: () => navigation.navigate("Login"),
                        style: "cancel",
                    },
                ],
                { cancelable: false }
            );
        }
    }

    if (regiones.length === 0) {
        return <ActivityIndicator />;
    }

    return (
        <SafeAreaView
            style={[
                Platform.OS === "android" ? { marginTop: 40 } : "",
                { flex: 1 },
            ]}
        >
            <ScrollView>
                {/* Header */}
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
                    <Image
                        source={icons.logoEk}
                        style={{ width: 80, height: 80, borderRadius: 25 }}
                    />
                    <Text
                        style={{
                            fontSize: 16,
                            marginBottom: 10,
                            fontFamily: "Quicksand-Bold",
                        }}
                    >
                        ¡Sigamos Avanzando!
                    </Text>

                    <Text style={styles.labelTitulo}>
                        1- Completa los datos de este formulario
                    </Text>
                    <Text style={styles.labelTitulo}>
                        2- Procedemos a validar la información
                    </Text>
                    <Text style={styles.labelTitulo}>
                        3- Publicamos la oferta de servicio y listo!
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: Colors.darkGray,
                        height: 2,
                        width: "90%",
                        marginTop: 5,
                        marginBottom: 5,
                        alignSelf: "center",
                    }}
                />
                <Text
                    style={{
                        fontSize: 14,
                        alignSelf: "center",
                        width: "80%",
                        textAlign: "left",
                        fontFamily: "Quicksand-Medium",
                    }}
                >
                    Creceremos sin límites, guiados por una misma misión, visión
                    y valores …
                </Text>
                <View
                    style={{
                        backgroundColor: Colors.darkGray,
                        height: 2,
                        width: "90%",
                        marginTop: 5,
                        marginBottom: 5,
                        alignSelf: "center",
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <FormInput
                        label={"Nombre Completo"}
                        value={nameUser}
                        containerStyle={{
                            marginTop: 10,
                            width: "45%",
                            marginBottom: 5,
                            marginRight: 5,
                        }}
                        inputStyle={{
                            padding: 7,
                            fontFamily: "Quicksand-Regular",
                        }}
                        onChange={(value) => {
                            setNameUser(value);
                        }}
                    />

                    <FormInput
                        label={"Teléfono"}
                        value={telefono}
                        containerStyle={{
                            marginTop: 10,
                            width: "45%",
                            marginBottom: 5,
                        }}
                        inputStyle={{
                            padding: 7,
                            fontFamily: "Quicksand-Regular",
                        }}
                        onChange={(value) => {
                            setTelefono(value);
                        }}
                        placeholder={"0424-555-5555"}
                        maxLength={11}
                        keyboardType="phone-pad"
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                    }}
                >
                    <View
                        style={{
                            width: "45%",
                            alignSelf: "center",
                            marginRight: 7,
                        }}
                    >
                        <SelectModal
                            data={regiones}
                            onChange={(option) => {
                                handleRegionChange(option);
                            }}
                            label={"Región"}
                            placeholder={"Selecciona una Región"}
                            value={region.label}
                        />
                    </View>

                    <View style={{ width: "45%", alignSelf: "center" }}>
                        {regionValue && (
                            <SelectModal
                                data={estados}
                                onChange={(option) => {
                                    handleEstadoChange(option);
                                }}
                                label={"Estado"}
                                placeholder={"Selecciona un Estado"}
                                value={estado.label}
                            />
                        )}
                        {!regionValue && (
                            <View
                                style={{
                                    alignSelf: "center",
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{ fontFamily: "Quicksand-Regular" }}
                                >
                                    Seleccione una Región
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center",
                    }}
                >
                    <View
                        style={{
                            width: "45%",
                            alignSelf: "center",
                            marginRight: 7,
                        }}
                    >
                        {estado && (
                            <SelectModal
                                data={ciudades}
                                onChange={(option) => {
                                    handleCiudadChange(option);
                                }}
                                label={"Ciudad"}
                                placeholder={"Selecciona una Ciudad"}
                                value={ciudad?.label}
                            />
                        )}

                        {!regionValue && !estadoValue && (
                            <View
                                style={{
                                    alignSelf: "center",
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{ fontFamily: "Quicksand-Regular" }}
                                >
                                    Seleccione una Región
                                </Text>
                            </View>
                        )}

                        {regionValue && !estadoValue && (
                            <View
                                style={{
                                    alignSelf: "center",
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{ fontFamily: "Quicksand-Regular" }}
                                >
                                    Seleccione un Estado
                                </Text>
                            </View>
                        )}
                    </View>

                    <View
                        style={{
                            flexDirection: "column",
                            width: "45%",
                        }}
                    >
                        <Text style={styles.label}>Municipio</Text>
                        <FormInput
                            value={municipioValue}
                            containerStyle={{
                                marginTop: -15,
                                marginBottom: 5,
                            }}
                            inputStyle={{
                                padding: 7,
                                fontFamily: "Quicksand-Regular",
                            }}
                            editable={false}
                        />
                    </View>
                </View>

                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <FormInput
                        label={"Dirección Exacta (Opcional)"}
                        value={direccion}
                        containerStyle={{
                            marginTop: 5,
                            width: "90%",
                            marginBottom: 5,
                            marginRight: 5,
                        }}
                        inputStyle={{
                            padding: 7,
                            fontFamily: "Quicksand-Regular",
                        }}
                        onChange={(value) => {
                            setDireccion(value);
                        }}
                    />
                </View>

                <View style={{ width: "90%", alignSelf: "center" }}>
                    <SelectModal
                        data={profesiones}
                        onChange={(option) => {
                            //console.log(option.especialidad);
                            setProfesion(option);
                            setProfesionValue(option.value);

                            setTecAuxAsist("");
                            setTecAuxAsistValue(null);

                            if (option.especialidad === undefined) {
                                setEspecialidades([]);
                                AsyncStorage.removeItem("especialidades");
                            } else {
                                setModalVisible(true);
                                let especialidadesFire1 = [
                                    {
                                        key: "llave",
                                        section: true,
                                        label: "Especialidades",
                                    },
                                ];
                                const especialidadesFire =
                                    option.especialidad.map((item, index) => {
                                        let reg = item;
                                        reg = {
                                            ["key"]: index,
                                            ["label"]: item.name,
                                            ["value"]: index,
                                            ...item,
                                        };
                                        return reg;
                                    });

                                especialidadesFire.unshift(
                                    especialidadesFire1[0]
                                );
                                setEspecialidades(option);
                            }
                        }}
                        label={"Profesión Medica o Asistencial"}
                        placeholder={"Seleccionar"}
                        value={profesion.label}
                        marginLeft={20}
                    />
                </View>

                {/* {especialidades.length > 0 && (
                    <View style={{ width: "90%", alignSelf: "center" }}>
                        <SelectModal
                            data={especialidades}
                            onChange={(option) => {
                                setEspecialidad(option);
                                setEspecialidadValue(option.value);
                            }}
                            label={"Especialidad"}
                            placeholder={"Seleccionar"}
                            value={especialidad.label}
                            marginLeft={20}
                        />
                    </View>
                )} */}

                <View style={{ width: "90%", alignSelf: "center" }}>
                    <SelectModal
                        data={tecAuxAsists}
                        onChange={(option) => {
                            setEspecialidades([]);
                            setProfesion("");
                            setProfesionValue(null);

                            setTecAuxAsist(option);
                            setTecAuxAsistValue(option.value);
                            AsyncStorage.removeItem("especialidades");
                        }}
                        label={"Técnico, Auxiliar, Asistente o Ayudante"}
                        placeholder={"Seleccionar"}
                        value={tecAuxAsist.label}
                        marginLeft={20}
                    />
                </View>

                <View style={{ width: "90%", alignSelf: "center" }}>
                    <SelectModal
                        data={establecimientos}
                        onChange={(option) => {
                            setEstablecimiento(option);
                            setEstablecimientoValue(option.value);
                        }}
                        label={"Tipo de Establecimiento"}
                        placeholder={"Seleccionar"}
                        value={establecimiento.label}
                        marginLeft={20}
                    />
                </View>

                {especialidades && (
                    <Especialidades
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        especialidadesM={especialidades}
                    />
                )}

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            marginTop: 30,
                            marginBottom: 30,
                            backgroundColor: Colors.greeEk,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                            width: "90%",
                            borderRadius: 15,
                        }}
                        onPress={() => handleSubmitForm()}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 17,
                                fontWeight: "700",
                            }}
                        >
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DataMedico;

const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        color: "grey",
        width: "90%",
        color: "gray",
        fontSize: 15,
        fontFamily: "Quicksand-Regular",
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownCompany: {
        //width: "50%",
        marginBottom: 5,
        //zIndex: 100000,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        backgroundColor: "lightgrey",
        color: "grey",
        height: 50,
    },
    labelTitulo: {
        fontSize: 14,
        alignSelf: "flex-start",
        marginLeft: 15,
        fontFamily: "Quicksand-Medium",
    },
});
