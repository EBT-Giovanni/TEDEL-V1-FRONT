import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarProveedor = (props) => {

    const urlEdit = baseURL+"api/update/proveedor";

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

            axios.put(urlEdit, props.data,{
  
                headers: {
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha editado el proveedor!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarProveedor").click();
            
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

            <div className="modal fade" id="modalEditarProveedor" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Proveedor</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarProveedor" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CLAVE PROVEEDOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Clave Proveedor:</span>

                                    <input
                                        className='form-control'
                                        id="clave"
                                        key="claveProveedor"
                                        type="text"
                                        name="clave"
                                        onChange={props.onChange}
                                        defaultValue={props.data["clave"]}
                                        placeholder='Ingrese Clave de Proveedor'
                                    />

                                </div>

                                {/* RAZON SOCIAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Razon Social:</span>

                                    <input
                                        className='form-control'
                                        id="razon_social"
                                        key="razon_socialProveedor"
                                        type="text"
                                        name="razon_social"
                                        onChange={props.onChange}
                                        defaultValue={props.data["razon_social"]}
                                        placeholder='Ingrese razon social'
                                    />

                                </div>

                                {/* NOMBRE COMERCIAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Nombre Comercial:</span>

                                    <input
                                        className='form-control'
                                        id="nombre_comercial"
                                        key="nombre_comercialProveedor"
                                        type="text"
                                        name="nombre_comercial"
                                        onChange={props.onChange}
                                        defaultValue={props.data["nombre_comercial"]}
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
                                        defaultValue={props.data["direccion"]}
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
                                        defaultValue={props.data["rfc"]}
                                        placeholder='Ingrese RFC'
                                    />

                                </div>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoProveedor"
                                        name="activo"
                                        className="form-select"
                                        id="selectEstadoProveedor"
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

export default ModalEditarProveedor