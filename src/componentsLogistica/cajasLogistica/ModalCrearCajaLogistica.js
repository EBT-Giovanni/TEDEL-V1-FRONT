import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalCrearCajaLogistica = (props) => {

    // ===============================================
    // SUBMIT PARA CREAR CAJA
    // ===============================================

    const urlCreate = baseURL+"api/create/caja/logistica";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data);

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
                        title: 'Se ha agregado la caja!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalCrearCajaLogistica").click();
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
    // LIMPIAR MODAL
    // ===============================================

    const limpiarModal = () => {

        document.getElementById("numCajaLogistica").value = "";
        document.getElementById("tipoCajaLogistica").value = "";
        document.getElementById("placasCajaLogistica").value = "";
        document.getElementById("marcaCajaLogistica").value = "";
        document.getElementById("proveedorCaja").value = "";
        document.getElementById("anioCajaLogistica").value = "";

    }

    return (

        <div>

            <div className="modal fade" id="modalCrearCajaLogistica" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit} autoComplete='off'>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Caja</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalCrearCajaLogistica" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* NUMERO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Numero de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="numeroCaja"
                                        id="numCajaLogistica"
                                        type="text"
                                        name="numero"
                                        onChange={props.onChange}
                                        placeholder='Ingrese numero de caja'
                                    />

                                </div>

                                {/* TIPO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tipo de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="tipoCaja"
                                        id="tipoCajaLogistica"
                                        type="text"
                                        name="tipo"
                                        onChange={props.onChange}
                                        placeholder='Ingrese tipo de caja'
                                    />

                                </div>

                                {/* PLACAS DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placas de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="placasCaja"
                                        id="placasCajaLogistica"
                                        type="text"
                                        name="placas"
                                        onChange={props.onChange}
                                        placeholder='Ingrese placas de caja'
                                    />

                                </div>

                                {/* MARCA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Marca de Caja:</span>

                                    <input
                                        className='form-control'
                                        key="marcaCaja"
                                        id="marcaCajaLogistica"
                                        type="text"
                                        name="marca"
                                        onChange={props.onChange}
                                        placeholder='Ingrese marca de caja'
                                    />

                                </div>

                                {/* PROVEEDOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Proveedor de la Caja:</span>

                                    <select
                                        key="empresaCaja"
                                        id="proveedorCaja"
                                        name="proveedor"
                                        className="form-select"
                                        onChange={props.onChange}>


                                        {props.proveedores.map((op) => (
                                            <option value={op.id} key={op.id}>{op.nombre_comercial}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* ANIO DE CAJA */}

                                <div className='col-6 mb-6'>

                                    <span className="badge text-bg-secondary mb-2">Año de la Caja:</span>

                                    <input
                                        className='form-control'
                                        id="anioCajaLogistica"
                                        key="anioCaja"
                                        type="number"
                                        name="anio"
                                        onChange={props.onChange}
                                        placeholder='Ingrese año de caja'
                                    />

                                </div>

                                {/* ESTADO DE CAJA */}
{/* 
                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Activo / Inactivo:</span>

                                    <select
                                        key="activoCaja"
                                        name="activo"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione estado</option>
                                        <option value="1">ACTIVO</option>
                                        <option value="0">INACTIVO</option>
                                        
                                    </select>

                                </div> */}

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="submit" className='btn btn-primary float-end'><BiSave/> Guardar</button>

                        </div>

                    </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalCrearCajaLogistica