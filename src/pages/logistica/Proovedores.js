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

import ModalCrearProveedor from '../../componentsLogistica/proveedores/ModalCrearProveedor';
import ModalEditarProveedor from '../../componentsLogistica/proveedores/ModalEditarProveedor';

const Proovedores = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        clave: "",
        razon_social: "",
        nombre_comercial: "",
        direccion: "",
        rfc: "",
        activo: ""
    
    });

    // ===============================================
    // DATOS PARA LA TABLA 
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarProveedores()

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarProveedores = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/proveedores`, config);

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
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEditProveedores(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarProveedor"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteProveedores(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // FUNCION PARA EDITAR PROVEEDORES
    // ===============================================

    const handleEditProveedores = (id) => {

        axios.get(`${baseURL}api/get/proveedor/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("selectEstadoProveedor").value = temp["activo"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // FUNCION PARA EDITAR PROVEEDORES
    // ===============================================

    const handleDeleteProveedores = (id) => {

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
      
              axios.delete(`${baseURL}api/delete/proveedor/${id}`,{
        
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
          
                    buscarProveedores();
          
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

    // ===============================================
    // ===============================================

    return (

        <>

            <h3 className='mb-4'>Proveedores</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalAgregarProveedor">
                    <MdOutlineAddCircle/> Agregar Proveedor
            </button>
        
            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA CREAR PROVEEDORES */}

            <ModalCrearProveedor
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarProveedores}
            />

            {/* MODAL PARA EDITAR PROVEEDORES */}

            <ModalEditarProveedor
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarProveedores}
            />

        </>

    )

}

export default Proovedores