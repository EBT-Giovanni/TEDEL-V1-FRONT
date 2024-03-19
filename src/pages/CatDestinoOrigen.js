import React, { useState, useEffect } from 'react';
import { baseURL } from '../config/config';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdOutlineAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../components/Tabla';
import Swal from 'sweetalert2';
import ModalCrearOrigen from '../components/cat_origen_destino/ModalCrearOrigen';
import ModalEditarOrigen from '../components/cat_origen_destino/ModalEditarOrigen';


//===================================================================

const CatDestinoOrigen = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        ciudad: "",
        estado: "",
        direccion: "",
        nombre: ""
    
    }); 

    // ===============================================
    // SEGMENTO PARA MOSTRAR DESTINO ORIGEN
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        buscarOrigenes();
    
    },[token]);

    //FUNCION PARA MOSTRAR DESTINOS

    const buscarOrigenes = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/cat/destinos`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA 
    // ===============================================

    const colums = [

        {
            name: 'CIUDAD',
            selector: row => row.ciudad,
            sortable: true
        },
        {
            name: 'ESTADO',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarOrigenCat" onClick={() => handleEditDestino(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteDestino(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ]

    // ===============================================
    // SEGMENTO PARA EDITAR CLIENTES
    // ===============================================

    const handleEditDestino = (id) => {

        axios.get(`${baseURL}api/cat/destino/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result[0]);
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR CLIENTES
    // ===============================================

    const handleDeleteDestino = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar este destino?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/cat/destino/delete/${id}`,{
        
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
          
                    buscarOrigenes();
          
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

            <h3 className='mb-4'>Origen Y Destinos</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearOrigenCat">
                <MdOutlineAddCircle/> Agregar Destino
            </button>

            {/* TABLA PARA MOSTRAR DESTINOS */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR DESTINO */}

            <ModalCrearOrigen
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarOrigenes}
            />

            {/* MODAL PARA EDITAR DESTINO */}

            <ModalEditarOrigen
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarOrigenes}
            />
            
        </div>

    );

}

export default CatDestinoOrigen;
