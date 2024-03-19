import React, { useState } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const CrearArchivoLogistica = (props) => {

    // ===============================================
    // LIMPIAR MODAL
    // ===============================================

    const limpiarModal = () => {
        
        document.getElementById("nombreFileLogistica").value = "";
        document.getElementById("fileOrdenLogistica").value = "";

        props.setFormValues({
            rel_orden: "",
            descripcion: "",
            ruta: ""
        })

    }

    // ===============================================
    // SEGMENTO PARA SUBMIT CREAR USUARIO
    // ===============================================

    const urlCreate = baseURL+"api/crear/archivo/ordenes/logistica";

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

            <div className="modal fade" id="modalCrearArchivoLogistica" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Crear Archivo</h5>

                            <button type="button" id="btnCerrarModalCrearUsuario" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={limpiarModal}></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* DESCRIPCION */}

                                <div className='col-12'>

                                    <span className="badge text-bg-secondary mb-2">Nombre:</span>

                                    <input
                                        className='form-control'
                                        id="nombreFileLogistica"
                                        type="text"
                                        name="descripcion"
                                        placeholder="Ingrese nombres"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* ARCHIVO */}

                                <div className='col-12 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Foto Usuario:</span>

                                    <input
                                        className='form-control'
                                        id="fileOrdenLogistica"
                                        type="file"
                                        name="ruta"
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

export default CrearArchivoLogistica