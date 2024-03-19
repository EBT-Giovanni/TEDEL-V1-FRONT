import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarClienteLogistica = (props) => {

    const urlEdit = baseURL+"api/update/cliente/logistica";

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
                        title: 'Se ha editado el cliente!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarClienteLogistica").click();
            
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

            <div className="modal fade" id="modalEditarClienteLogistica" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit} autoComplete="off" >

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Cliente</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarClienteLogistica" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CLAVE PROVEEDOR */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Clave Cliente:</span>

                                    <input
                                        className='form-control'
                                        id="claveClienteLogistica"
                                        key="claveProveedor"
                                        type="text"
                                        name="clave"
                                        onChange={props.onChange}
                                        defaultValue={props.data["clave"]}
                                        placeholder='Ingrese Clave de Cliente'
                                    />

                                </div>

                                {/* RAZON SOCIAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Razon Social:</span>

                                    <input
                                        className='form-control'
                                        id="razon_socialClienteLogistica"
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
                                        id="nombre_comercialClienteLogistica"
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
                                        id="editdireccionClienteLogistica"
                                        key="direccionProveedor"
                                        type="text"
                                        name="direccion"
                                        onChange={props.onChange}
                                        defaultValue={props.data["direccion"]}
                                        placeholder='Ingrese direccion'
                                    />

                                </div>

                                {/* DOMICILIO FISCAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Domicilio Fiscal:</span>

                                    <input
                                        className='form-control'
                                        id="editdomicilioFiscalClienteLogistica"
                                        key="domFisProveedor"
                                        type="text"
                                        name="domiciliofiscal"
                                        onChange={props.onChange}
                                        defaultValue={props.data["domiciliofiscal"]}
                                        placeholder='Ingrese domicilio fiscal'
                                    />

                                </div>

                                {/* REGIMEN FISCAL */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Regimen Fiscal:</span>

                                    <input
                                        className='form-control'
                                        id="editregimenFiscalClienteLogistica"
                                        key="regFisProveedor"
                                        type="text"
                                        name="regimenfiscal"
                                        onChange={props.onChange}
                                        defaultValue={props.data["regimenfiscal"]}
                                        placeholder='Ingrese domicilio fiscal'
                                    />

                                </div>

                                {/* RFC */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">RFC:</span>

                                    <input
                                        className='form-control'
                                        id="editrfcClienteLogistica"
                                        key="rfcProveedor"
                                        type="text"
                                        name="rfc"
                                        onChange={props.onChange}
                                        defaultValue={props.data["rfc"]}
                                        placeholder='Ingrese RFC'
                                    />

                                </div>

                                {/* IVA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">IVA:</span>

                                    <select
                                        key="ivaClliente"
                                        name="iva"
                                        className="form-select"
                                        id="ivaEditClienteLogistica"
                                        onChange={props.onChange}>

                                        <option value="">Seleccione iva</option>
                                        <option value="0">Sin iva</option>
                                        <option value="8">8%</option>
                                        <option value="16">16%</option>
                                        
                                    </select>

                                </div>

                                {/* ESTADO DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <select
                                        key="activoProveedor"
                                        name="activo"
                                        className="form-select"
                                        id="estadoEditClienteLogistica"
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

export default ModalEditarClienteLogistica


