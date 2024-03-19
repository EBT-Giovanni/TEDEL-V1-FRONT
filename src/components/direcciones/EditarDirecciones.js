import React, { useState, useEffect } from 'react'
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const EditarDirecciones = (props) => {

    const [token, setToken] = useState('');

    // ===============================================
    // BUSCAR CLIENTES
    // ===============================================
    
    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
      
        axios.get(`${baseURL}api/clientes`,{
      
          method: "GET",
          headers: {"access-token": token}
      
        })
        .then(result => {
    
          if(result.data.success === true && result.data.result !== "Sin resultados")
          {

            let des = result.data.result;

            des.unshift({id: "", nombre_comercial: "Seleccione Cliente"});

            setClientes(des);

          }else{

            setClientes([]);

        }
    
        })
        .catch(error => {
      
          console.log(error)
      
        })
    
    },[token]);

    // ===============================================
    // BUSCAR UBICACIONES 
    // ===============================================

    const [ciudad, setCiudad] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/cat/destinos/select`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {

                let des = result.data.result;

                des.unshift({id: "", ciudad: "Seleccione Ubicacion"});

                setCiudad(des);

            }else{

                setCiudad([]);

            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA SUBMIT EDITAR ORDEN
    // ===============================================

    const urlEdit = baseURL + "api/direccion/update";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(props.data)

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
            
                        props.refresh();
                        document.getElementById("btnCerrarModalEditarDirecciones").click();
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    };

    // ===============================================
    // MODAL PARA EDITAR DIRECCIONES
    // ===============================================

    return (

        <div>

            <div className="modal fade" id="modalEditarDireccion" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Editar Direccion</h5>

                            <button type="button" id="btnCerrarModalEditarDirecciones" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                                {/* CLIENTE */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Cliente:</span>

                                    <select
                                        key="empresaCaja"
                                        id="editarClienteDireccion"
                                        name="rel_cliente"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {clientes.map((op) => (
                                            <option key={op.id} value={op.id}>{op.nombre_comercial}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* UBICACION */}

                                <div className='col-6 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Ubicacion:</span>

                                    <select
                                        key="empresaCaja"
                                        id="editarUbicacionDireccion"
                                        name="rel_origen"
                                        className="form-select"
                                        onChange={props.onChange}>

                                        {ciudad.map((op) => (
                                            <option key={op.id} value={op.id}>{op.ciudad}</option>
                                        ))}
                                        
                                    </select>

                                </div>

                                {/* NOMBRE */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Nombre:</span>

                                    <input
                                        className='form-control'
                                        key="nombreDireccion"
                                        id="editarNombreDireccion"
                                        type="text"
                                        name="nombre"
                                        placeholder="Ingrese nombre del lugar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                        defaultValue={props.data["nombre"]}
                                    />

                                </div>

                                {/* DIRECCION */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Direccion:</span>

                                    <input
                                        className='form-control'
                                        key="direccionDireccion"
                                        id="editarDireccionDireccion"
                                        type="text"
                                        name="direccion"
                                        placeholder="Ingrese direccion del lugar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                        defaultValue={props.data["direccion"]}
                                    />

                                </div>

                                {/* RFC */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">RFC:</span>

                                    <input
                                        className='form-control'
                                        key="rfcDireccion"
                                        id="editarRFCDireccion"
                                        type="text"
                                        name="rfc"
                                        placeholder="Ingrese RFC del lugar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                        defaultValue={props.data["rfc"]}
                                    />

                                </div>

                                {/* CONTACTO */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Contacto:</span>

                                    <input
                                        className='form-control'
                                        key="contactoDireccion"
                                        id="editarContactoDireccion"
                                        type="text"
                                        name="contacto"
                                        placeholder="Ingrese Contacto del lugar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                        defaultValue={props.data["contacto"]}
                                    />

                                </div>

                                {/* TELEFONO */}

                                <div className='col-6 mt-4'>

                                    <span className="badge text-bg-secondary mb-2">Telefono:</span>

                                    <input
                                        className='form-control'
                                        key="telefonoDireccion"
                                        id="editarTelefonoDireccion"
                                        type="text"
                                        name="telefono"
                                        placeholder="Ingrese Telefono del lugar"
                                        autoComplete = "off"
                                        onChange={props.onChange}
                                        defaultValue={props.data["telefono"]}
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

export default EditarDirecciones