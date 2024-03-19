import React, { useState } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function CrearUsuario(props) {

    // ===============================================
    // LIMPIAR MODAL
    // ===============================================

    const limpiarModal = () => {

        document.getElementById("selectCrearUsuario").value = "";
        document.getElementById("selectRelUserCrear").value = "";
        document.getElementById("nombreUsuarioCrear").value = "";
        document.getElementById("apellidoPUsuarioCrear").value = "";
        document.getElementById("apellidoMUsuarioCrear").value = "";
        document.getElementById("emailCrearUsuario").value = "";
        document.getElementById("passwordUserCreate").value = "";
        document.getElementById("selectEstadoCrearUser").value = "";
        document.getElementById("fileCrearUsuario").value = "";

    }

    // ===============================================
    // SEGMENTO PARA SUBMIT CREAR USUARIO
    // ===============================================

    const urlCreate = baseURL+"api/usuarios/crear";

    const handleSubmit = (event) => {

        console.log(props.data)

        event.preventDefault();

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(props.data).forEach(entry => {

            const [key,value] = entry;
    
            if(value === "" || value === null){
              
              Swal.fire({
                icon: 'warning',
                title: 'No pueden ir campos vacios!',
              })

              validar = false;
    
              return;
    
            }
    
        });

        if(validar){

            axios.post(urlCreate, props.data,{
  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                } 
            
              })
              .then(result => {
          
                if(result.data.success === true)
                {
          
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha creado correctamente!',
                  }).then(() => {
          
                    document.getElementById("btnCerrarModalCrearUsuario").click();
                    props.refresh();
                    limpiarModal();
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    }

    // ===============================================
    // MODAL PARA CREAR USUARIO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearUser" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-xl">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Crear Usuario</h5>

                            <button type="button" id="btnCerrarModalCrearUsuario" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={limpiarModal}></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* PERFILES */}

                                <div className='col-6'>

                                    <span className="badge text-bg-secondary mb-2">Perfil:</span>

                                    <select
                                        key="rel_perfilUser"
                                        id="selectCrearUsuario"
                                        name="rel_perfil"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.perfiles.map((op) => (
                                            <option key={op.id} value={op.id}>{op.perfil}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* USER */}

                                <div className='col-6'>

                                    <span className="badge text-bg-secondary mb-2">Usuario:</span>

                                    <select
                                        key="rel_userUser"
                                        id="selectRelUserCrear"
                                        name="rel_user"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.users.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* Nombre */}

                                <div className='col-4 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Nombre:</span>

                                    <input
                                        className='form-control'
                                        id="nombreUsuarioCrear"
                                        key="nombresUser"
                                        type="text"
                                        name="nombres"
                                        placeholder="Ingrese nombres"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* APELLIDO PATERNO */}

                                <div className='col-4 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Apellido Paterno:</span>

                                    <input
                                        className='form-control'
                                        id="apellidoPUsuarioCrear"
                                        key="ap_paternoUser"
                                        type="text"
                                        name="ap_paterno"
                                        placeholder="Ingrese apellido"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* APELLIDO MATERNO */}

                                <div className='col-4 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Apellido Materno:</span>

                                    <input
                                        className='form-control'
                                        id="apellidoMUsuarioCrear"
                                        key="ap_maternoUser"
                                        type="text"
                                        name="ap_materno"
                                        placeholder="Ingrese apellido"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* EMAIL */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Email:</span>

                                    <input
                                        className='form-control'
                                        key="emailUser"
                                        id="emailCrearUsuario"
                                        type="email"
                                        name="email"
                                        placeholder="Ingrese correo"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* PASSWORD */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Password:</span>

                                    <input
                                        className='form-control'
                                        key="passwordMD5User"
                                        id="passwordUserCreate"
                                        type="password"
                                        name="passwordMD5"
                                        placeholder="Ingrese password"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* ESTADO DE USUARIO */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoUser"
                                        name="activo"
                                        id="selectEstadoCrearUser"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione un estado</option>
                                        <option value="1">Activo</option>
                                        <option value="0">Inactivo</option>
                                        
                                    </select>

                                </div>

                                {/* FOTO USUARIO */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Foto Usuario:</span>

                                    <input
                                        className='form-control'
                                        key="ruta_avatarUser"
                                        id="fileCrearUsuario"
                                        type="file"
                                        name="ruta_avatar"
                                        autoComplete = "off"
                                        onChange={props.onChangeImg}
                                    />

                                </div>

                            </div>
                            
                        </div>

                        <div className="modal-footer">

                            <button type="submit" className="btn btn-primary"><BiSave/> Guardar</button>

                        </div>

                        </div>

                    </form>

                </div>

            </div>    

        </div>

    )

}

export default CrearUsuario