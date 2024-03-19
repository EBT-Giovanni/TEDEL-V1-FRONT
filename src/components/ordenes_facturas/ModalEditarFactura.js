import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarFactura = (props) => {

    // ===============================================
    // SUBMIT PARA CREAR CAJA
    // ===============================================

    const urlCreate = baseURL+"api/ordenes/update/factura";

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

            axios.put(urlCreate, props.data,{
  
                headers: {
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Se han guardado los datos!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalUpdateFactura").click();
            
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

            <div className="modal fade" id="modalEditarFactura" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Factura</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalUpdateFactura" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* ORDEN */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Orden:</span>

                                    <select
                                        name="rel_orden"
                                        className="form-select"
                                        onChange={props.onChange}
                                        id="ordenFacturaNum"
                                    >

                                        <option value="">Seleccione una orden</option>
                                        {
                                            props.ordenes.map((item, index) => (

                                                <option 
                                                    key={index} 
                                                    value={item.id}
                                                >
                                                    T-00{item.id}
                                                </option>

                                            ))
                                        }
                                        
                                    </select>

                                </div>

                                {/* FACTURA */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Factura:</span>

                                    <input
                                        className='form-control'
                                        type="text"
                                        id="facturaOrden"
                                        name="facturar"
                                        onChange={props.onChange}
                                        placeholder='Ingrese Factura'
                                    />

                                </div>

                                {/* RE FACTURA */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Re factura:</span>

                                    <input
                                        className='form-control'
                                        type="text"
                                        id="refacturaOrden"
                                        name="refactura"
                                        onChange={props.onChange}
                                        placeholder='Re Factura'
                                    />

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

export default ModalEditarFactura