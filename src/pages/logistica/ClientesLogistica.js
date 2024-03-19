import React, { useState, useEffect } from 'react';
import { baseURL } from '../../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import Swal from 'sweetalert2';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdOutlineAddCircle} from 'react-icons/md';
import ModalCrearClienteLogistica from '../../componentsLogistica/clientesLogistica/ModalCrearClienteLogistica';
import ModalEditarClienteLogistica from '../../componentsLogistica/clientesLogistica/ModalEditarClienteLogistica';

const ClientesLogistica = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        clave: "",
        razon_social: "",
        nombre_comercial: "",
        direccion: "",
        rfc: "",
        domiciliofiscal: "",
        regimenfiscal: "",
        iva: "",
        activo: ""
    
    });

    // ===============================================
    // DATOS PARA LA TABLA 
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarClientes()

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarClientes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/clientes/logistica`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

        // ===============================================
    // COLUMNAS PARA LA TABLA 
    // ===============================================

    const columns = [

        {
            name: 'Nombre',
            selector: row => row.nombre_comercial,
            sortable: true
        },
        {
            name: 'Razon Social',
            selector: row => row.razon_social,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true
        },
        {
            name: 'RFC',
            selector: row => row.rfc,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.activo === 1 ? 
            <button className='btn btn-success'>Activo</button> :
            <button className='btn btn-danger'>Inactivo</button>,
            width: "120px"
        },

        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEditClientes (row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarClienteLogistica"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteCliente(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // FUNCION PARA EDITAR CLIENTES
    // ===============================================

    const handleEditClientes = (id) => {

        axios.get(`${baseURL}api/get/cliente/logistica/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("estadoEditClienteLogistica").value = temp["activo"];
                document.getElementById("ivaEditClienteLogistica").value = temp["iva"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // FUNCION PARA ELIMINAR CLIENTES
    // ===============================================

    const handleDeleteCliente = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este registro?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/delete/cliente/logistica/${id}`,{
        
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
          
                    buscarClientes();
          
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

    return (
        
        <div>

            <h3 className='mb-4'>Clientes</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalAgregarClienteLogistica">
                    <MdOutlineAddCircle/> Agregar Cliente
            </button>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA CREAR CLIENTE */}

            <ModalCrearClienteLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarClientes}
            />

            {/* MODAL EDITAR CLIENTE */}

            <ModalEditarClienteLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarClientes}
            />

        </div>
    )

}

export default ClientesLogistica