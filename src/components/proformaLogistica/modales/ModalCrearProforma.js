import React, { useState } from 'react'
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

// ICONOS

import {BiSave} from 'react-icons/bi';

const ModalCrearProformaLogistica = (props) => {

    const urlCreate = baseURL+"api/create/proformaLogistica";

    // ===============================================
    // FUNCION PARA CREAR PROFORMA
    // ===============================================

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
    // MODAL PARA CREAR PROFORMA
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearProformaLogistica" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-xl">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Crear Proforma</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className='row'>

                                {/* PLACAS DEL TRACTOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placas del tractor:</span>

                                    <input
                                        className='form-control'
                                        key="tractor_placa"
                                        name='tractor_placa'
                                        type="text"
                                        placeholder='Ingrese las placas del tractor'
                                        autoComplete='off'
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* AÑO DEL TRACTOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Año del tractor:</span>

                                    <input
                                        className='form-control'
                                        key="tractor_anio"
                                        name='tractor_anio'
                                        type="number"
                                        step="1"
                                        min="0"
                                        autoComplete='off'
                                        placeholder='Ingrese año del tractor'
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* AÑO DEL TRACTOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Aseguradora del tractor:</span>

                                    <input
                                        className='form-control'
                                        key="tractor_aseguradora"
                                        name='tractor_aseguradora'
                                        type="text"
                                        autoComplete='off'
                                        placeholder='Ingrese la aseguradora del tractor'
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* Numero economico */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Número económico:</span>

                                    <input
                                        className='form-control'
                                        key="tractor_num_economico"
                                        name='tractor_num_economico'
                                        autoComplete='off'
                                        type="text"
                                        placeholder='Ingrese el número económico'
                                        onChange={props.onChange}
                                    />

                                </div>

                                {/* PERMISO SCT */}

                                <div className='col-6 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Permiso SCT:</span>

                                <input
                                    className='form-control'
                                    key="tractor_SCT"
                                    name='tractor_SCT'
                                    type="text"
                                    autoComplete='off'
                                    placeholder='Ingrese el permiso SCT'
                                    onChange={props.onChange}
                                />

                                </div>

                                {/* NOMBRE DEL OPERADOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Nombre del operador:</span>

                                    <input
                                        className='form-control'
                                        name='operador_nombre'
                                        key="operador_nombre"
                                        autoComplete='off'
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese el nombre del operador'
                                    />

                                </div>

                                {/* CURP DEL OPERADOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">CURP del operador:</span>

                                    <input
                                        className='form-control'
                                        name='operador_curp'
                                        key="operador_curp"
                                        autoComplete='off'
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese el curp del operador'
                                    />

                                </div>

                                {/* RFC DEL OPERADOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">RFC del operador:</span>

                                    <input
                                        className='form-control'
                                        name='operador_rfc'
                                        key="operador_rfc"
                                        autoComplete='off'
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese el rfc del operador'
                                    />

                                </div>

                                {/* LICENCIA DEL OPERADOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Licencia del operador:</span>

                                    <input
                                        className='form-control'
                                        name='operador_licencia'
                                        key="operador_licencia"
                                        autoComplete='off'
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese la licencia del operador'
                                    />

                                </div>

                                {/* DIRECCION DEL OPERADOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Dirección del operador:</span>

                                    <input
                                        className='form-control'
                                        name='operador_direccion'
                                        key="operador_direccion"
                                        autoComplete='off'
                                        type="text"
                                        onChange={props.onChange}
                                        placeholder='Ingrese la direccion del operador'
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

export default ModalCrearProformaLogistica