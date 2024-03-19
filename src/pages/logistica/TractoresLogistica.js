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
import ModalCrearTractorLogistica from '../../componentsLogistica/tractoresLogistica/ModalCrearTractorLogistica';
import ModalEditarTractorLogistica from '../../componentsLogistica/tractoresLogistica/ModalEditarTractorLogistica';

const TractoresLogistica = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        numero_economico: "",
        anio: "",
        marca: "",
        modelo: "",
        color: "",
        permiso_sct: "",
        odometro: "",
        placas: "",
        activo: ""
    
    });

    // ===============================================
    // COLUMNAS PARA LA TABLA 
    // ===============================================

    const columns = [

        {
            name: 'Marca',
            selector: row => row.marca,
            sortable: true
        },
        {
            name: 'Modelo',
            selector: row => row.modelo,
            sortable: true
        },
        {
            name: 'Numero Economico',
            selector: row => row.numero_economico,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarTractorLogistica" onClick={() => handleEdit(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id, row.foto_ruta)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "125px"
            
        },

    ];

    // ===============================================
    // DATOS PARA LA TABLA 
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarTractores()

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarTractores = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/tractores/logistica`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // SEGMENTO PARA EDITAR TRACTORES
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/get/tractores/logistica/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("estadoTractorLogisticaEditar").value = temp["activo"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR TRACTORES
    // ===============================================

    const handleDelete = (id) => {

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
      
              axios.delete(`${baseURL}api/delete/tractor/logistica/${id}`,{
        
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
          
                    buscarTractores();
          
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

            <h3 className='mb-4'>Tractores</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearTractorLogistica">
                    <MdOutlineAddCircle/> Agregar Tractor
            </button>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA CREAR TRACTOR */}

            <ModalCrearTractorLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarTractores}
            />

            {/* MODAL PARA EDITAR TRACTOR */}

            <ModalEditarTractorLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarTractores}
            />

        </div>

    )

}

export default TractoresLogistica