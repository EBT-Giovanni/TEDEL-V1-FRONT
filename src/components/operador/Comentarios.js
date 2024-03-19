import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

//COMPONENTES
import Tabla from '../Tabla';
import CrearComentarioOp from './modales/CrearComentarioOp';
import EditarComentarioOperador from './modales/EditarComentarioOperador';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {MdAddCircle} from 'react-icons/md';

function Comentarios({idOperador}) {

    // ===============================================
    // DATOS PARA CREAR EL REGISTRO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_operador: 0,
        comentario: ""

    })

    const [token, setToken] = useState('');

    // ===============================================
    // GUARDAR COMENTARIOS DEL OPERADOR
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        if(idOperador !== 0){

            setFormValues({ ...formValues, ["rel_operador"]: idOperador });

            buscarComentarios(idOperador)

        }

    }, [idOperador])

    // ===============================================
    // BUSCAR COMENTARIOS DEL OPERADOR
    // ===============================================

    const buscarComentarios = async (id) => {
  
        const config = {
  
          headers: {"access-token": token},
  
        };

        const response = await axios.get(`${baseURL}api/comentarios/operador/${id}`, config);

        if(response.data.success === true && response.data.result !== 'Sin resultados')
        {

            setData(response.data.result);

        }
        else{

            setData([])

        }

    }

    // ===============================================
    // COLUMNAS PARA TABLA DE COMENTARIOS
    // ===============================================

    const columns = [

        {
            name: 'COMENTARIO',
            selector: row => row.comentario,
            sortable: true
        },
        {
            name: 'FECHA',
            selector: row => moment(row.timestamp).format('DD/MM/YYYY'),
            sortable: true
        },
        {
            name: "ACCIONES",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarComentario" onClick={() => handleEdit(row.id)}><BsPencil/></button>
                </div>
            
            ),
        },
    
    ];

    // ===============================================
    // EDITAR COMENTARIO
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/comentarios/id/${id}`,{
  
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
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    // ===============================================
    // VALIDAR SI ESCOGIO ALGUN OPERADOR
    // ===============================================

    const handleValidate = () => {

        if(formValues["rel_operador"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un operador para continuar!',
            })

        }else{

            document.getElementById("btnAbrirlModalCrearComentario").click();

        }

    }

    return (

        <div className='mt-3'>

            {/* BOTON PARA VALIDAR SI PUEDE ABRIR EL MODAL */}

            <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleValidate()}>
                <MdAddCircle/> Agregar Comentario
            </button>

            {/* BOTON PARA ABIR MODAL */}

            <button 
                type="button" 
                id="btnAbrirlModalCrearComentario"
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearComentarioOperador">
            </button>

            {/* MODAL PARA CREAR COMENTARIOS */}

            <CrearComentarioOp
                onChange = {handleChange}
                data = {formValues}
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <EditarComentarioOperador
                onChange = {handleChange}
                data = {formValues}
            />

            {/* TABLA PARA MOSTRAR COMENTARIOS */}

            <Tabla columns = {columns} data = {data}/>



        </div>

    )

}

export default Comentarios