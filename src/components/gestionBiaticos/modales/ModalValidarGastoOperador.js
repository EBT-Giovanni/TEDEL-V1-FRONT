import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

import {BiArrowBack} from 'react-icons/bi';

const ModalValidarGastoOperador = ({change, formValues, cambiarEstado}) => {

    console.log(formValues)

    // ===============================================
    // SUBMIT DE FORMULARIO
    // ===============================================

    const urlValidate = `${baseURL}api/update/validar/gasto/asignado`;

    const handleSubmit = (event) => {

        let data = formValues;

        data.comprobado = 1;

        console.log(data)

        event.preventDefault();

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(data).forEach(entry => {

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

            axios.put(urlValidate, data,{
  
                headers: {
                    "access-token": token,
                } 
            
            })
            .then(result => {
          
                if(result.data.success === true)
                {
          
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha creado correctamente!',
                  }).then(() => {
          
                    document.getElementById("btnRegresarValidarGastos").click();

                    // LIMPIAMOS LOS INPUTS 

                    limpiarInputs();

                    cambiarEstado();
          
                  })
          
                }
            
            })
            .catch(error => {
            
                console.log(error)
            
            })

        }

    }

    // ===============================================
    // FUNCION PARA LIMPIAR INPUTS
    // ===============================================

    const limpiarInputs = () => {

        document.getElementById("inputMontoGastoAprobado").value = "";
        document.getElementById("comentarioGastoAprobado").value = "";

    }

    // ===============================================
    // MODAL PARA VALIDAR GASTO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalValidarGasto" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel"></h5>

                            </div>

                            {/* CUERPO DEL MODAL */}

                            <div className="modal-body">

                                <p className='text-center h3'>{formValues.descripcion}</p>

                                <p className='text-center h3' style={{color: "red"}}>${formValues.monto}</p>
                                
                                <div className='row'>

                                    {/* MONTO DE GASTO */}

                                    <div className='col-12 mt-3'>

                                        <span className="badge text-bg-secondary mb-2">Monto Aprobado:</span>

                                        <input
                                            className='form-control'
                                            key="montoEvidencia"
                                            type="number"
                                            step=".01"
                                            name="monto_aprobado"
                                            placeholder="Ingrese monto"
                                            id="inputMontoGastoAprobado"
                                            autoComplete = "off"
                                            onChange={change}
                                        />

                                    </div>

                                    {/* COMENTARIO */}

                                    <div className='col-12 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Comentario:</span>

                                        <textarea 
                                            className="form-control" 
                                            id="comentarioGastoAprobado"
                                            name="comentario"
                                            key="comentarioOperador" 
                                            onChange={change}
                                            placeholder='Ingrese comentario'
                                            rows="3"></textarea>

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer" style={{"display":"block"}}>

                               <div className='row'>

                                    <div className='col-6'>

                                        <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        id="btnRegresarValidarGastos"
                                        data-bs-target="#modalGestionarBiaticos"
                                        data-bs-toggle="modal" data-bs-dismiss="modal"
                                        onClick={()=>limpiarInputs()}
                                        ><BiArrowBack/> Regresar</button>

                                    </div>

                                    <div className='col-6'>

                                        <button type="submit" className="btn btn-primary float-end">Aprobar gasto </button>

                                    </div>

                               </div>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )


}

export default ModalValidarGastoOperador