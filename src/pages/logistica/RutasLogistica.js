import React, { useState, useEffect } from 'react';
import { baseURL } from '../../config/config';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import Swal from 'sweetalert2';

import ModalCrearRutaLogistica from '../../componentsLogistica/rutasLogistica/ModalCrearRutaLogistica';
import ModalEditarRutaLogistica from '../../componentsLogistica/rutasLogistica/ModalEditarRutaLogistica';
import ReporteRutasLogistica from '../../componentsLogistica/rutasLogistica/ReporteRutasLogistica';

const RutasLogistica = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        rel_cliente: "",
        clave: "",
        origen: "",
        destino: "",
        planta: "",
        km: "",
        imp_ex: "",
        activa: ""
    
    });

    // ===============================================
    // COLUMNAS PARA TABLAS
    // ===============================================

    const colums = [

        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true
        },
        {
            name: 'Origen',
            selector: row => row.rutaOrigen,
            sortable: true
        },
        {
            name: 'Destino',
            selector: row => row.rutaDestino,
            sortable: true
        },
        // {
        //     name: 'Tarifa',
        //     selector: row => row.tarifa,
        //     sortable: true
        // },
        {
            name: 'Estado',
            selector: row => row.activa === 1 ? 
            <button className='btn btn-success'>Activo</button> :
            <button className='btn btn-danger'>Inactivo</button>,
            width: "113px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarRutaLogistica" onClick={() => handleEditRutaLogistica(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteRutaLogistica(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ];

    // ===============================================
    // DATOS PARA LA TABLA DE CAJAS
    // ===============================================

    const [data, setData] = useState([]);
    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarRutasLogisticas()

    }, [token]);

    // FUNCION PARA BUSCAR LOS DATOS

    const buscarRutasLogisticas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/rutaslogisticas`, config);console.log(response.data)

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);
        }else{

            setData([]);

        }

    }

    //TRAER TODOS LOS CLIENTES PARA EL FORMULARIO

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/clientes/logistica`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let client = result.data.result;

                client.unshift({id: "", nombre_comercial: "Seleccione el cliente"});
        
                setClientes(client);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    //TRAER ORIGENES Y DESTINOS

    const [destinos, setDestinos] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/cat/destinos/select`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", ciudad: "Seleccione locacion"});
        
                setDestinos(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);


    // ===============================================
    // SEGMENTO PARA EDITAR RUTAS
    // ===============================================

    const handleEditRutaLogistica = async (id) => {

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/rutaslogisticas/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result[0];
            console.log(temp)
            setFormValues(temp);

            document.getElementById("selectclienteRutaLogisticaEdit").value = temp["rel_cliente"];

            document.getElementById("selectOrigenRutaLogisticaEdit").value = temp["origen"];

            document.getElementById("selectDestinoRutaLogisticaEdit").value = temp["destino"];

            document.getElementById("selectEstadoRutaLogisticaEdit").value = temp["activa"];

            document.getElementById("selectImpoExpoRutaLogisticaEdit").value = temp["imp_ex"];

        }

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR RUTAS
    // ===============================================

    const handleDeleteRutaLogistica = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar esta ruta?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/rutaslogisticas/elimina/${id}`,{
        
                headers: {"access-token": token}
            
              })
              .then(result => {
          
                if(result.data.success == true)
                {
      
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha eliminado correctamente!',
                  })
                  .then(() => {
          
                    buscarRutasLogisticas();
          
                  })
      
                }
          
              })
              .catch(error => {
            
                console.log(error)
            
              })
      
            }
            
        })

    }
                  

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    //=============================================================

  return (
    <div>
        <h3 className='mb-4'>Rutas</h3>

        <button 
            type="button" 
            className="btn btn-primary" 
            data-bs-toggle="modal" 
            data-bs-target="#modalCrearRutaLogistica"
            style={{ marginRight: 20}}
        >
            <MdAddCircle/> Agregar Ruta
        </button>

        <ReporteRutasLogistica rutas={data}/>

        <Tabla columns = {colums} data = {data}/>

        {/* MODAL PARA CREAR RUTA */}

        <ModalCrearRutaLogistica
            data={formValues}
            change={handleChange}
            refresh={buscarRutasLogisticas}
            clientes={clientes}
            destinos={destinos}
        />
        {/* MODAL PARA EDITAR RUTA */}
        
        <ModalEditarRutaLogistica
            data={formValues}
            change={handleChange}
            clientes={clientes}
            destinos={destinos}
            refresh={buscarRutasLogisticas}
        />
    </div>
  )
}

export default RutasLogistica