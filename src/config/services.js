import { firebase } from "./firebase-config";
import { store, setUser } from "../context/redux";

export const getUserData = async (uid) => {
    const user = await firebase
        .firestore()
        .collection("usuarios")
        .doc(uid)
        .get();

    return user.data();
};

export const updateUser = async (uid, nameUser, region, estado) => {
    await firebase.firestore().collection("usuarios").doc(uid).update({
        nameUser: nameUser,
        region: region,
        estado: estado,
    });

    const user = await firebase
        .firestore()
        .collection("usuarios")
        .doc(uid)
        .get();

    const userFire = {
        cliente: user.data().cliente,
        medico: user.data().medico,
        completado: user.data().completado,
        created: user.data().created.seconds,
        email: user.data().email,
        nameUser: user.data().nameUser,
        picture: user.data().picture,
        basicoR: user.data().basicoR,
        region: user.data().region,
        estado: user.data().estado,
    };
    store.dispatch(setUser(userFire));

    return user;
};

export const updateUserProfile = async (uid) => {
    await firebase.firestore().collection("usuarios").doc(uid).update({
        medico: true,
    });

    const user = await firebase
        .firestore()
        .collection("usuarios")
        .doc(uid)
        .get();

    return user;
};

export const getRegiones = async () => {
    const regiones = await firebase
        .firestore()
        .collection("regiones_estados")
        .get();

    return regiones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ["uid"]: item.id,
            ["label"]: item.data().region,
            ["value"]: item.data().id,
            ...item.data(),
        };
        return reg;
    });
};

export const getCiudadesMunicipios = async (id_estado) => {
    const ciudades = await firebase
        .firestore()
        .collection("ciudades_municipios")
        .where("id_estado", "==", id_estado)
        .get();

    return ciudades.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["uid"]: item.id,
            //["label"]: item.data().region,
            //["value"]: item.data().id,
            ...item.data(),
        };
        return reg;
    });
};

export const getEspecialidad = async (uid) => {
    const especialidad = await firebase
        .firestore()
        .collection("especialidades")
        .doc(uid)
        .get();
    return especialidad.data();
};

export const getProfesion = async (uid) => {
    const profesion = await firebase
        .firestore()
        .collection("profesion")
        .doc(uid)
        .get();

    return profesion.data();
};

