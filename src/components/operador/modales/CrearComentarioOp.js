import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BiSave } from 'react-icons/bi';

function CrearComentarioOp(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SUBMIT PARA CREAR COMENTARIO
    // ===============================================

    const urlCreate = baseURL + "api/operador/comentario/crear";

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
                        title: 'Se ha agregado el comentario!',
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
    // MODAL PARA CREAR COMENTARIO
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalCrearComentarioOperador" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Comentario</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* NOMBRE DE OPERADOR */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Comentario:</span>

                                    <textarea 
                                    className="form-control" 
                                    name="comentario"
                                    key="comentarioOperador" 
                                    onChange={props.onChange}
                                    placeholder='Ingrese comentario'
                                    rows="3"></textarea>

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

export default CrearComentarioOp