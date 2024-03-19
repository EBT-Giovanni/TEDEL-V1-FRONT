import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import {BiSave} from 'react-icons/bi';

function ModalEditarDespacho(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // OPERADORES PARA DESPACHO
    // ===============================================  
    
    const [operadores, setOperadores] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/operadores/activos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let status = result.data.result;

                status.unshift({id: "", nombre: "Seleccione un operador"});
        
                setOperadores(status);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // TRAER ESTATUS PARA EDITAR DESPACHO
    // ===============================================

    const [status, setStatus] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatusOrdenes`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.shift();

                des.unshift({id: "", estatus: "Seleccione Estado"});
        
                setStatus(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA SUBMIT PARA EDITAR DESPACHO
    // ===============================================

    const urlEdit = baseURL + "api/despacho/asignado/update";

    const handleSubmitEdit = (event) => {

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
                    title: 'Se ha editado correctamente!',
                  }).then(() => {
          
                    window.location.reload(false);
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    };

    // ===============================================
    // MODAL PARA EDITAR DESPACHO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarDespacho" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmitEdit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Cambiar Estado</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            {/* OPERADOR ACTUAL */}

                            <div className='col-12 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Operador Actual:</span>

                                <input
                                    className='form-control'
                                    key="nombreChoferDespacho"
                                    type="text"
                                    readOnly={true}
                                    defaultValue={props.data["nombreChofer"]}
                                />

                            </div>

                            {/* OPERADOR */}

                            <div className='col-12 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Cambiar Operador:</span>

                                <select
                                    key="rel_chofer_1Despacho"
                                    name="rel_chofer_1"
                                    className="form-select"
                                    id="selectOperadorDespachoAsignado"
                                    onChange={props.onChange}>

                                    {operadores.map((op) => (
                                        <option key={op.id} value={op.id}>{op.nombre}</option>
                                    ))}
                                    
                                </select>

                            </div>

                            {/* ESTADO */}

                            <div className='col-12'>

                                <span className="badge text-bg-secondary mb-2">Estado:</span>

                                <select
                                    key="estadoEditOrden"
                                    id="selectStatusDespachoAsignado"
                                    name="rel_estatus"                   className="form-select"
                                    onChange={props.onChange}>

                                    {status.map((op) => (
                                        <option key={op.id} value={op.id}>{op.estatus}</option>
                                    ))}
                                    
                                </select>

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

export default ModalEditarDespacho