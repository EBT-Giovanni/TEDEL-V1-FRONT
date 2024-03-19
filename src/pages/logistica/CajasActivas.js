import React, { useState, useEffect } from 'react';
import { baseURL } from '../../config/config';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdOutlineAddCircle} from 'react-icons/md';
import Cookies from 'js-cookie';
import axios from 'axios';
import Tabla from '../../components/Tabla';
import Swal from 'sweetalert2';
import ModalAgregarCajaActiva from '../../componentsLogistica/cajasActivas/ModalAgregarCajaActiva';


const CajasActivas = () => {

    const [token, setToken] = useState('');

    const [formValues, setFormValues] = useState({

        vehicleName: "",
        placa: "",
        tractorName: "",
        placaTractor: "",
    
    });

    // ===============================================
    // DATOS PARA LA TABLA DE CAJAS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));

        buscarCajas();

        buscarCatalogoCajas();

        buscarCatalogoTractores();

    }, [token]);

    // FUNCION PARA BUSCAR TODAS LAS CAJAS

    const buscarCajas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/get/termos/datatable`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result); 

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA LA TABLA DE CAJAS
    // ===============================================

    const columns = [

        {
            name: 'Termo',
            selector: row => row.vehicleName,
            sortable: true
        },
        {
            name: 'Placas',
            selector: row => row.placa,
            sortable: true
        },
        {
            name: 'Tractor',
            selector: row => row.tractorName,
            sortable: true
        },
        {
            name: 'Placas Tractor',
            selector: row => row.placaTractor,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                  <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
        },

    ];

    // ===============================================
    // ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        const temp = val.split('+'); // [0] = numero de termo / [1] = placa

        if(name === "vehicleName"){

            validarCaja(temp[0], temp[1]);
            
        }

    }
    const handleChange2 = (rowData) => {
        setFormValues({ ...formValues, ["tractorName"]: rowData.numero_economico, ["placaTractor"]: rowData.placa });
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

                console.log("NO EXISTE")

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
    // FUNCION PARA ELIMINAR CAJA
    // ===============================================

    const handleDelete = (id) => {

        const tokeen = Cookies.get('jwtoken');

        console.log(id)

        Swal.fire({
            title: 'Estas seguro de borrar esta caja?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {

              axios.delete(`${baseURL}api/delete/termo/${id}`,{
        
                headers: {"access-token": tokeen}
            
              })
              .then(result => {console.log(result)
          
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
    // BUSCAR CATALOGO DE CAJAS
    // ===============================================

    const [catCajas, setCatCajas] = useState([])

    const buscarCatalogoCajas = () => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/cajas/logistica`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", numero: "Seleccione Termo"});
        
                setCatCajas(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    };

    const [catTractores, setTractores] = useState([])
    const buscarCatalogoTractores = () => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractores`,{
        
            method: "GET",
            headers: {"access-token": token}
        
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

    return (

        <div>

            <h3 className='mb-4'>Cajas Activas SK</h3>

            <button
                type='button'
                className='btn btn-primary'
                data-bs-toggle="modal" 
                data-bs-target="#modalAgregarCajaActiva">
                    <MdOutlineAddCircle/> Agregar Caja
            </button>

            {/* TABLA PARA MOSTRAR CAJAS */}

            <Tabla columns={columns} data={data} />

            {/* MODAL PARA AGREGAR CAJAS */}

            <ModalAgregarCajaActiva
                onChange={handleChange}
                onChange2={handleChange2}
                data = {formValues}
                refresh={buscarCajas}
                catCajas={catCajas}
                catTractores={catTractores}
            />

        </div>

    )

}

export default CajasActivas