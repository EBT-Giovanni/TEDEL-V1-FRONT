import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import {FiUpload} from 'react-icons/fi';

const ModalSubirEvidenciasEntrega = (props) => {

    // ===============================================
    // SUBMIT PARA CREAR EVIDENCIA
    // ===============================================

    const handleSubmit = (event) => {

        console.log(props.data)

        event.preventDefault();

        const token = Cookies.get('jwtoken');

        const urlCreate = baseURL+"api/orden/crear/evidencia";

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

    return (

        <div>

            <div className="modal fade" id="modalSubirOrdenEntrega" data-bs-backdrop="static" aria-hidden="true">

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


                                    {/* DESCRIPCION DE ARCHIVO */}

                                    <div className='col-12'>

                                        <span className="badge text-bg-secondary mb-2">Descripcion:</span>

                                        <input
                                            className='form-control'
                                            type="text"
                                            name="nombre_archivo"
                                            placeholder="Ingrese Descripcion"
                                            autoComplete = "off"
                                            onChange={props.change}
                                        />

                                    </div>

                                    {/* ARCHIVO */}

                                    <div className='col-12 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Subir Evidencia:</span>

                                        <input
                                            className='form-control'
                                            key="fileEvidencia"
                                            type="file"
                                            name="ruta"
                                            autoComplete = "off"
                                            onChange={props.changeImg}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary"><FiUpload/> Subir Gasto</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalSubirEvidenciasEntrega