import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';

//ICONS
import {IoMdPersonAdd} from 'react-icons/io';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';

import CrearUsuario from '../components/usuarios/CrearUsuario';
import EditarUsuario from '../components/usuarios/EditarUsuario';

//===================================================================

function Usuarios() {

    // ===============================================
    // FORM VALUE PARA FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_perfil: "",
        rel_user: 0,
        email: "",
        passwordMD5: "",
        nombres: "",
        ap_paterno: "",
        ap_materno: "",
        ruta_avatar: "",
        activo: ""

    });

    // ===============================================
    // SEGMENTO PARA TRAER USUARIO
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    useEffect(() => {

        buscarUsers();
    
    },[token]);

    const buscarUsers = async () => {
        
        setToken(Cookies.get('jwtoken'));
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        const response = await axios.get(`${baseURL}api/usuarios`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const colums = [

        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Perfil',
            selector: row => row.perfil,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.activo === 1 ? 
            <button className='btn btn-success'>ACTIVO</button> :
            <button className='btn btn-danger'>INACTIVO</button>,
            width: '120px'
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarUser" onClick={() => handleEdit(row.idUser)}><BsPencil/></button>
                  <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.idUser, row.ruta_avatar)} ><RiDeleteBinFill/></button>
                </div>
             
            ),
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA EDITAR USUARIO
    // ===============================================

    const handleEdit = (id) => {

        const fetchUserType = async () => {

            setToken(Cookies.get('jwtoken'));

            const config = {
  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                },
        
            };
    
            const response = await axios.get(`${baseURL}api/usuario/id/${id}`, config);
    
            if(response.data.success === true && response.data.result !== "Sin resultados"){
    
                let formTemp = response.data.result[0];
    
                formTemp["fotoActual"] = formTemp["ruta_avatar"];
        
                setFormValues(formTemp)

                document.getElementById("selectEstadoUser").value = formTemp["activo"];

                document.getElementById("selectPerfilUserEdit").value = formTemp["rel_perfil"];

                if(formTemp["rel_perfil"] === 3){

                    let op = "EDITAR";

                    let val = formTemp["rel_user"]

                    buscarOperadores(op, val);

                }
                
                //document.getElementById("btnAbrirEditarModalUser").click();
    
            }

        }

        fetchUserType();

    };

    // ===============================================
    // SEGMENTO PARA CARGAR LOS PERFILES
    // ===============================================

    const [perfiles, setPerfiles] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/usuarios/perfil`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let perfil = result.data.result;

                perfil.unshift({id: "", perfil: "Seleccione un perfil"});
        
                setPerfiles(perfil);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA BUSCAR USUARIOS POR PERFIL 
    // ===============================================
    
    useEffect(() => {

        if(formValues.rel_perfil === "3"){

            let op = "crear";

            let val = null;

            buscarOperadores(op, val);

        }else{

            setUsers([{id:"0", nombre:"N/A"}]);

            setFormValues({ ...formValues, ["rel_user"]: 0})

        }

    }, [formValues.rel_perfil])

    // ===============================================
    // FUNCION PARA BUSCAR A LOS OPERADORES
    // ===============================================

    const [users, setUsers] = useState([{id:"", nombre:"N/A"}]);

    const buscarOperadores = async (op,  val) => {

        try{
    
            setToken(Cookies.get('jwtoken'));
    
            const config = {
    
                headers: {"access-token": token},
    
            };
    
            const response = await axios.get(`${baseURL}api/operadores`, config);
    
            if(response.data.success === true && response.data.result !== "Sin resultados"){
    
                let temp = response.data.result;

                temp.unshift({id:"", nombre:"Seleccione un operador"})

                setUsers(temp)

                if(op === "EDITAR"){

                    setTimeout(() => {
                        document.getElementById("selectUserIDEditar").value = val;
                    }, 1000);


                }
    
            }
    
        }
        catch(e){
    
            console.log(e);
    
        }

    };

    // ===============================================
    // VALIDAR SI EL USUARIO YA EXISTE EN LA RELACION
    // ===============================================

    const validarRelacion = (id) => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/usuario/rel_usuario/${id}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true && result.data.result !== "Sin resultados")
            {
               
                Swal.fire({
                    icon: 'warning',
                    title: 'Error!',
                    text: 'Este usuario ya ha sido registro'
                })
                .then(() => {
            
                    document.getElementById("selectRelUserCrear").value = "";

                    setFormValues({ ...formValues, ["rel_user"]: 0})
            
                })
                
            }
            else{

                updateNombresOperadores();

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // FUNCION PARA ACTUALIZAR LOS NOMBRES DE LOS OPERADORES
    // ===============================================

    const updateNombresOperadores = async () => {

        // SELECCIONAMOS EL SELECT

        let select = document.getElementById("selectRelUserCrear");

        //ACCEDEMOS AL TEXTO DEL SELECT

        let textoSeleccionado = select.options[select.selectedIndex].text;

        // SEPARAMOS EL NOMBRE 

        let nombre = textoSeleccionado.split(" ")


        if(nombre.length >= 3){

            var name = nombre[0]

            var lastNameF = nombre[1]

            var lastNameM = nombre[2]

        }else{

            var name = nombre[0]

            var lastNameF = nombre[1]

            var lastNameM = "."

        }

        // ASIGNAMOS EL PRIMER NOMBRE

        document.getElementById("nombreUsuarioCrear").value = name;

        setFormValues(prevFormValues => ({ ...prevFormValues, ["nombres"]: name }))

        //ASIGNAMOS EL APELLIDO PATERNO

        document.getElementById("apellidoPUsuarioCrear").value = lastNameF;

        setFormValues(prevFormValues => ({ ...prevFormValues, ["ap_paterno"]: lastNameF }))

        //ASIGNAMOS EL APELLIDO MATERNO

        document.getElementById("apellidoMUsuarioCrear").value = lastNameM;

        setFormValues(prevFormValues => ({ ...prevFormValues, ["ap_materno"]: lastNameM }))


    }

    // ===============================================
    // SEGMENTO PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        // SI SE ESCOGE UN USARIO PARA RELACIONAR VALIDAMOS SI YA EXISTE

        if(name === "rel_user"){

            validarRelacion(val);

        }

        setFormValues({ ...formValues, [name]: val})

    }

    const handleChangeImg = (event) => {

        setFormValues({ ...formValues, ["ruta_avatar"]: event.target.files[0]})

    }

    // ===============================================
    // SEGMENTO PARA BORRAR USUARIO
    // ===============================================

    const handleDelete = (id, path) => {

        Swal.fire({
        title: 'Estas seguro de borrar este registro?',
        text: "Esta accion no podra ser revertida!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
        }).then((result) => {

            if(result.isConfirmed) {

                const data = { path: path };
                
                fetch(`${baseURL}api/usuario/delete/${id}`, {
                        
                    method: "DELETE", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                        "access-token": token
                    },
                    body: JSON.stringify(data),

                })
                .then((response) => response.json())
                .then((data) => {
                    
                    if(data.success === true){

                        
                        Swal.fire({
                        icon: 'success',
                        title: 'Se ha eliminado correctamente!',
                        })
                        .then(() => {
                
                            buscarUsers();
                
                        })

                    }

                })
                .catch((error) => {
                    console.error("Error:", error);
                });

            }

        })

    }

    //===============================================

    return (

        <div>

            <h3 className='mb-4'>Usuarios</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearUser">
                <IoMdPersonAdd/> Agregar Usuario
            </button>

            {/* TABLA PARA MOSTRAR USUARIOS */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR USUARIOS */}

            <CrearUsuario
                data={formValues}
                onChange={handleChange}
                onChangeImg={handleChangeImg}
                perfiles={perfiles}
                users={users}
                refresh={buscarUsers}
            />

            <EditarUsuario
                data={formValues}
                onChange={handleChange}
                onChangeImg={handleChangeImg}
                perfiles={perfiles}
                users={users}
                refresh={buscarUsers}
            />

            {/* =============================================== */}
            {/* =============================================== */}
            {/* =============================================== */}
            {/* =============================================== */}
            {/* =============================================== */}

            <button 
            id="btnAbrirEditarModalUser"
            style={{"display":"none"}}
            type="button"
            ></button>

            

        </div>

    )

}

export default Usuarios

 

