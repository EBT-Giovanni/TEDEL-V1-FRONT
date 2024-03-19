import React, { useState, useEffect } from 'react';
import { baseURL } from '../config/config';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdOutlineAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../components/Tabla';
import Swal from 'sweetalert2';
import CrearCaja from '../components/cajas/CrearCaja';
import EditarCaja from '../components/cajas/EditarCaja';

//===================================================================

const Cajas = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        numero: "",
        tipo: "",
        placas: "",
        marca: "",
        empresa: "",
        anio: "",
        rel_estatus_caja: "1",
        activo: ""
    
    });

    // ===============================================
    // DATOS PARA LA TABLA DE CAJAS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarCajas()

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarCajas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/cajas`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA DE CAJAS
    // ===============================================

    const columns = [

        {
            name: 'Numero',
            selector: row => row.numero,
            sortable: true
        },
        {
            name: 'Tipo',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: 'Empresa',
            selector: row => row.empresa,
            sortable: true
        },
        {
            name: 'Año',
            selector: row => row.anio,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estatus,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarCaja" onClick={(e) => handleEdit(row.id)} type="button"><BsPencil/></button>
                  <button className="btn btn-outline-danger" type="button" onClick={(e) => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
        },

    ];

    // ===============================================
    // SEGMENTO PARA TRAER ESTATUS
    // ===============================================

    const [status, setStatus] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/estatus/cajas`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", estatus: "Seleccione Estado"});
        
                setStatus(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA EDITAR CAJAS
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/cajas/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("selectEstadoCajaEdit").value = temp["activo"];
                document.getElementById("selectEmpresaCajaEdit").value = temp["empresa"];
                document.getElementById("selectEstatusCajaEdit").value = temp["rel_estatus_caja"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR CAJAS
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
      
              axios.delete(`${baseURL}api/cajas/elimina/${id}`,{
        
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
          
                    buscarCajas();
          
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
            
            <h3 className='mb-4'>Cajas</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearCaja">
                    <MdOutlineAddCircle/> Agregar Caja
            </button>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA CREAR CAJA */}

            <CrearCaja 
                onChange = {handleChange}
                data = {formValues}
                estatus = {status}
                refresh={buscarCajas}
            />

            {/* MODAL PARA EDITAR CAJA */}

            <EditarCaja
                onChange = {handleChange}
                data = {formValues}
                estatus = {status}
                refresh={buscarCajas}
            />
            

        </div>

    );

}

export default Cajas;
