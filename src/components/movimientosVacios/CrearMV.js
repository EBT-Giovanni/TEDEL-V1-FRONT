import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//ICONS
import {BiSave} from 'react-icons/bi';

function CrearMV(props) {

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA SUBMIT DE MV
    // ===============================================

    const urlCreate = `${baseURL}api/crear/movimiento/vacio`;

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
                        title: 'Se ha creado el movimiento!',
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
    // SECCION PARA CARGAR LOS DESTINOS 
    // ===============================================

    const [rutas, setRutas] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/rutas/vacios`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", origen: "Seleccione Ruta", destino: '', clave: ''});
        
                setRutas(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // MODAL PARA CREAR MOVIMIENTOS VACIOS
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalAsignarMV" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">{props.modalTitle}</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* NUMERO DE MOVIMIENTO */}
{/* 
                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Num. Movimiento:</span>

                                    <input
                                        className='form-control'
                                        type="text"
                                        name="movimiento"
                                        defaultValue={`MV-${props.data["rel_orden_bajada"]}`}
                                        readOnly={true}
                                    />

                                </div> */}

                                {/* RUTA */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Origen:</span>

                                    <select
                                        name="rel_ruta"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {rutas.map((op) => (
                                            <option key={op.id} value={op.id}>{`${op.origen} a ${op.destino}`}</option>
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

export default CrearMV