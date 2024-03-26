import React, { useState } from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalAgregarCajaActiva = (props) => {

    const urlCreate = baseURL+"api/create/termo";

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
            
            if(key === "tractorName" || key === "placaTractor"){
                return;
            }
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
                        document.getElementById("btnCerrarModalCrearCaja").click();
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    }

    const [placaTractor, setPlacaTractor] = useState(''); // Inicializa placaTractor con una cadena vacía

    // ===============================================
    // MODAL PARA AGREGAR CAJA
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalAgregarCajaActiva" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Caja</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalCrearCaja" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Termo:</span>

                                    <select
                                        key="termoActivo"
                                        name="vehicleName"
                                        id="selectAgregarCajaActiva"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {props.catCajas.map((op) => (
                                            <option key={op.id} value={op.numero+"+"+op.placas}>{op.numero}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placa:</span>

                                    <input
                                        className='form-control'
                                        id="placaTermoActivo"
                                        key="placaTermo"
                                        type="text"
                                        name="placa"
                                        onChange={props.onChange}
                                        placeholder='Placas de Termo'
                                        readOnly={true}
                                    />

                                </div>

                            </div>
                            <div className='row'>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Tractor:</span>

                                    <select
                                        key="tractor"
                                        name="tractorName"
                                        id="selectAgregarTractorActivo"
                                        className="form-select"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            const selectedRowData = props.catTractores.find(op => op.numero_economico === selectedValue);
                                            // Actualiza el estado local
                                            setPlacaTractor(selectedRowData.placa || '');
                                            // Notifica al componente padre
                                            props.onChange2(selectedRowData);
                                        }}
                                    >

                                        {props.catTractores.map((op) => (
                                            <option key={op.id} value={op.numero_economico}>{op.numero_economico}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* EMPRESA DE CAJA */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Placa:</span>

                                    <input
                                        className='form-control'
                                        id="placaTractorActivo"
                                        key="placaTractor"
                                        type="text"
                                        name="placa2"
                                        value={placaTractor} // Enlaza el valor al estado
                                        // onChange={props.onChange}
                                        placeholder='Placas de tractor'
                                        readOnly={true}
                                    />

                                </div>

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                    <select
                                        key="rel_cliente"
                                        name="rel_cliente"
                                        id="selectAgregarCliente"
                                        className="form-select"
                                        onChange={props.onChange3}>
                                        {props.catClientes.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                        ))}
                                        
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

export default ModalAgregarCajaActiva