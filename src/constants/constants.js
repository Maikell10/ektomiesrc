import icons from "./icons";

const especialidades = [
    {
        id: 0,
        name: "Todas",
        icon: icons.eye,
    },
    {
        id: 1,
        name: "Odontología",
        icon: icons.esp_odont,
    },
    {
        id: 2,
        name: "Oftalmología",
        icon: icons.esp_oftal,
    },
    {
        id: 3,
        name: "Traumatología",
        icon: icons.esp_trauma,
    },
];

const especialistas = [
    {
        id: 1,
        name: "Dr Olivos",
    },
    {
        id: 2,
        name: "Dr Quiroz",
    },
    {
        id: 3,
        name: "Dra Melendez",
    },
    {
        id: 4,
        name: "Dr Cagil",
    },
    {
        id: 5,
        name: "Dra Merrigold",
    },
];

const onboarding_screens = [
    {
        id: 1,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/corazon.png"),
        title: "Elige tu Bienestar",
        description:
            "Con Ektomie App tendrás el mejor catálogo en lo que a tu salud respecta.",
    },
    {
        id: 2,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/doctor.png"),
        title: "Profesionales de Calidad",
        description:
            "Hacemos que cuidar de tu salud sea una experiencia rápida, simple y placentera.",
    },
    {
        id: 3,
        backgroundImage: require("../../assets/images/background_01.png"),
        bannerImage: require("../../assets/images/adn.png"),
        title: "Recibe Sólo lo Mejor",
        description: "Recibirás la mejor solución, medicina y atención.",
    },
];

export default {
    especialidades,
    especialistas,
    onboarding_screens,
};
