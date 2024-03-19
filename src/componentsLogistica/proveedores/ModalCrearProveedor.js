import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalCrearProveedor = (props) => {

    const urlCreate = baseURL+"api/create/proveedor";

    // ===============================================
    // SUBMIT DEL MODAL
    // ===============================================

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
                        title: 'Se ha agregado el proveedor!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalCrearProveedor").click();
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

        document.getElementById("claveProveedor").value = "";
        document.getElementById("razon_socialProveedor").value = "";
        document.getElementById("nombre_comercialProveedor").value = "";
        document.getElementById("direccionProveedor").value = "";
        document.getElementById("rfcProveedor").value = "";
        document.getElementById("estadoProveedor").value = "";

    }

    // ===============================================
    // MODAL 
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalAgregarProveedor" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit} autocomplete="off" >

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Proveedor</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalCrearProveedor" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CLAVE PROVEEDOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Clave Proveedor:</span>

                                    <input
                                        className='form-control'
                                        id="claveProveedor"
                                        key="claveProveedor"
                                        type="text"
                                        name="clave"
                                        onChange={props.onChange}
                                        placeholder='Ingrese Clave de Proveedor'
                                    />

                                </div>

                                {/* RAZON SOCIAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Razon Social:</span>

                                    <input
                                        className='form-control'
                                        id="razon_socialProveedor"
                                        key="razon_socialProveedor"
                                        type="text"
                                        name="razon_social"
                                        onChange={props.onChange}
                                        placeholder='Ingrese razon social'
                                    />

                                </div>

                                {/* NOMBRE COMERCIAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Nombre Comercial:</span>

                                    <input
                                        className='form-control'
                                        id="nombre_comercialProveedor"
                                        key="nombre_comercialProveedor"
                                        type="text"
                                        name="nombre_comercial"
                                        onChange={props.onChange}
                                        placeholder='Ingrese nombre comercial'
                                    />

                                </div>

                                {/* DIRECCION */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Direccion:</span>

                                    <input
                                        className='form-control'
                                        id="direccionProveedor"
                                        key="direccionProveedor"
                                        type="text"
                                        name="direccion"
                                        onChange={props.onChange}
                                        placeholder='Ingrese direccion'
                                    />

                                </div>

                                {/* RFC */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">RFC:</span>

                                    <input
                                        className='form-control'
                                        id="rfcProveedor"
                                        key="rfcProveedor"
                                        type="text"
                                        name="rfc"
                                        onChange={props.onChange}
                                        placeholder='Ingrese RFC'
                                    />

                                </div>

                                {/* ESTADO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoProveedor"
                                        name="activo"
                                        className="form-select"
                                        id="estadoProveedor"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione Estado</option>
                                        <option value="1">ACTIVO</option>
                                        <option value="0">INACTIVO</option>
                                        
                                    </select>

                                </div>

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

export default ModalCrearProveedor