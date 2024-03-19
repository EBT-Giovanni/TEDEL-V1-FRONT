import React from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalEditarOrigen = (props) => {

    // ===============================================
    // SUBMIT PARA CREAR CAJA
    // ===============================================

    const urlUpdate = baseURL+"api/cat/destino/update";

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

            axios.put(urlUpdate, props.data,{
  
                headers: {
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                        icon: 'success',
                        title: 'Se ha editado la caja!',
                    }).then(() => {
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarDestino").click();
            
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

            <div className="modal fade" id="modalEditarOrigenCat" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Caja</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" id="btnCerrarModalEditarDestino" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CIUDAD */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Ciudad:</span>

                                    <input
                                        className='form-control'
                                        key="Ciudad"
                                        type="text"
                                        name="ciudad"
                                        onChange={props.onChange}
                                        defaultValue={props.data["ciudad"]}
                                        placeholder='Ingrese ciudad'
                                    />

                                </div>

                                {/* ESTADO */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Estado:</span>

                                    <input
                                        className='form-control'
                                        key="estado"
                                        type="text"
                                        name="estado"
                                        onChange={props.onChange}
                                        defaultValue={props.data["estado"]}
                                        placeholder='Ingrese el estado'
                                    />

                                </div>

                                {/* DIRECCION */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Direccion:</span>

                                    <input
                                        className='form-control'
                                        key="direccion"
                                        type="text"
                                        name="direccion"
                                        onChange={props.onChange}
                                        defaultValue={props.data["direccion"]}
                                        placeholder='Ingrese direccion'
                                    />

                                </div>

                                {/* NOMBRE */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Nombre:</span>

                                    <input
                                        className='form-control'
                                        key="nombre"
                                        type="text"
                                        name="nombre"
                                        onChange={props.onChange}
                                        defaultValue={props.data["nombre"]}
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

export default ModalEditarOrigen