import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {FiUpload} from 'react-icons/fi';

function GastosMV(props) {

    // ===============================================
    // SEGMENTO PARA SUBIR EVIDENCIA DE MV 
    // ===============================================

    const urlCreate = baseURL+"api/crear/gasto/movimiento/vacio";

    const handleSubmit = (event) => {

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
                    title: 'Se ha guardado la evidencia!',
                  }).then(() => {
          
                    window.location.reload(false);
          
                  })
          
                }
            
            })
            .catch(error => {
            
                console.log(error)
            
            })

        }

    }

    // ===============================================
    // MODAL PARA CREAR GASTOS
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalSubirEvidenciaMV" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">Subir Evidencia</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>

                            {/* CUERPO DEL MODAL */}

                            <div className="modal-body">
                                
                                <div className='row'>

                                    {/* DESCRIPCION DE GASTO */}

                                    <div className='col-12'>

                                        <span className="badge text-bg-secondary mb-2">Descripcion de Gasto:</span>

                                        <input
                                            className='form-control'
                                            key="nombre_archivoEvidencia"
                                            type="text"
                                            name="descripcion"
                                            placeholder="Ingrese descripcion"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* MONTO DE GASTO */}

                                    <div className='col-12 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Monto de Gasto:</span>

                                        <input
                                            className='form-control'
                                            key="montoEvidencia"
                                            type="number"
                                            name="monto"
                                            placeholder="Ingrese monto"
                                            step=".01"
                                            autoComplete = "off"
                                            onChange={props.onChange}
                                        />

                                    </div>

                                    {/* ARCHIVO */}

                                    <div className='col-12 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Subir Archivo:</span>

                                        <input
                                            className='form-control'
                                            key="fileEvidencia"
                                            type="file"
                                            name="ruta"
                                            autoComplete = "off"
                                            onChange={props.onChangeImg}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary"><FiUpload/> Subir Evidencia</button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default GastosMV