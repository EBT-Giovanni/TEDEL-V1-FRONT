import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import {FiUpload} from 'react-icons/fi';

const ModalSubirEvidencia = (props) => {

    const [token, setToken] = useState('');

    // ===============================================
    // CARGAR CATALOGO DE GASTOS
    // ===============================================

    const [gastos, setGastos] = useState([]);

    useEffect(() => {

        buscarGastos();

    },[token])

    const buscarGastos = async () => {

        setToken(Cookies.get('jwtoken'));

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/tipo/gastos`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            const temp = response.data.result; 

            temp.unshift({id: "", descripcion: "Seleccione el tipo de gasto"});

            setGastos(temp);

        }
        else{

            const temp = [];

            setGastos(temp);

        }

    }

    // ===============================================
    // SUBMIT PARA CREAR GASTO
    // ===============================================

    const urlCreate = baseURL+"api/create/gasto/operador";

    const handleSubmit = (event) => {

        console.log(props.data)

        event.preventDefault();

        //VALIDAMOS SI ES EVIDENCIA DE ENTREGA PARA MOSTRAR ALERTA

        if(props.data["tipo_archivo"] === "Evidencia de Entrega"){

            Swal.fire({
                title: '¿Estas seguro de subir este archivo?',
                text: "Se cerrara la orden al terminar la operacion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SUBIR',
            }).then((result) => {

                if(result.isConfirmed){

                    sendForm();

                }
        
            })

        }else{

            sendForm();

        }

    }

    const sendForm = () => {

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
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                } 
            
            })
            .then(result => {
          
                if(result.data.success === true)
                {
          
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha guardado la evidencia!',
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

    return (

        <div>

            <div className="modal fade" id="modalSubirEvidenciaOrden2" data-bs-backdrop="static" aria-hidden="true">

                <div className="modal-dialog modal-dialog-centered">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">Subir Gasto</h5>

                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>

                            {/* CUERPO DEL MODAL */}

                            <div className="modal-body">
                                
                                <div className='row'>

                                    {/* SELECT PARA TIPO DE EVIDENCIA */}

                                    <div className='col-12'>

                                        <span className="badge text-bg-secondary mb-2">Tipo De Gasto:</span>

                                        <select
                                            key="selectEvidencia"
                                            name="tipo_gasto"
                                            className="form-select"
                                            onChange={props.change}>

                                            {gastos.map((op) => (
                                                <option key={op.id} value={op.id}>{op.descripcion}</option>
                                            ))}
                                            
                                        </select>

                                    </div>

                                    {/* NOMBRE DE ARCHIVO */}

                                    <div className='col-12 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Monto de Gasto:</span>

                                        <input
                                            className='form-control'
                                            key="montoEvidencia"
                                            type="number"
                                            name="monto"
                                            placeholder="Ingrese monto"
                                            step=".01"
                                            autoComplete = "off"
                                            onChange={props.change}
                                        />

                                    </div>

                                    {/* ARCHIVO */}

                                    <div className='col-12 mt-4'>

                                        <span className="badge text-bg-secondary mb-2">Subir Evidencia:</span>

                                        <input
                                            className='form-control'
                                            key="fileEvidencia"
                                            type="file"
                                            name="ruta"
                                            autoComplete = "off"
                                            onChange={props.changeImg}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary"><FiUpload/> Subir Gasto</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalSubirEvidencia