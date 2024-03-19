import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';


//COMPONENTES
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';
import {FiDownload} from 'react-icons/fi';
import {BiSave} from 'react-icons/bi';


function GastosOrden({idOrder, idUser, header}) {

    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    // ===============================================
    // SEGMENTO PARA MOSTRAR ACCESORIALES
    // ===============================================

    useEffect(() => {

        setFormValues({ ...formValues, ["rel_orden"]: idOrder, ["rel_user"]:  idUser});

        setToken(Cookies.get('jwtoken'));

        if(idOrder !== 0){

            axios.get(`${baseURL}api/gastos/orden/${idOrder}`,{
        
                method: "GET",
                headers: {"access-token": token}
            
            })
            .then(result => {
        
                if(result.data.success === true && result.data.result !== "Sin resultados")
                {
                    setData(result.data.result);

                }else{
    
                    setData([]);
                }
        
            })
            .catch(error => {
            
                console.log(error)
            
            })

        }
    
    },[idOrder]);

    // ===============================================
    // COLUMNAS PARA LA TABLA
    // ===============================================

    const colums = [

        {
            name: 'Concepto',
            selector: row => row.descripcion,
            sortable: true
        },
        {
            name: 'Monto',
            selector: row => "$ " + row.monto,
            sortable: true
        },
        {
            name: 'DESCARGA',
            selector: row => <button type="button" className='btn btn-outline-info' onClick={() => handleDownload(row.ruta)}><FiDownload/></button>,
            width: "100px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarGasto"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id, row.ruta)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // DATOS PARA INICIALIZAR EL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_orden: "",
        rel_user: "",
        descripcion: "",
        monto: "",
        ruta: 0

    })
    
    // ===============================================
    // VALIDAR SI YA SELECCIONO UNA ORDEN
    // ===============================================

    const handleCreate = () => {

        if(formValues["rel_orden"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione una orden para continuar!',
            })

        }else{

            document.getElementById("btnCrearGastoOrden").click();

        }

    }

    // ===============================================
    // EDITAR GASTO DE ORDEN
    // ===============================================

    const handleEdit = async (id) => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/orden/gastos/id/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result

            temp[0]["archivoActual"] = temp[0]["ruta"]
      
            setFormValues(temp[0]);

        }

    }

    // ===============================================
    // SEGMENTO PARA DESCARGAR ARCHIVO
    // ===============================================

    const handleDownload = (ruta) => {

        if(ruta !== "0"){

            let nombre = ruta.split("%");

            nombre = nombre[1];
    
            axios({
                url: `${baseURL}api/orden/download/gasto`,
                method: 'POST',
                headers: {
                    "access-token": token
                } ,
                responseType: 'blob',
                data: {
                    rutaArchivo: ruta
            }
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', nombre);
                document.body.appendChild(link);
                link.click();
            });

        }else{

            Swal.fire({
                icon: 'warning',
                title: 'Este registro no tiene evidencia!',
            })

        }

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR GASTO
    // ===============================================

    const handleDelete = (id, ruta) => {

        Swal.fire({
            title: 'Estas seguro de borrar este gasto?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {

            if (result.isConfirmed) {
      
                const data = { path: ruta };
                
                fetch(`${baseURL}api/orden/gasto/delete/${id}`, {
                        
                    method: "DELETE", 
                    headers: {
                        "Content-Type": "application/json",
                        "access-token": token
                    },
                    body: JSON.stringify(data),

                })
                .then((response) => response.json())
                .then((data) => {
                    
                    if(data.success === true){

                        
                        Swal.fire({
                        icon: 'success',
                        title: 'Se ha eliminado correctamente!',
                        })
                        .then(() => {
                
                            window.location.reload(false);
                
                        })

                    }

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
      
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

    const handleChangeImg = (event) => {

        setFormValues({ ...formValues, ["ruta"]: event.target.files[0]})

    }

    // ===============================================
    // SUBMIT PARA GASTOS
    // ===============================================

    const urlCreate = baseURL + "api/orden/gasto/crear";

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(formValues);

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(formValues).forEach(entry => {

            const [key,value] = entry;
    
            if(value === "" || value === null){
              
              Swal.fire({
                icon: 'warning',
                title: 'No pueden ir campos vacios!',
              })

              validar = false;
    
              return;
    
            }
    
        });

        if(validar){

            axios.post(urlCreate, formValues,{
  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                } 
        
            })
            .then(result => {
        
                if(result.data.success === true)
                {
            
                    Swal.fire({
                    icon: 'success',
                    title: 'Se ha creado correctamente!',
                    }).then(() => {
            
                        window.location.reload(false);
            
                    })
            
                }
        
            })
            .catch(error => {
        
                console.log(error)
        
            })

        }

    }

    // ===============================================
    // SUBMIT PARA EDITAR GASTOS
    // ===============================================

    const urlEdit = baseURL + "api/orden/gasto/update"

    const handleSubmitEdit = (event) => {

        event.preventDefault();

        console.log(formValues)

        const token = Cookies.get('jwtoken');

        let validar = true;

        Object.entries(formValues).forEach(entry => {

            const [key,value] = entry;
    
            if(value === "" || value === null){
              
              Swal.fire({
                icon: 'warning',
                title: 'No pueden ir campos vacios!',
              })

              validar = false;
    
              return;
    
            }
    
        });

        if(validar){

            axios.put(urlEdit, formValues,{
  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "access-token": token
                } 
            
              })
              .then(result => {
          
                if(result.data.success === true)
                {
          
                  Swal.fire({
                    icon: 'success',
                    title: 'Se ha editado correctamente!',
                  }).then(() => {
          
                    window.location.reload(false);
          
                  })
          
                }
            
              })
              .catch(error => {
            
                console.log(error)
            
              })

        }

    }

    // ===============================================

    return (

        <div>

            <h3 className='mt-3 text-center'>Gastos {header}</h3>

            {/* VALIDAR SI PUEDE ABRIR EL MODAL */}

            <button 
                type="button" 
                className="btn btn-primary mt-4" 
                onClick={() => handleCreate()}>
                <MdAddCircle/> Agregar Gasto
            </button>

            {/* ABRIR EL MODAL PARA CREAR GASTO */}

            <button 
                id="btnCrearGastoOrden"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearGasto">
            </button>

            {/* TABLA PARA MOSTRAR GASTOS */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <div className="modal fade" id="modalCrearGasto" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

                <div className="modal-dialog">

                    <div className="modal-content">

                    <form onSubmit={handleSubmit}>

                        <div className="modal-header">

                            <h5 className="modal-title" id="exampleModalLabel">Agregar Gasto</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>

                        <div className="modal-body">

                            <div className='row'>

                            {/* DESCRIPCION */}

                            <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Descripcion:</span>

                                    <input
                                        className='form-control'
                                        key="descripcionOrden"
                                        type="text"
                                        name="descripcion"
                                        placeholder="Ingrese descripcion"
                                        autoComplete = "off"
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* MONTO */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Monto:</span>

                                    <input
                                        className='form-control'
                                        key="montoOrden"
                                        type="number"
                                        name="monto"
                                        placeholder="Ingrese monto"
                                        autoComplete = "off"
                                        step=".01"
                                        onChange={handleChange}
                                    />

                                </div>

                                {/* EVIDENCIA */}

                                <div className='col-12 mb-3'>

                                    <span className="badge text-bg-secondary mb-2">Evidencia:</span>

                                    <input 
                                        key="rutaOrdenGasto" 
                                        className="form-control"  
                                        type="file"
                                        name="ruta"
                                        onChange={handleChangeImg}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="submit" className='btn btn-primary float-end'><BiSave/> Guardar</button>

                        </div>

                    </form>

                    </div>

                </div>

            </div>

            {/* MODAL PARA EDITAR COMENTARIO */}

            <div className="modal fade" id="modalEditarGasto" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">

            <div className="modal-dialog">

                <div className="modal-content">

                <form onSubmit={handleSubmitEdit}>

                    <div className="modal-header">

                        <h5 className="modal-title" id="exampleModalLabel">Agregar Gasto</h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                    </div>

                    <div className="modal-body">

                        <div className='row'>

                        {/* DESCRIPCION */}

                        <div className='col-12 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Descripcion:</span>

                                <input
                                    className='form-control'
                                    key="descripcionOrden"
                                    type="text"
                                    name="descripcion"
                                    defaultValue={formValues["descripcion"]}
                                    placeholder="Ingrese descripcion"
                                    autoComplete = "off"
                                    onChange={handleChange}
                                />

                            </div>

                            {/* MONTO */}

                            <div className='col-12 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Monto:</span>

                                <input
                                    className='form-control'
                                    key="montoOrden"
                                    type="number"
                                    name="monto"
                                    defaultValue={formValues["monto"]}
                                    placeholder="Ingrese monto"
                                    autoComplete = "off"
                                    step=".01"
                                    onChange={handleChange}
                                />

                            </div>

                            {/* EVIDENCIA */}

                            <div className='col-12 mb-3'>

                                <span className="badge text-bg-secondary mb-2">Evidencia:</span>

                                <input 
                                    key="rutaOrdenGasto" 
                                    className="form-control"  
                                    type="file"
                                    name="ruta"
                                    onChange={handleChangeImg}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button type="submit" className='btn btn-primary float-end'><BiSave/> Guardar</button>

                    </div>

                </form>

                </div>

            </div>

            </div>

        </div>

    )

}

export default GastosOrden