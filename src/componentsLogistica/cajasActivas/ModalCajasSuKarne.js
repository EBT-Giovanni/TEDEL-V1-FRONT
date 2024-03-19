import React, { useEffect, useState } from 'react';
import {BiSave} from 'react-icons/bi';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const ModalCajasSuKarne = () => {

    // ===============================================
    // ESTADOS DEL COMPONENTE
    // ===============================================

    // ESTADO PARA VALORES DEL FORMULARIO
    const [formValues, setFormValues] = useState({

        vehicleName: "",
        placa: "",
        tractorName: "",
        placaTractor: "",
        mcleodOrder: ""
    
    });

    // ESTADO PARA CAJAS DE LOGISTICA
    const [cajasLogistica, setCajasLogistica] = useState([]);

    // ESTADO PARA TRACTORES
    const [tractores, setTractores] = useState([]);

    // 

    // ===============================================
    // BUSCAR CAJAS DE LOGISTICA
    // ===============================================

    const buscarCajasLogistica = () => {
        
        axios.get(`${baseURL}api/get/cajas/logistica`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", numero: "Seleccione Termo"});
        
                setCajasLogistica(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    };

    // ===============================================
    // BUSCAR TRACTORES
    // ===============================================

    const buscarTractores = () => {
        
        axios.get(`${baseURL}api/tractores`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", numero_economico: "Seleccione Tractor"});
        
                setTractores(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    };

    // ===============================================
    // BUSCAR ORDENES SUKARNE EN PROGRESO
    // ===============================================

    const buscarOrdenesSukarne = () => {

        axios.get(`${baseURL}api/integraciones/get/ordenes/sukarne/progress`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                console.log(result.data.info);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    };

    // ===============================================
    // VALIDAR SI YA ESTA ACTIVA LA CAJA
    // ===============================================

    const validarCaja = async (caja, placas) => {
        
        axios.get(`${baseURL}api/validar/caja/activa/${caja}`,{
        
            method: "GET",
            headers: {"access-token": Cookies.get('jwtoken')}
        
        })
        .then(result => {console.log(result.data)
    
            if(result.data.success === true && result.data.result === "Sin resultados")
            {

                setFormValues({ ...formValues, ["vehicleName"]: caja, ["placa"]: placas });

                document.getElementById("placaTermoActivo").value = placas;
                
            }else{

                console.log("SI EXISTE")

                Swal.fire({
                    icon: 'warning',
                    title: 'Esta caja ya esta activa',
                })

                document.getElementById("selectAgregarCajaActiva").value = "";
                document.getElementById("placaTermoActivo").value = ""
                
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    }

    // ===============================================
    // USE EFFECT PARA LLAMAR FUNCIONES
    // ===============================================

    useEffect(() => {

        buscarCajasLogistica();

        buscarTractores();

        buscarOrdenesSukarne();

    },[]);

        // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const columns = [

        {
            name: 'Order Id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Trailer',
            selector: row => row.preload_trailer_id,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <button 
                    className="btn btn-outline-danger" 
                    type="button" 
                    onClick={(e) => console.log(row.id)}
                >
                        <RiDeleteBinFill/>
                </button>
             
            ),
        },

    ];

    // ===============================================
    // SUBMIT DEL MODAL
    // ===============================================

    const handleSubmit = (event) => {

        const urlCreate = baseURL+"api/create/termo";

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

    // ===============================================

    return (

        <div>

            <div 
                className="modal fade" 
                id="modalSukarne" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true" 
                data-bs-backdrop="static"
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <form onSubmit={handleSubmit}>

                            {/* HEADER */}

                            <div className="modal-header">

                                <h5 className="modal-title" id="exampleModalLabel">
                                    Agregar Unidad
                                </h5>

                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" id="btnCerrarModalCrearCaja" 
                                    aria-label="Close"
                                >
                                </button>

                            </div>

                            {/* CUERPO DEL MODAL */}

                            <div className="modal-body">

                                <div className='row'>

                                    {/* AREA PARA LA TABLA */}

                                    <div className='col-7'>

                                        

                                    </div>

                                </div>
                                
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default ModalCajasSuKarne