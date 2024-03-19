import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

//COMPONENTES
import Tabla from '../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import CrearDirecciones from '../components/direcciones/CrearDirecciones';
import EditarDirecciones from '../components/direcciones/EditarDirecciones';

const Direcciones = () => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR CLIENTES
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    

    useEffect(() => {

        buscarDatos();
    
    },[token]);

    // FUNCION PARA BUSCAR LOS DATOS

    const buscarDatos = async () => {

        setToken(Cookies.get('jwtoken'));
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        const response = await axios.get(`${baseURL}api/direcciones`, config);
  
        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    //COLUMNAS PARA LA TABLA

    const colums = [

        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true
        },
        {
            name: 'Locacion',
            selector: row => row.lugar,
            sortable: true
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Direccion',
            selector: row => row.direccion,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarDireccion" onClick={() => handleEdit(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ];

    // ===============================================
    // DATOS PARA EL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_cliente: "",
        rel_origen: "",
        nombre: "",
        direccion: "",
        rfc: "",
        contacto: "",
        telefono: "",

    });

    // ===============================================
    // SEGMENTO PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val})

    }

    // ===============================================
    // SEGMENTO PARA EDITAR DIRECCIONES
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/direccion/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success === true)
            {
                let temp = result.data.result[0];
                setFormValues(temp);
                document.getElementById("editarClienteDireccion").value = temp["rel_cliente"];
                document.getElementById("editarUbicacionDireccion").value = temp["rel_origen"];
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR RUTAS
    // ===============================================

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar esta direccion?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/direccion/delete/${id}`,{
        
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
          
                    buscarDatos();
          
                  })
      
                }
          
              })
              .catch(error => {
            
                console.log(error)
            
              })
      
            }
            
        })

    }

    //========================================================

    return (

        <div>

            <h3 className='mb-4'>Direcciones</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearDireccion">
                <MdAddCircle/> Agregar Direccion
            </button>

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR RUTA */}

            <CrearDirecciones
                onChange={handleChange}
                data={formValues}
                refresh={buscarDatos}
            />

            {/* MODAL PARA EDITAR RUTA */}

            <EditarDirecciones
                onChange={handleChange}
                data={formValues}
                refresh={buscarDatos}
            />
            
        </div>

    );

}

export default Direcciones;
