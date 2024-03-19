import React, { useState, useEffect } from 'react';
import { baseURL } from '../../config/config';
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdOutlineAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import Swal from 'sweetalert2';
import ModalCrearCajaLogistica from '../../componentsLogistica/cajasLogistica/ModalCrearCajaLogistica';
import ModalEditarCajaLogistica from '../../componentsLogistica/cajasLogistica/ModalEditarCajaLogistica';

const CajasLogistica = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        numero: "",
        tipo: "",
        placas: "",
        marca: "",
        proveedor: "",
        anio: "",
    
    });

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
            name: 'Proveedor',
            selector: row => row.proveedor,
            sortable: true
        },
        {
            name: 'Año',
            selector: row => row.anio,
            sortable: true,
            width: '10%'
        },
        {
            name: 'Estado',
            selector: row => row.estatus_caja,
            sortable: true,
            width: '15%'
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modalEditarCajaLogistica" onClick={(e) => handleEdit(row.id)} type="button"><BsPencil/></button>
                  <button className="btn btn-outline-danger" type="button" onClick={(e) => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: '10%'
        },

    ];

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

        const response = await axios.get(`${baseURL}api/get/cajas/logistica`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result)

        }else{

            setData([]);

        }

    }

    // ===============================================
    // SEGMENTO PARA TRAER PROOVEDORES
    // ===============================================

    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/proveedores`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", nombre_comercial: "Seleccione Proveedor"});
        
                setProveedores(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // EDITAR CAJA
    // ===============================================

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/get/cajas/logistica/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {

                let temp = result.data.result[0];

                document.getElementById("estadoCajaLogisticaEdit").value = temp["estatus_caja"];
                document.getElementById("proveedorCajaEdit").value = temp["proveedor"];

                setFormValues(temp);

            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // ELIMINAR CAJA
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
      
              axios.delete(`${baseURL}api/delete/caja/logistica/${id}`,{
        
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
                data-bs-target="#modalCrearCajaLogistica">
                    <MdOutlineAddCircle/> Agregar Caja
            </button>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL CREAR CAJA */}

            <ModalCrearCajaLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarCajas}
                proveedores={proveedores}
            />

            {/* MODAL EDITAR CAJA */}

            <ModalEditarCajaLogistica
                onChange = {handleChange}
                data = {formValues}
                refresh={buscarCajas}
                proveedores={proveedores}
            />

        </div>

    )

}

export default CajasLogistica