import React, { useState } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function EditarUsuario(props) {

    // ===============================================
    // SEGMENTO PARA SUBMIT EDITAR USUARIO
    // ===============================================

    const urlEdit = baseURL+"api/usuario/editar";

    const handleSubmitEdit = event => {

        event.preventDefault();

        console.log(props.data)

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

            axios.put(urlEdit, props.data,{
  
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
                    title: 'Se ha editado correctamente!',
                  }).then(() => {
          
                    props.refresh();
                    document.getElementById("btnCerrarModalEditarUser").click();
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    }

    // ===============================================
    // MODAL PARA EDITAR USUARIO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarUser" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-xl">

                    <form onSubmit={handleSubmitEdit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Usuario</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarUser" aria-label="Close"></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* PERFILES */}

                                <div className='col-6'>

                                    <span className="badge text-bg-secondary mb-2">Perfil:</span>

                                    <select
                                        key="rel_perfilUser"
                                        id="selectPerfilUserEdit"
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
                                        id="selectUserIDEditar"
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
                                        key="nombresUser"
                                        defaultValue={props.data["nombres"]}
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
                                        key="ap_paternoUser"
                                        defaultValue={props.data["ap_paterno"]}
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
                                        key="ap_maternoUser"
                                        defaultValue={props.data["ap_materno"]}
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
                                        defaultValue={props.data["email"]}
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
                                        type="password"
                                        name="passwordMD5"
                                        placeholder="Ingrese nuevo password"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* ESTADO */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoUser"
                                        id="selectEstadoUser"
                                        name="activo"
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
                                        type="file"
                                        name="ruta_avatar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
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

export default EditarUsuario