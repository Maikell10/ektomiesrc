import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Modal,
    Image,
    Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Colors from "../../../../constants/Colors";

import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "../../../../constants";

import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import {
    getDownloadURL,
    ref,
    getStorage,
    uploadBytes,
    deleteObject,
} from "firebase/storage";

import { store } from "../../../../context/redux";
import SelectModal from "../../../../components/SelectModal";

import {
    actDesactPublicacion,
    updatePublicacion,
} from "../../../../config/services";
import { Switch } from "react-native";

const VerOfertaScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [oferta, setOferta] = useState(false);

    const handleChangeAct = async () => {
        setIsLoading(true);
        const pub = await actDesactPublicacion(oferta.key, !oferta.activo);

        setOferta(pub);
        setIsLoading(false);
    };

    const onChange = (event, selectedDate) => {
        setCambio(true);
        const currentDate = selectedDate;
        setShow(false);

        if (viewDateP === "Domingo") {
            if (set === 1) {
                if (set1 === 1) {
                    setDomingoDesde(currentDate);
                }
                if (set1 === 2) {
                    setDomingoDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setDomingoHasta(currentDate);
                }
                if (set1 === 2) {
                    setDomingoHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Lunes") {
            if (set === 1) {
                if (set1 === 1) {
                    setLunesDesde(currentDate);
                }
                if (set1 === 2) {
                    setLunesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setLunesHasta(currentDate);
                }
                if (set1 === 2) {
                    setLunesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Martes") {
            if (set === 1) {
                if (set1 === 1) {
                    setMartesDesde(currentDate);
                }
                if (set1 === 2) {
                    setMartesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setMartesHasta(currentDate);
                }
                if (set1 === 2) {
                    setMartesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Miércoles") {
            if (set === 1) {
                if (set1 === 1) {
                    setMiercolesDesde(currentDate);
                }
                if (set1 === 2) {
                    setMiercolesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setMiercolesHasta(currentDate);
                }
                if (set1 === 2) {
                    setMiercolesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Jueves") {
            if (set === 1) {
                if (set1 === 1) {
                    setJuevesDesde(currentDate);
                }
                if (set1 === 2) {
                    setJuevesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setJuevesHasta(currentDate);
                }
                if (set1 === 2) {
                    setJuevesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Viernes") {
            if (set === 1) {
                if (set1 === 1) {
                    setViernesDesde(currentDate);
                }
                if (set1 === 2) {
                    setViernesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setViernesHasta(currentDate);
                }
                if (set1 === 2) {
                    setViernesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Sábado") {
            if (set === 1) {
                if (set1 === 1) {
                    setSabadoDesde(currentDate);
                }
                if (set1 === 2) {
                    setSabadoDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setSabadoHasta(currentDate);
                }
                if (set1 === 2) {
                    setSabadoHasta1(currentDate);
                }
            }
        } else {
            setDate(currentDate);
        }
    };

    const onChangeIos = (event, selectedDate) => {
        setCambio(true);
        const currentDate = selectedDate;

        if (viewDateP === "Domingo") {
            if (set === 1) {
                if (set1 === 1) {
                    setDomingoDesde(currentDate);
                }
                if (set1 === 2) {
                    setDomingoDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setDomingoHasta(currentDate);
                }
                if (set1 === 2) {
                    setDomingoHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Lunes") {
            if (set === 1) {
                if (set1 === 1) {
                    setLunesDesde(currentDate);
                }
                if (set1 === 2) {
                    setLunesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setLunesHasta(currentDate);
                }
                if (set1 === 2) {
                    setLunesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Martes") {
            if (set === 1) {
                if (set1 === 1) {
                    setMartesDesde(currentDate);
                }
                if (set1 === 2) {
                    setMartesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setMartesHasta(currentDate);
                }
                if (set1 === 2) {
                    setMartesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Miércoles") {
            if (set === 1) {
                if (set1 === 1) {
                    setMiercolesDesde(currentDate);
                }
                if (set1 === 2) {
                    setMiercolesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setMiercolesHasta(currentDate);
                }
                if (set1 === 2) {
                    setMiercolesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Jueves") {
            if (set === 1) {
                if (set1 === 1) {
                    setJuevesDesde(currentDate);
                }
                if (set1 === 2) {
                    setJuevesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setJuevesHasta(currentDate);
                }
                if (set1 === 2) {
                    setJuevesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Viernes") {
            if (set === 1) {
                if (set1 === 1) {
                    setViernesDesde(currentDate);
                }
                if (set1 === 2) {
                    setViernesDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setViernesHasta(currentDate);
                }
                if (set1 === 2) {
                    setViernesHasta1(currentDate);
                }
            }
        } else if (viewDateP === "Sábado") {
            if (set === 1) {
                if (set1 === 1) {
                    setSabadoDesde(currentDate);
                }
                if (set1 === 2) {
                    setSabadoDesde1(currentDate);
                }
            }
            if (set === 2) {
                if (set1 === 1) {
                    setSabadoHasta(currentDate);
                }
                if (set1 === 2) {
                    setSabadoHasta1(currentDate);
                }
            }
        } else {
            setDate(currentDate);
        }
    };

    const showMode = (currentMode) => {
        if (Platform.OS === "android") {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setShow(true);
        setMode(currentMode);
    };

    const showPicker = (value, dia, set, set1) => {
        setSet(set);
        setSet1(set1);
        setViewDateP(dia);
        showMode(value);
    };

    function handleGuardarFecha() {
        setCambio(true);
        setShow(false);
        setViewDateP("");
    }

    const handleEliminarDia = (dia) => {
        setCambio(true);
        setModalVisible2(!modalVisible2);
        if (dia === "Domingo") {
            setDomingoDesde("");
            setDomingoHasta("");
            setDomingoDesde1("");
            setDomingoHasta1("");
        }
        if (dia === "Lunes") {
            setLunesDesde("");
            setLunesHasta("");
            setLunesDesde1("");
            setLunesHasta1("");
        }
        if (dia === "Martes") {
            setMartesDesde("");
            setMartesHasta("");
            setMartesDesde1("");
            setMartesHasta1("");
        }
        if (dia === "Miércoles") {
            setMiercolesDesde("");
            setMiercolesHasta("");
            setMiercolesDesde1("");
            setMiercolesHasta1("");
        }
        if (dia === "Jueves") {
            setJuevesDesde("");
            setJuevesHasta("");
            setJuevesDesde1("");
            setJuevesHasta1("");
        }
        if (dia === "Viernes") {
            setViernesDesde("");
            setViernesHasta("");
            setViernesDesde1("");
            setViernesHasta1("");
        }
        if (dia === "Sábado") {
            setSabadoDesde("");
            setSabadoHasta("");
            setSabadoDesde1("");
            setSabadoHasta1("");
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (result.canceled === false) {
            //console.log("RESULTADO", result.assets[0]);

            //setImage(result.assets[0].uri);

            const manipResult = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 450, height: 450 } }],
                { compress: 1, format: SaveFormat.JPEG }
            );
            setImage(manipResult);
        }
    };

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(
            getStorage(),
            `publicacion/${Date.now()}-publicacion`
        );
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        setCambio(true);
        return await getDownloadURL(fileRef);
    }

    const [cambio, setCambio] = useState(null);

    const [image, setImage] = useState(null);
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

    const [titulo, setTitulo] = useState(route.params.oferta.titulo);
    const [centroS, setCentroS] = useState(route.params.oferta.centroS);
    const [direccion, setDireccion] = useState(route.params.oferta.direccion);
    const [desc, setDesc] = useState(route.params.oferta.desc);
    const [benef1, setBenef1] = useState(route.params.oferta.benef1);
    const [benef2, setBenef2] = useState(route.params.oferta.benef2);
    const [benef3, setBenef3] = useState(route.params.oferta.benef3);
    const [incluye, setIncluye] = useState(route.params.oferta.incluye);
    const [duracion, setDuracion] = useState(route.params.oferta.duracion);
    const [precio, setPrecio] = useState(route.params.oferta.precio);
    const [adicional, setAdicional] = useState(route.params.oferta.adicional);

    const [user, setUser] = useState("");
    const [especialidades, setEspecialidades] = useState("");
    const [especialidad, setEspecialidad] = useState(
        route.params.oferta.especialidad
    );
    const [subEspecialidades, setSubEspecialidades] = useState("");
    const [subEspecialidad, setSubEspecialidad] = useState(
        route.params.oferta.subEspecialidad
    );
    const [tipoOf, setTipoOf] = useState(route.params.oferta.tipoOf);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [diaModal, setDiaModal] = useState("");

    var today = new Date();
    today = new Date(today.setHours(today.getHours() - 4));

    const [date, setDate] = useState(today);
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const [viewDateP, setViewDateP] = useState("");
    const [set, setSet] = useState("");
    const [set1, setSet1] = useState("");
    const [parHoras2, setParHoras2] = useState(false);
    const [domingoDesde, setDomingoDesde] = useState(
        route.params.oferta.domingoDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.domingoDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [domingoHasta, setDomingoHasta] = useState(
        route.params.oferta.domingoHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.domingoHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [domingoDesde1, setDomingoDesde1] = useState(
        route.params.oferta.domingoDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.domingoDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [domingoHasta1, setDomingoHasta1] = useState(
        route.params.oferta.domingoHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.domingoHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [lunesDesde, setLunesDesde] = useState(
        route.params.oferta.lunesDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.lunesDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [lunesHasta, setLunesHasta] = useState(
        route.params.oferta.lunesHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.lunesHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [lunesDesde1, setLunesDesde1] = useState(
        route.params.oferta.lunesDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.lunesDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [lunesHasta1, setLunesHasta1] = useState(
        route.params.oferta.lunesHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.lunesHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [martesDesde, setMartesDesde] = useState(
        route.params.oferta.martesDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.martesDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [martesHasta, setMartesHasta] = useState(
        route.params.oferta.martesHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.martesHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [martesDesde1, setMartesDesde1] = useState(
        route.params.oferta.martesDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.martesDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [martesHasta1, setMartesHasta1] = useState(
        route.params.oferta.martesHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.martesHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [miercolesDesde, setMiercolesDesde] = useState(
        route.params.oferta.miercolesDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.miercolesDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [miercolesHasta, setMiercolesHasta] = useState(
        route.params.oferta.miercolesHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.miercolesHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [miercolesDesde1, setMiercolesDesde1] = useState(
        route.params.oferta.miercolesDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.miercolesDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [miercolesHasta1, setMiercolesHasta1] = useState(
        route.params.oferta.miercolesHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.miercolesHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [juevesDesde, setJuevesDesde] = useState(
        route.params.oferta.juevesDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.juevesDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [juevesHasta, setJuevesHasta] = useState(
        route.params.oferta.juevesHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.juevesHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [juevesDesde1, setJuevesDesde1] = useState(
        route.params.oferta.juevesDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.juevesDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [juevesHasta1, setJuevesHasta1] = useState(
        route.params.oferta.juevesHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.juevesHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [viernesDesde, setViernesDesde] = useState(
        route.params.oferta.viernesDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.viernesDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [viernesHasta, setViernesHasta] = useState(
        route.params.oferta.viernesHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.viernesHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [viernesDesde1, setViernesDesde1] = useState(
        route.params.oferta.viernesDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.viernesDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [viernesHasta1, setViernesHasta1] = useState(
        route.params.oferta.viernesHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.viernesHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [sabadoDesde, setSabadoDesde] = useState(
        route.params.oferta.sabadoDesde === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.sabadoDesde,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [sabadoHasta, setSabadoHasta] = useState(
        route.params.oferta.sabadoHasta === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.sabadoHasta,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [sabadoDesde1, setSabadoDesde1] = useState(
        route.params.oferta.sabadoDesde1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.sabadoDesde1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );
    const [sabadoHasta1, setSabadoHasta1] = useState(
        route.params.oferta.sabadoHasta1 === ""
            ? ""
            : moment(
                  "2018-07-17 " + route.params.oferta.sabadoHasta1,
                  "YYYY-MM-DD, hh:mm A"
              )
    );

    useEffect(() => {
        setOferta(route.params.oferta);

        setUser(store.getState().user.payload);

        let esp = store.getState().user.payload.especialidades;
        esp = esp.map((item) => {
            let reg = item;
            reg = {
                ["key"]: item.name,
                ["label"]: item.name,
                ["value"]: item.name,
                ...item,
            };
            return reg;
        });
        setEspecialidades(esp);
    }, []);

    const tipoOferta = [
        {
            key: 0,
            label: "Consultas Médicas Tratamientos Controles",
        },
        {
            key: 1,
            label: "Exámenes Médicos Radiología Laboratorio",
        },
        {
            key: 2,
            label: "Cirugías Intervenciones Extracciones",
        },
    ];

    const tipoDurac = [
        {
            key: 0,
            label: "30 min",
            value: 30,
        },
        {
            key: 1,
            label: "45 min",
            value: 45,
        },
        {
            key: 2,
            label: "59 min",
            value: 59,
        },
    ];

    if (isLoading || !especialidades) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: -80,
                }}
            >
                <Text
                    style={{
                        fontFamily: "Quicksand-Medium",
                        fontSize: 20,
                        marginBottom: 10,
                    }}
                >
                    Espere por favor...
                </Text>
                <ActivityIndicator size={50} color={Colors.greeEk} />
            </View>
        );
    }

    const handleEspChange = (option) => {
        setCambio(true);
        setEspecialidad(option);

        if (option.sub_especialidad) {
            let subesp = option.sub_especialidad;

            subesp = subesp.map((item) => {
                let reg = item;
                reg = {
                    ["key"]: item.name,
                    ["label"]: item.name,
                    ["value"]: item.name,
                    ...item,
                };
                return reg;
            });

            setSubEspecialidades(subesp);
        }
    };

    const handlePublicar = async () => {
        const user = await AsyncStorage.getItem("@currentUser");

        if (especialidad === undefined || especialidad === "") {
            Alert.alert("Atención!", "Debe Seleccionar una Especialidad");
        } else if (especialidad.sub_especialidad && subEspecialidad === "") {
            Alert.alert("Atención!", "Debe Seleccionar una Sub-especialidad");
        } else if (tipoOf === undefined || tipoOf === "") {
            Alert.alert("Atención!", "Debe Seleccionar el Tipo de la Oferta");
        } else if (titulo === undefined || titulo === "") {
            Alert.alert("Atención!", "Debe Cargar el Título");
        } else if (centroS === undefined || centroS === "") {
            Alert.alert(
                "Atención!",
                "Debe Cargar el Centro de Salud o Consultorio"
            );
        } else if (direccion === undefined || direccion === "") {
            Alert.alert("Atención!", "Debe Cargar la Dirección");
        } else if (desc === undefined || desc === "") {
            Alert.alert("Atención!", "Debe Cargar la Descripción");
        } else if (benef1 === undefined || benef1 === "") {
            Alert.alert("Atención!", "Debe Cargar el primer Beneficio");
        } else if (benef2 === undefined || benef2 === "") {
            Alert.alert("Atención!", "Debe Cargar el segundo Beneficio");
        } else if (benef3 === undefined || benef3 === "") {
            Alert.alert("Atención!", "Debe Cargar el tercer Beneficio");
        } else if (incluye === undefined || incluye === "") {
            Alert.alert("Atención!", "Debe Cargar que Incluye");
        } else if (duracion === undefined || duracion === "") {
            Alert.alert("Atención!", "Debe Cargar la Duración");
        } else if (precio === undefined || precio === "") {
            Alert.alert("Atención!", "Debe Cargar el Precio");
        } else {
            if (
                domingoDesde === "" &&
                domingoDesde1 === "" &&
                domingoHasta === "" &&
                domingoHasta1 === "" &&
                lunesDesde === "" &&
                lunesDesde1 === "" &&
                lunesHasta === "" &&
                lunesHasta1 === "" &&
                martesDesde === "" &&
                martesDesde1 === "" &&
                martesHasta === "" &&
                martesHasta1 === "" &&
                miercolesDesde === "" &&
                miercolesDesde1 === "" &&
                miercolesHasta === "" &&
                miercolesHasta1 === "" &&
                juevesDesde === "" &&
                juevesDesde1 === "" &&
                juevesHasta === "" &&
                juevesHasta1 === "" &&
                viernesDesde === "" &&
                viernesDesde1 === "" &&
                viernesHasta === "" &&
                viernesHasta1 === "" &&
                sabadoDesde === "" &&
                sabadoDesde1 === "" &&
                sabadoHasta === "" &&
                sabadoHasta1 === ""
            ) {
                Alert.alert(
                    "Atención!",
                    "Todos los horarios se encuentran Cerrados"
                );
            }
            setIsLoading(true);
            setIsLoadingPhoto(true);

            try {
                let uploadUrl = route.params.oferta.image;
                if (image === undefined || image === null) {
                    console.log("No hay cambio de imagen");
                } else {
                    const imageRef = ref(getStorage(), uploadUrl);
                    deleteObject(imageRef)
                        .then(() => {
                            console.log("la imagen se elimino");
                        })
                        .catch((error) => {
                            console.log("=>ocurrio un error: ", error);
                        });
                    uploadUrl = await uploadImageAsync(image.uri);
                }

                await updatePublicacion(
                    route.params.oferta.key,
                    JSON.parse(user).uid,
                    titulo,
                    centroS,
                    direccion,
                    desc,
                    incluye,
                    duracion,
                    precio,
                    uploadUrl,
                    domingoDesde === ""
                        ? ""
                        : moment(domingoDesde).format("hh:mm a"),
                    domingoDesde1 === ""
                        ? ""
                        : moment(domingoDesde1).format("hh:mm a"),
                    domingoHasta === ""
                        ? ""
                        : moment(domingoHasta).format("hh:mm a"),
                    domingoHasta1 === ""
                        ? ""
                        : moment(domingoHasta1).format("hh:mm a"),
                    lunesDesde === ""
                        ? ""
                        : moment(lunesDesde).format("hh:mm a"),
                    lunesDesde1 === ""
                        ? ""
                        : moment(lunesDesde1).format("hh:mm a"),
                    lunesHasta === ""
                        ? ""
                        : moment(lunesHasta).format("hh:mm a"),
                    lunesHasta1 === ""
                        ? ""
                        : moment(lunesHasta1).format("hh:mm a"),
                    martesDesde === ""
                        ? ""
                        : moment(martesDesde).format("hh:mm a"),
                    martesDesde1 === ""
                        ? ""
                        : moment(martesDesde1).format("hh:mm a"),
                    martesHasta === ""
                        ? ""
                        : moment(martesHasta).format("hh:mm a"),
                    martesHasta1 === ""
                        ? ""
                        : moment(martesHasta1).format("hh:mm a"),
                    miercolesDesde === ""
                        ? ""
                        : moment(miercolesDesde).format("hh:mm a"),
                    miercolesDesde1 === ""
                        ? ""
                        : moment(miercolesDesde1).format("hh:mm a"),
                    miercolesHasta === ""
                        ? ""
                        : moment(miercolesHasta).format("hh:mm a"),
                    miercolesHasta1 === ""
                        ? ""
                        : moment(miercolesHasta1).format("hh:mm a"),
                    juevesDesde === ""
                        ? ""
                        : moment(juevesDesde).format("hh:mm a"),
                    juevesDesde1 === ""
                        ? ""
                        : moment(juevesDesde1).format("hh:mm a"),
                    juevesHasta === ""
                        ? ""
                        : moment(juevesHasta).format("hh:mm a"),
                    juevesHasta1 === ""
                        ? ""
                        : moment(juevesHasta1).format("hh:mm a"),
                    viernesDesde === ""
                        ? ""
                        : moment(viernesDesde).format("hh:mm a"),
                    viernesDesde1 === ""
                        ? ""
                        : moment(viernesDesde1).format("hh:mm a"),
                    viernesHasta === ""
                        ? ""
                        : moment(viernesHasta).format("hh:mm a"),
                    viernesHasta1 === ""
                        ? ""
                        : moment(viernesHasta1).format("hh:mm a"),
                    sabadoDesde === ""
                        ? ""
                        : moment(sabadoDesde).format("hh:mm a"),
                    sabadoDesde1 === ""
                        ? ""
                        : moment(sabadoDesde1).format("hh:mm a"),
                    sabadoHasta === ""
                        ? ""
                        : moment(sabadoHasta).format("hh:mm a"),
                    sabadoHasta1 === ""
                        ? ""
                        : moment(sabadoHasta1).format("hh:mm a"),
                    especialidad.name === undefined
                        ? especialidad
                        : especialidad.name,
                    subEspecialidad === ""
                        ? ""
                        : subEspecialidad.name === undefined
                        ? subEspecialidad
                        : subEspecialidad.name,
                    tipoOf,
                    benef1,
                    benef2,
                    benef3,
                    adicional
                )
                    .then((data) => {
                        Alert.alert(data, "Oferta editada!");
                        setIsLoading(false);
                        //navigation.goBack();
                    })
                    .catch((error) => {
                        Alert.alert("Error", error.message);
                        setIsLoading(false);
                    });
            } catch (e) {
                console.log(e);
                Alert.alert("Ocurrió un error al editar");
                setIsLoading(false);
            } finally {
                setIsLoadingPhoto(false);
                setIsLoading(false);
                navigation.goBack();
            }
        }
    };

    function renderViewModal() {
        return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Domingo");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Domingo</Text>
                            <Text style={styles.horaText}>
                                {domingoDesde === "" && domingoHasta === ""
                                    ? "Cerrado"
                                    : moment(domingoDesde).format("hh:mm a") +
                                      " - " +
                                      moment(domingoHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {domingoDesde1 === "" && domingoHasta1 === ""
                                    ? ""
                                    : moment(domingoDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(domingoHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Lunes");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Lunes</Text>
                            <Text style={styles.horaText}>
                                {lunesDesde === "" && lunesHasta === ""
                                    ? "Cerrado"
                                    : moment(lunesDesde).format("hh:mm a") +
                                      " - " +
                                      moment(lunesHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {lunesDesde1 === "" && lunesHasta1 === ""
                                    ? ""
                                    : moment(lunesDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(lunesHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Martes");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Martes</Text>
                            <Text style={styles.horaText}>
                                {martesDesde === "" && martesHasta === ""
                                    ? "Cerrado"
                                    : moment(martesDesde).format("hh:mm a") +
                                      " - " +
                                      moment(martesHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {martesDesde1 === "" && martesHasta1 === ""
                                    ? ""
                                    : moment(martesDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(martesHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Miércoles");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Miércoles</Text>
                            <Text style={styles.horaText}>
                                {miercolesDesde === "" && miercolesHasta === ""
                                    ? "Cerrado"
                                    : moment(miercolesDesde).format("hh:mm a") +
                                      " - " +
                                      moment(miercolesHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {miercolesDesde1 === "" &&
                                miercolesHasta1 === ""
                                    ? ""
                                    : moment(miercolesDesde1).format(
                                          "hh:mm a"
                                      ) +
                                      " - " +
                                      moment(miercolesHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Jueves");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Jueves</Text>
                            <Text style={styles.horaText}>
                                {juevesDesde === "" && juevesHasta === ""
                                    ? "Cerrado"
                                    : moment(juevesDesde).format("hh:mm a") +
                                      " - " +
                                      moment(juevesHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {juevesDesde1 === "" && juevesHasta1 === ""
                                    ? ""
                                    : moment(juevesDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(juevesHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Viernes");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Viernes</Text>
                            <Text style={styles.horaText}>
                                {viernesDesde === "" && viernesHasta === ""
                                    ? "Cerrado"
                                    : moment(viernesDesde).format("hh:mm a") +
                                      " - " +
                                      moment(viernesHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {viernesDesde1 === "" && viernesHasta1 === ""
                                    ? ""
                                    : moment(viernesDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(viernesHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.diaStyle}
                        onPress={() => {
                            setModalVisible2(true);
                            setDiaModal("Sábado");
                            setParHoras2(false);
                        }}
                    >
                        <View>
                            <Text style={styles.diaText}>Sábado</Text>
                            <Text style={styles.horaText}>
                                {sabadoDesde === "" && sabadoHasta === ""
                                    ? "Cerrado"
                                    : moment(sabadoDesde).format("hh:mm a") +
                                      " - " +
                                      moment(sabadoHasta).format("hh:mm a")}
                            </Text>
                            <Text style={styles.horaText}>
                                {sabadoDesde1 === "" && sabadoHasta1 === ""
                                    ? ""
                                    : moment(sabadoDesde1).format("hh:mm a") +
                                      " - " +
                                      moment(sabadoHasta1).format("hh:mm a")}
                            </Text>
                        </View>
                        <Image
                            source={icons.adelante}
                            style={{ width: 15, height: 15 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            { backgroundColor: Colors.lightRed },
                        ]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textButton}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderViewModal2() {
        return (
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View
                        style={{
                            borderBottomColor: "black",
                            borderBottomWidth: 0.5,
                            marginBottom: 15,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => setModalVisible2(!modalVisible2)}
                            style={{
                                marginBottom: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                height: 40,
                            }}
                        >
                            <Image
                                source={icons.atras}
                                style={{ width: 20, height: 20 }}
                            />
                            <Text
                                style={[
                                    styles.modalTextTitle,
                                    { marginLeft: 30 },
                                ]}
                            >
                                {diaModal}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {diaModal === "Domingo" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        domingoDesde === ""
                                            ? date
                                            : domingoDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoDesde === ""
                                                        ? date
                                                        : domingoDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoDesde === ""
                                                        ? date
                                                        : domingoDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        domingoHasta === ""
                                            ? date
                                            : domingoHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoHasta === ""
                                                        ? date
                                                        : domingoHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoHasta === ""
                                                        ? date
                                                        : domingoHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Lunes" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        lunesDesde === "" ? date : lunesDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesDesde === ""
                                                        ? date
                                                        : lunesDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesDesde === ""
                                                        ? date
                                                        : lunesDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        lunesHasta === "" ? date : lunesHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesHasta === ""
                                                        ? date
                                                        : lunesHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesHasta === ""
                                                        ? date
                                                        : lunesHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Martes" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        martesDesde === "" ? date : martesDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesDesde === ""
                                                        ? date
                                                        : martesDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesDesde === ""
                                                        ? date
                                                        : martesDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        martesHasta === "" ? date : martesHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesHasta === ""
                                                        ? date
                                                        : martesHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesHasta === ""
                                                        ? date
                                                        : martesHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Miércoles" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        miercolesDesde === ""
                                            ? date
                                            : miercolesDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesDesde === ""
                                                        ? date
                                                        : miercolesDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesDesde === ""
                                                        ? date
                                                        : miercolesDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        miercolesHasta === ""
                                            ? date
                                            : miercolesHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesHasta === ""
                                                        ? date
                                                        : miercolesHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesHasta === ""
                                                        ? date
                                                        : miercolesHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Jueves" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        juevesDesde === "" ? date : juevesDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesDesde === ""
                                                        ? date
                                                        : juevesDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesDesde === ""
                                                        ? date
                                                        : juevesDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        juevesHasta === "" ? date : juevesHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesHasta === ""
                                                        ? date
                                                        : juevesHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesHasta === ""
                                                        ? date
                                                        : juevesHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Viernes" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        viernesDesde === ""
                                            ? date
                                            : viernesDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesDesde === ""
                                                        ? date
                                                        : viernesDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesDesde === ""
                                                        ? date
                                                        : viernesDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        viernesHasta === ""
                                            ? date
                                            : viernesHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesHasta === ""
                                                        ? date
                                                        : viernesHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesHasta === ""
                                                        ? date
                                                        : viernesHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {diaModal === "Sábado" && (
                        <>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 1)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        sabadoDesde === "" ? date : sabadoDesde
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoDesde === ""
                                                        ? date
                                                        : sabadoDesde
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoDesde === ""
                                                        ? date
                                                        : sabadoDesde
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 1)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        sabadoHasta === "" ? date : sabadoHasta
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoHasta === ""
                                                        ? date
                                                        : sabadoHasta
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 1 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoHasta === ""
                                                        ? date
                                                        : sabadoHasta
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => handleEliminarDia(diaModal)}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {!parHoras2 && (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: Colors.white,
                                    marginTop: 15,
                                },
                            ]}
                            onPress={() => setParHoras2(!parHoras2)}
                        >
                            <Text
                                style={[
                                    styles.textButton,
                                    { color: Colors.black },
                                ]}
                            >
                                Agregar otro set de horas
                            </Text>
                        </TouchableOpacity>
                    )}

                    {parHoras2 && diaModal === "Domingo" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        domingoDesde1 === ""
                                            ? date
                                            : domingoDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoDesde1 === ""
                                                        ? date
                                                        : domingoDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoDesde1 === ""
                                                        ? date
                                                        : domingoDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        domingoHasta1 === ""
                                            ? date
                                            : domingoHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoHasta1 === ""
                                                        ? date
                                                        : domingoHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    domingoHasta1 === ""
                                                        ? date
                                                        : domingoHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setDomingoDesde1("");
                                    setDomingoHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Lunes" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        lunesDesde1 === "" ? date : lunesDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesDesde1 === ""
                                                        ? date
                                                        : lunesDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesDesde1 === ""
                                                        ? date
                                                        : lunesDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        lunesHasta1 === "" ? date : lunesHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesHasta1 === ""
                                                        ? date
                                                        : lunesHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    lunesHasta1 === ""
                                                        ? date
                                                        : lunesHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setLunesDesde1("");
                                    setLunesHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Martes" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        martesDesde1 === ""
                                            ? date
                                            : martesDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesDesde1 === ""
                                                        ? date
                                                        : martesDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesDesde1 === ""
                                                        ? date
                                                        : martesDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        martesHasta1 === ""
                                            ? date
                                            : martesHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesHasta1 === ""
                                                        ? date
                                                        : martesHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    martesHasta1 === ""
                                                        ? date
                                                        : martesHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setMartesDesde1("");
                                    setMartesHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Miércoles" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        miercolesDesde1 === ""
                                            ? date
                                            : miercolesDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesDesde1 === ""
                                                        ? date
                                                        : miercolesDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesDesde1 === ""
                                                        ? date
                                                        : miercolesDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        miercolesHasta1 === ""
                                            ? date
                                            : miercolesHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesHasta1 === ""
                                                        ? date
                                                        : miercolesHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    miercolesHasta1 === ""
                                                        ? date
                                                        : miercolesHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setMiercolesDesde1("");
                                    setMiercolesHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Jueves" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        juevesDesde1 === ""
                                            ? date
                                            : juevesDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesDesde1 === ""
                                                        ? date
                                                        : juevesDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesDesde1 === ""
                                                        ? date
                                                        : juevesDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        juevesHasta1 === ""
                                            ? date
                                            : juevesHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesHasta1 === ""
                                                        ? date
                                                        : juevesHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    juevesHasta1 === ""
                                                        ? date
                                                        : juevesHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setJuevesDesde1("");
                                    setJuevesHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Viernes" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        viernesDesde1 === ""
                                            ? date
                                            : viernesDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesDesde1 === ""
                                                        ? date
                                                        : viernesDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesDesde1 === ""
                                                        ? date
                                                        : viernesDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        viernesHasta1 === ""
                                            ? date
                                            : viernesHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesHasta1 === ""
                                                        ? date
                                                        : viernesHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    viernesHasta1 === ""
                                                        ? date
                                                        : viernesHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setViernesDesde1("");
                                    setViernesHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {parHoras2 && diaModal === "Sábado" && (
                        <View style={{ marginTop: 15 }}>
                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 1, 2)
                                }
                            >
                                <Text style={styles.diaText}>Desde</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        sabadoDesde1 === ""
                                            ? date
                                            : sabadoDesde1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoDesde1 === ""
                                                        ? date
                                                        : sabadoDesde1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 1 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoDesde1 === ""
                                                        ? date
                                                        : sabadoDesde1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.diaStyle}
                                onPress={() =>
                                    showPicker("time", diaModal, 2, 2)
                                }
                            >
                                <Text style={styles.diaText}>Hasta</Text>
                                <Text style={styles.horaText}>
                                    {moment(
                                        sabadoHasta1 === ""
                                            ? date
                                            : sabadoHasta1
                                    ).format("hh:mm a")}
                                </Text>

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "ios" && (
                                        <View style={{ width: "70%" }}>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoHasta1 === ""
                                                        ? date
                                                        : sabadoHasta1
                                                }
                                                mode={mode}
                                                is24Hour={false}
                                                onChange={onChangeIos}
                                                display="spinner"
                                                locale={"es-ES"}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:
                                                        Colors.greeEk,
                                                    borderRadius: 10,
                                                    height: 35,
                                                    padding: 6,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                                onPress={() =>
                                                    handleGuardarFecha()
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            "Quicksand-Medium",
                                                        color: Colors.white,
                                                    }}
                                                >
                                                    Seleccionar
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                {show &&
                                    viewDateP === diaModal &&
                                    set === 2 &&
                                    set1 === 2 &&
                                    Platform.OS === "android" && (
                                        <View>
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={
                                                    sabadoHasta1 === ""
                                                        ? date
                                                        : sabadoHasta1
                                                }
                                                mode={mode}
                                                onChange={onChange}
                                                display="default"
                                                locale={"es-ES"}
                                            />
                                        </View>
                                    )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: Colors.red },
                                ]}
                                onPress={() => {
                                    setParHoras2(!parHoras2);
                                    setSabadoDesde1("");
                                    setSabadoHasta1("");
                                }}
                            >
                                <Text style={styles.textButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    }

    function renderView() {
        return (
            <ScrollView
                style={{
                    //flex: 1,
                    backgroundColor: Colors.white,
                    width: "100%",
                }}
                showsVerticalScrollIndicator={false}
            >
                <StatusBar style="dark" />

                <View
                    style={{
                        alignItems: "center",
                        backgroundColor: Colors.white,
                        flex: 1,
                        marginBottom: 120,
                    }}
                >
                    <View
                        style={[
                            styles.viewInput,
                            { marginTop: 10, width: "110%" },
                        ]}
                    >
                        <SelectModal
                            data={especialidades}
                            onChange={(option) => {
                                handleEspChange(option);
                            }}
                            label={"Especialidad de la Oferta"}
                            placeholder={"Selecciona una Especialidad"}
                            value={
                                especialidad?.label === undefined
                                    ? especialidad
                                    : especialidad?.label
                            }
                        />
                    </View>

                    {!especialidad?.sub_especialidad &&
                        subEspecialidad !== "" && (
                            <View style={[styles.viewInput, { marginTop: 8 }]}>
                                <Text style={styles.tituloInput}>
                                    Sub-especialidad de la Oferta:
                                </Text>
                                <Text
                                    style={[
                                        styles.horaText,
                                        {
                                            alignSelf: "flex-start",
                                            marginTop: 5,
                                            backgroundColor: Colors.light2,
                                            padding: 5,
                                        },
                                    ]}
                                >
                                    {subEspecialidad}
                                </Text>
                            </View>
                        )}

                    {especialidad?.sub_especialidad && (
                        <View
                            style={[
                                styles.viewInput,
                                { marginTop: 10, width: "110%" },
                            ]}
                        >
                            <SelectModal
                                data={subEspecialidades}
                                onChange={(option) => {
                                    setCambio(true);
                                    setSubEspecialidad(option);
                                }}
                                label={"Sub-especialidad de la Oferta"}
                                placeholder={"Selecciona una Sub-especialidad"}
                                value={
                                    subEspecialidad?.label === undefined
                                        ? subEspecialidad
                                        : subEspecialidad?.label
                                }
                            />
                        </View>
                    )}

                    <View
                        style={[
                            styles.viewInput,
                            { marginTop: 10, width: "110%" },
                        ]}
                    >
                        <SelectModal
                            data={tipoOferta}
                            onChange={(option) => {
                                setCambio(true);
                                setTipoOf(option);
                            }}
                            label={"Tipo de la Oferta"}
                            placeholder={"Selecciona un Tipo"}
                            value={tipoOf?.label}
                            selectStyle={{ height: 60 }}
                        />
                    </View>

                    <View style={[styles.viewInput, { marginTop: 10 }]}>
                        <Text style={styles.tituloInput}>Título:</Text>
                        <TextInput
                            placeholder="Ortodoncia invisible"
                            style={styles.input}
                            value={titulo}
                            onChangeText={(text) => {
                                setCambio(true);
                                setTitulo(text);
                            }}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Nombre del centro de salud o consultorio:
                        </Text>
                        <TextInput
                            placeholder="Unidad Odontológica María Rivas"
                            style={styles.input}
                            value={centroS}
                            onChangeText={(text) => {
                                setCambio(true);
                                setCentroS(text);
                            }}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Dirección de prestación del servicio:
                        </Text>
                        <TextInput
                            placeholder="Calle Paez, Nro.10, Chacaito, Torre Persa, piso 4, Ofic. E-3, Caracas"
                            style={[styles.input, { height: 100 }]}
                            value={direccion}
                            onChangeText={(text) => {
                                setCambio(true);
                                setDireccion(text);
                            }}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Programar Agenda:
                        </Text>

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Cerrado.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            {modalVisible2
                                ? renderViewModal2()
                                : renderViewModal()}
                        </Modal>
                        <TouchableOpacity
                            style={[styles.button2]}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text
                                style={[
                                    styles.textStyle,
                                    { color: Colors.black },
                                ]}
                            >
                                Seleccione Día y Hora
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Descripción del servicio:
                        </Text>
                        <TextInput
                            placeholder="Tratamiento dental para la corrección de anomalías de posición de los dientes, desplazamientos o irregularidades con alineadores transparentes."
                            style={[styles.input, { height: 110 }]}
                            multiline={true}
                            value={desc}
                            onChangeText={(text) => {
                                setCambio(true);
                                setDesc(text);
                            }}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Beneficios:
                        </Text>
                        <TextInput
                            placeholder="Beneficio 1."
                            style={[styles.input, { height: 50 }]}
                            multiline={true}
                            value={benef1}
                            onChangeText={(text) => {
                                setCambio(true);
                                setBenef1(text);
                            }}
                        />
                        <TextInput
                            placeholder="Beneficio 2."
                            style={[styles.input, { height: 50 }]}
                            multiline={true}
                            value={benef2}
                            onChangeText={(text) => {
                                setCambio(true);
                                setBenef2(text);
                            }}
                        />
                        <TextInput
                            placeholder="Beneficio 3."
                            style={[styles.input, { height: 50 }]}
                            multiline={true}
                            value={benef3}
                            onChangeText={(text) => {
                                setCambio(true);
                                setBenef3(text);
                            }}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Mención concreta de lo que INCLUYE la Oferta:
                        </Text>
                        <TextInput
                            placeholder="Estudio, Plan de Tratamiento, Seguimiento, Alineadores y Garantía de Resultado Perfecto."
                            style={[styles.input]}
                            value={incluye}
                            onChangeText={(text) => {
                                setCambio(true);
                                setIncluye(text);
                            }}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View
                        style={[
                            styles.viewInput,
                            { marginBottom: 10, width: "110%" },
                        ]}
                    >
                        <SelectModal
                            data={tipoDurac}
                            onChange={(option) => {
                                setCambio(true);
                                setDuracion(option);
                            }}
                            label={"Tiempo estimado por Sesión o Consulta:"}
                            placeholder={"Selecciona uno"}
                            value={duracion?.label}
                            selectStyle={{ height: 40 }}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Precio ($):
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                marginVertical: 8,
                                marginBottom: 12,
                                alignSelf: "center",
                                width: "95%",
                                justifyContent: "space-between",
                            }}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.buttonPrecio,
                                    {
                                        backgroundColor:
                                            precio ===
                                            "Requiere Evaluación Previa"
                                                ? Colors.skyBlue
                                                : Colors.white,
                                    },
                                ]}
                                onPress={() => {
                                    setCambio(true);
                                    setPrecio("Requiere Evaluación Previa");
                                }}
                            >
                                <Text style={styles.textStylePrecio}>
                                    Requiere Evaluación Previa
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.buttonPrecio,
                                    {
                                        backgroundColor:
                                            precio !==
                                            "Requiere Evaluación Previa"
                                                ? Colors.skyBlue
                                                : Colors.white,
                                    },
                                ]}
                                onPress={() => {
                                    setCambio(true);
                                    setPrecio("");
                                }}
                            >
                                <Text style={styles.textStylePrecio}>
                                    Precio por Sesión o Consulta
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {precio !== "Requiere Evaluación Previa" && (
                            <TextInput
                                placeholder="10.50"
                                style={[styles.input, { height: 35 }]}
                                value={precio}
                                onChangeText={(text) => {
                                    setCambio(true);
                                    setPrecio(text);
                                }}
                                keyboardType="numeric"
                            />
                        )}
                    </View>

                    <View style={styles.viewInput}>
                        <Text style={styles.tituloInput} numberOfLines={2}>
                            Información Adicional (opcional):
                        </Text>
                        <TextInput
                            style={[styles.input]}
                            value={adicional}
                            onChangeText={(text) => {
                                setCambio(true);
                                setAdicional(text);
                            }}
                            multiline={true}
                            numberOfLines={3}
                        />
                    </View>

                    <View style={styles.separador} />

                    <Image
                        source={{ uri: route.params.oferta.image }}
                        style={{
                            height: 200,
                            width: "100%",
                            marginBottom: 5,
                            resizeMode: "contain",
                        }}
                    />

                    <View style={styles.viewInput}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => pickImage()}
                        >
                            <Text style={styles.textButton}>
                                Seleccione otra Imágen
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            marginVertical: 10,
                            height: 70,
                            backgroundColor: Colors.light2,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.white,
                                padding: 10,
                                borderRadius: 10,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[styles.modalText, { marginRight: 10 }]}
                            >
                                Publicar mi Oferta de Servicio
                            </Text>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#96FF81",
                                }}
                                thumbColor={
                                    oferta.activo ? "#4BF54E" : "#f4f3f4"
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleChangeAct}
                                value={oferta.activo}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewInput}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: cambio
                                        ? Colors.greeEk
                                        : Colors.greenAlpha,
                                    alignSelf: "flex-end",
                                },
                            ]}
                            onPress={() => handlePublicar()}
                        >
                            <Text style={styles.textButton}>
                                Guardar Cambios
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    return (
        <View style={{ backgroundColor: Colors.white }}>
            {Platform.OS === "android" && renderView()}

            {Platform.OS === "ios" && (
                <KeyboardAvoidingView
                    behavior="position"
                    style={{
                        alignItems: "center",
                        backgroundColor: Colors.white,
                        alignSelf: "center",
                    }}
                >
                    {renderView()}
                </KeyboardAvoidingView>
            )}
        </View>
    );
};

export default VerOfertaScreen;

const styles = StyleSheet.create({
    separador: {
        width: "95%",
        borderWidth: 1,
        borderColor: Colors.light,
        marginVertical: 10,
    },
    viewInput: {
        alignItems: "center",
        width: "95%",
    },
    tituloInput: {
        fontFamily: "Quicksand-Medium",
        marginRight: 8,
        fontSize: 16,
        marginBottom: 5,
        alignSelf: "flex-start",
    },
    subtituloInput: {
        fontFamily: "Quicksand-Regular",
        marginRight: 8,
        fontSize: 15,
        marginBottom: 5,
    },
    input: {
        fontSize: 15,
        fontFamily: "Quicksand-Medium",
        maxWidth: "100%",
        minWidth: "100%",
        height: 80,
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 6,
        textAlignVertical: "top",
        shadowColor: Colors.greeEk,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
        borderColor: Colors.light2,
        borderWidth: 1,
        marginBottom: 10,
    },
    button: {
        height: 45,
        backgroundColor: Colors.greeEk,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 15,
        elevation: 2,
    },
    textButton: {
        fontFamily: "Quicksand-Medium",
        color: Colors.white,
    },
    button2: {
        height: 35,
        backgroundColor: Colors.light2,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 18,
        width: "100%",
        borderWidth: 2.5,
        borderColor: Colors.greeEk,
        elevation: 4,
    },
    textButton2: {
        fontFamily: "Quicksand-Medium",
        color: Colors.black,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
    },
    buttonOpen: {
        backgroundColor: Colors.green2,
    },
    buttonClose: {
        backgroundColor: Colors.red,
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontFamily: "Quicksand-Medium",
    },
    modalTextTitle: {
        fontFamily: "Quicksand-Medium",
        fontSize: 16,
    },
    modalText: {
        //marginBottom: 15,
        //textAlign: "center",
        fontFamily: "Quicksand-Medium",
    },
    diaStyle: {
        flexDirection: "row",
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 40,
    },
    diaText: {
        fontFamily: "Quicksand-Medium",
    },
    horaText: {
        fontFamily: "Quicksand-Regular",
    },
    buttonPrecio: {
        elevation: 4,
        borderWidth: 0.5,
        borderColor: Colors.darkGray,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
    },
    textStylePrecio: {
        fontFamily: "Quicksand-Regular",
        fontSize: 12,
    },
});