export const getEspecialidades = async () => {
    const especialidades = await firebase
        .firestore()
        .collection("especialidades")
        .get();

    return especialidades.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ["label"]: item.data().name,
            ["value"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getEspecialidadesHome = async () => {
    const especialidades = await firebase
        .firestore()
        .collection("especialidades")
        .get();

    return especialidades.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["uid"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getProfesiones = async () => {
    const profesiones = await firebase
        .firestore()
        .collection("profesion")
        .orderBy("name")
        .get();

    return profesiones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ["label"]: item.data().name,
            ["value"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getTecAuxAsist = async () => {
    const tec_aux_asist = await firebase
        .firestore()
        .collection("tec_aux_asist")
        .orderBy("name")
        .get();

    return tec_aux_asist.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ["label"]: item.data().name,
            ["value"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getEstablecimiento = async () => {
    const establecimiento = await firebase
        .firestore()
        .collection("establecimiento")
        .orderBy("name")
        .get();

    return establecimiento.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ["label"]: item.data().name,
            ["value"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

//eliminar basicoR2
export const updateMedicoData1 = async (
    uid,
    nameUser,
    telefono,
    region,
    estado,
    ciudad,
    municipio,
    direccion,
    profesionValue,
    especialidades,
    tecAuxAsistValue,
    establecimientoValue
) => {
    await firebase.firestore().collection("usuarios").doc(uid).update({
        nameUser: nameUser,
        telefono: telefono,
        id_region: region,
        id_estado: estado,
        id_ciudad: ciudad,
        municipio: municipio,
        direccion: direccion,
        id_profesion: profesionValue,
        especialidades: especialidades,
        id_tec_aux_asist: tecAuxAsistValue,
        id_establecimiento: establecimientoValue,
        basicoR: true,
        basicoR2: true,
    });

    const user = await firebase
        .firestore()
        .collection("usuarios")
        .doc(uid)
        .get();

    const userFire = {
        cliente: user.data().cliente,
        medico: user.data().medico,
        completado: user.data().completado,
        created: user.data().created.seconds,
        email: user.data().email,
        nameUser: user.data().nameUser,
        telefono: user.data().telefono,
        picture: user.data().picture,
        basicoR: user.data().basicoR,
        id_region: user.data().id_region,
        id_estado: user.data().id_estado,
        id_ciudad: user.data().id_ciudad,
        municipio: user.data().municipio,
        direccion: user.data().direccion,

        id_profesion: user.data().id_profesion,
        especialidades: user.data().especialidades,
        id_tec_aux_asist: user.data().id_tec_aux_asist,
        id_establecimiento: user.data().id_establecimiento,
    };
    store.dispatch(setUser(userFire));

    return user;
};

export const updateMedicoData2 = async (uid, ramas) => {
    await firebase.firestore().collection("usuarios").doc(uid).update({
        ramas: ramas,
        basicoR2: true,
    });

    const user = await firebase
        .firestore()
        .collection("usuarios")
        .doc(uid)
        .get();

    const userFire = {
        cliente: user.data().cliente,
        medico: user.data().medico,
        completado: user.data().completado,
        created: user.data().created.seconds,
        email: user.data().email,
        nameUser: user.data().nameUser,
        telefono: user.data().telefono,
        picture: user.data().picture,
        basicoR: user.data().basicoR,
        basicoR2: user.data().basicoR2,
        id_region: user.data().id_region,
        id_estado: user.data().id_estado,
        id_ciudad: user.data().id_ciudad,
        municipio: user.data().municipio,
        direccion: user.data().direccion,
        ramas: user.data().ramas,
        id_especialidad: user.data().id_especialidad,
    };
    store.dispatch(setUser(userFire));

    return user;
};

export const savePublicacion = async (
    id_usuario,
    titulo,
    centroS,
    direccion,
    desc,
    incluye,
    duracion,
    precio,
    imageUrl,
    domingoDesde,
    domingoDesde1,
    domingoHasta,
    domingoHasta1,
    lunesDesde,
    lunesDesde1,
    lunesHasta,
    lunesHasta1,
    martesDesde,
    martesDesde1,
    martesHasta,
    martesHasta1,
    miercolesDesde,
    miercolesDesde1,
    miercolesHasta,
    miercolesHasta1,
    juevesDesde,
    juevesDesde1,
    juevesHasta,
    juevesHasta1,
    viernesDesde,
    viernesDesde1,
    viernesHasta,
    viernesHasta1,
    sabadoDesde,
    sabadoDesde1,
    sabadoHasta,
    sabadoHasta1,
    especialidad,
    subEspecialidad,
    tipoOf,
    benef1,
    benef2,
    benef3,
    profesion,
    adicional
) => {
    const save = await firebase
        .firestore()
        .collection("publicacion")
        .doc()
        .set({
            id_usuario,
            titulo,
            centroS,
            direccion,
            desc,
            incluye,
            duracion,
            precio,
            activo: true,
            image: imageUrl,
            domingoDesde,
            domingoDesde1,
            domingoHasta,
            domingoHasta1,
            lunesDesde,
            lunesDesde1,
            lunesHasta,
            lunesHasta1,
            martesDesde,
            martesDesde1,
            martesHasta,
            martesHasta1,
            miercolesDesde,
            miercolesDesde1,
            miercolesHasta,
            miercolesHasta1,
            juevesDesde,
            juevesDesde1,
            juevesHasta,
            juevesHasta1,
            viernesDesde,
            viernesDesde1,
            viernesHasta,
            viernesHasta1,
            sabadoDesde,
            sabadoDesde1,
            sabadoHasta,
            sabadoHasta1,
            especialidad,
            subEspecialidad,
            tipoOf,
            benef1,
            benef2,
            benef3,
            profesion,
            adicional,
            created_at: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
            return "Éxito";
        })
        .catch((err) => {
            return "Error";
        });

    return save;
};

export const updatePublicacion = async (
    uid,
    id_usuario,
    titulo,
    centroS,
    direccion,
    desc,
    incluye,
    duracion,
    precio,
    imageUrl,
    domingoDesde,
    domingoDesde1,
    domingoHasta,
    domingoHasta1,
    lunesDesde,
    lunesDesde1,
    lunesHasta,
    lunesHasta1,
    martesDesde,
    martesDesde1,
    martesHasta,
    martesHasta1,
    miercolesDesde,
    miercolesDesde1,
    miercolesHasta,
    miercolesHasta1,
    juevesDesde,
    juevesDesde1,
    juevesHasta,
    juevesHasta1,
    viernesDesde,
    viernesDesde1,
    viernesHasta,
    viernesHasta1,
    sabadoDesde,
    sabadoDesde1,
    sabadoHasta,
    sabadoHasta1,
    especialidad,
    subEspecialidad,
    tipoOf,
    benef1,
    benef2,
    benef3,
    adicional
) => {
    const save = await firebase
        .firestore()
        .collection("publicacion")
        .doc(uid)
        .update({
            id_usuario,
            titulo,
            centroS,
            direccion,
            desc,
            incluye,
            duracion,
            precio,
            activo: true,
            image: imageUrl,
            domingoDesde,
            domingoDesde1,
            domingoHasta,
            domingoHasta1,
            lunesDesde,
            lunesDesde1,
            lunesHasta,
            lunesHasta1,
            martesDesde,
            martesDesde1,
            martesHasta,
            martesHasta1,
            miercolesDesde,
            miercolesDesde1,
            miercolesHasta,
            miercolesHasta1,
            juevesDesde,
            juevesDesde1,
            juevesHasta,
            juevesHasta1,
            viernesDesde,
            viernesDesde1,
            viernesHasta,
            viernesHasta1,
            sabadoDesde,
            sabadoDesde1,
            sabadoHasta,
            sabadoHasta1,
            especialidad,
            subEspecialidad,
            tipoOf,
            benef1,
            benef2,
            benef3,
            adicional,
            created_at: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
            return "Éxito";
        })
        .catch((err) => {
            return "Error";
        });

    return save;
};

export const getPublicacion = async (uid) => {
    const publicacion = await firebase
        .firestore()
        .collection("publicacion")
        .doc(uid)
        .get();

    let reg = publicacion.data();
    reg = {
        ["key"]: publicacion.id,
        ...publicacion.data(),
    };
    return reg;
};

export const getPublicaciones = async (tipoOf) => {
    const publicaciones = await firebase
        .firestore()
        .collection("publicacion")
        .where("activo", "==", true)
        .where("tipoOf.label", "==", tipoOf)
        .orderBy("titulo")
        .get();

    return publicaciones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getPublicacionesEsp = async (esp) => {
    const publicaciones = await firebase
        .firestore()
        .collection("publicacion")
        .where("activo", "==", true)
        .where("especialidad", "==", esp)
        .orderBy("titulo")
        .get();

    return publicaciones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getPublicacionesAct = async (uid) => {
    const publicaciones = await firebase
        .firestore()
        .collection("publicacion")
        .where("activo", "==", true)
        .where("id_usuario", "==", uid)
        .orderBy("titulo")
        .get();

    return publicaciones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const getPublicacionesInac = async (uid) => {
    const publicaciones = await firebase
        .firestore()
        .collection("publicacion")
        .where("activo", "==", false)
        .where("id_usuario", "==", uid)
        .orderBy("titulo")
        .get();

    return publicaciones.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const actDesactPublicacion = async (uid, act) => {
    await firebase.firestore().collection("publicacion").doc(uid).update({
        activo: act,
    });

    const publicacion = await firebase
        .firestore()
        .collection("publicacion")
        .doc(uid)
        .get();

    return {
        ["key"]: publicacion.id,
        ...publicacion.data(),
    };

    // return publicaciones.docs.map((item) => {
    //     let reg = item.data();
    //     reg = {
    //         ["key"]: item.id,
    //         ...item.data(),
    //     };
    //     return reg;
    // });
};

// Like
export const getFavoritos = async (uid) => {
    const favs = await firebase
        .firestore()
        .collection("favoritos")
        .where("id_usuario", "==", uid)
        .get();

    return favs.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["uid"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};

export const saveFavoritos = async (id_usuario, favoritos) => {
    const save = await firebase
        .firestore()
        .collection("favoritos")
        .doc()
        .set({
            id_usuario,
            favoritos,
            created_at: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
            return "Éxito";
        })
        .catch((err) => {
            return "Error";
        });

    return save;
};

export const updateFavoritos = async (uid, favoritos) => {
    const favs = await firebase
        .firestore()
        .collection("favoritos")
        .doc(uid)
        .update({
            favoritos: favoritos,
        })
        .then(() => console.log("Editado"));
};

// Compras
export const saveCompra = async (id_publicacion, id_paciente) => {
    const save = await firebase
        .firestore()
        .collection("compras")
        .doc()
        .set({
            id_publicacion,
            id_paciente,
            created_at: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
            return "Éxito";
        })
        .catch((err) => {
            return "Error";
        });

    return save;
};

export const getCompras = async (id_paciente) => {
    const compras = await firebase
        .firestore()
        .collection("compras")
        .where("id_paciente", "==", id_paciente)
        .orderBy("created_at", "desc")
        .get();

    return compras.docs.map((item) => {
        let reg = item.data();
        reg = {
            ["key"]: item.id,
            ...item.data(),
        };
        return reg;
    });
};
