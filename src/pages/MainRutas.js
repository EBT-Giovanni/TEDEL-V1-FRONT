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
import ModalCrearRuta from '../components/rutas/ModalCrearRuta';
import ModalEditarRuta from '../components/rutas/ModalEditarRuta';
import ReporteRutas from '../components/rutas/ReporteRutas';

const MainRutas = () => {

    // ===============================================
    // SEGMENTO PARA MOSTRAR RUTAS
    // ===============================================

    const [data, setData] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR RUTAS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        buscarRutas();
    
    },[token]);

    // FUNCION PARA BUSCAR LOS DATOS

    const buscarRutas = async () => {

        const config = {
  
            headers: {"access-token": token},
    
        };

        const response = await axios.get(`${baseURL}api/rutas/tabla`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            setData(response.data.result);

        }else{

            setData([]);

        }

    }

    // ===============================================
    // COLUMNAS PARA TABLAS
    // ===============================================

    const colums = [

        {
            name: 'Cliente',
            selector: row => row.nombre_comercial,
            sortable: true
        },
        {
            name: 'Tipo Ruta',
            selector: row => row.tipo,
            sortable: true
        },
        {
            name: 'Origen',
            selector: row => row.rutaOrigen,
            sortable: true
        },
        {
            name: 'Destino',
            selector: row => row.rutaDestino,
            sortable: true
        },
        {
            name: 'Tarifa',
            selector: row => row.tarifa,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.activa === 1 ? 
            <button className='btn btn-success'>Activo</button> :
            <button className='btn btn-danger'>Inactivo</button>,
            width: "113px"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" data-bs-toggle="modal" data-bs-target="#modalEditarRuta" onClick={() => handleEditRuta(row.id)}><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDeleteRuta(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "90px"
            
        },

    ]

    const [formValues, setFormValues] = useState({
        rel_cliente: "",
        rel_tipo_ruta: "",
        clave: "",
        origen: "",
        rel_direccion_origen: "",
        destino: "",
        rel_direccion_destino: "",
        monto_pistas: "",
        gasera: "",
        moneda: "",
        tarifa: "",
        planta: "",
        km: "",
        costo_x_km: "",
        imp_ex: "",
        activa: ""
    })



    //ARREGLO PARA SELECT ACTIVO

    const activos = [

        {id: "", activo: "Seleccione el Estado"},
        {id: 1, activo: "Activo"},
        {id: 0, activo: "Inactivo"}

    ];

    //ARREGLO PARA IMPORTACION EXPORTACION

    const imp_ex = [

        {id: "", estado: "Seleccione la condicion"},
        {id: "Importacion", estado: "Importacion"},
        {id: "Exportacion", estado: "Exportacion"}

    ];

    //ARREGLO PARA SELECT MONEDA

    const moneda = [

        {id: "", option: "Seleccione tipo de Moneda"},
        {id: "Peso", option: "Peso"},
        {id: "Dolar", option: "Dólar"}

    ];

    //TRAER TODOS LOS CLIENTES PARA EL FORMULARIO

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/clientes`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let client = result.data.result;

                client.unshift({id: "", nombre_comercial: "Seleccione el cliente"});
        
                setClientes(client);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    //TRAER TIPOS DE RUTA PARA FORMULARIO 

    const [cat_ruta, setCat_ruta] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/cat_rutas`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let rut = result.data.result;

                rut.unshift({id: "", tipo: "Seleccione el tipo de Ruta"});
        
                setCat_ruta(rut);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    //TRAER ORIGENES Y DESTINOS

    const [destinos, setDestinos] = useState([]);

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/cat/destinos/select`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                let des = result.data.result;

                des.unshift({id: "", ciudad: "Seleccione locacion"});
        
                setDestinos(des);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[token]);

    // ===============================================
    // SEGMENTO PARA EDITAR RUTAS
    // ===============================================

    const handleEditRuta = async (id) => {

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/ruta/${id}`, config);

        if(response.data.success === true && response.data.result !== "Sin resultados"){

            let temp = response.data.result[0];

            setFormValues(temp);

            document.getElementById("clienteSelectRuta").value = temp["rel_cliente"];

            document.getElementById("rutaSelectEdit").value = temp["rel_tipo_ruta"];

            document.getElementById("origenSelectEdit").value = temp["origen"];

            document.getElementById("destinoSelectEdit").value = temp["destino"];

            document.getElementById("monedaSelectEditar").value = temp["moneda"];

            document.getElementById("estadoSelectEdit").value = temp["activa"];

            document.getElementById("imp_exRuta").value = temp["imp_ex"];

            buscarDireccion(temp["origen"], "ORIGEN");
            buscarDireccion(temp["destino"], "DESTINO");

            setTimeout(() => {
                document.getElementById("direccionOrigenSelect").value = temp["rel_direccion_origen"];
                document.getElementById("direccionDestinoSelect").value = temp["rel_direccion_destino"];
            }, 1000);



        }

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR RUTAS
    // ===============================================

    const handleDeleteRuta = (id) => {

        Swal.fire({
            title: 'Estas seguro de borrar esta ruta?',
            text: "Esta accion no podra ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
      
              axios.delete(`${baseURL}api/ruta/delete/${id}`,{
        
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
          
                    window.location.reload(false);
          
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
    // SEGMENTO PARA CAMBIAR ACTUALIZAR INPUTS
    // ===============================================

    const handleChange = (event) => {
        
        const val = event.target.value;
        const name = event.target.name;

        setFormValues({ ...formValues, [name]: val });

    }

    //FUNCION PARA BUSCAR LAS DIRECCIONES

    const buscarDireccion = async (idOrigen, opcion) => {

        setToken(Cookies.get('jwtoken'));

        const config = {

            headers: {
                "access-token": token
            },
    
        };

        const response = await axios.get(`${baseURL}api/direccion/ubicacion/${idOrigen}`, config);

        if(opcion === "ORIGEN"){

            if(response.data.success === true && response.data.result !== "Sin resultados"){
    
                let temp = response.data.result;
    
                temp.unshift({id: "", nombre: "Seleccione una direccion para la entrega"});
    
                setDireccionOrigen(temp);
    
            }else{
    
                setDireccionOrigen([{id: "", nombre: "No hay direcciones con esta ubicacion"}]);
                formValues["rel_direccion_origen"] = "";
    
            }

        }
        else if(opcion === "DESTINO"){

            if(response.data.success === true && response.data.result !== "Sin resultados"){
    
                let temp = response.data.result;
    
                temp.unshift({id: "", nombre: "Seleccione una direccion para la entrega"});
    
                setDireccionDestino(temp);
    
            }else{
    
                setDireccionDestino([{id: "", nombre: "No hay direcciones con esta ubicacion"}]);
                formValues["rel_direccion_destino"] = "";
    
            }

        }

    }

    // ===============================================
    // SEGMENTO PARA CARGAR SELECT PARA DIRECCION ORIGEN
    // ===============================================

    const [direccionOrigen, setDireccionOrigen] = useState([]);

    useEffect(() => {

        if(formValues["origen"] !== ""){

            buscarDireccion(formValues["origen"], "ORIGEN");

        }

    },[formValues["origen"]])

    // ===============================================
    // SEGMENTO PARA CARGAR SELECT PARA DIRECCION ORIGEN
    // ===============================================

    const [direccionDestino, setDireccionDestino] = useState([]);

    useEffect(() => {

        if(formValues["destino"] !== ""){

            buscarDireccion(formValues["destino"], "DESTINO");

        }

    },[formValues["destino"]])

    //=============================================================

    return (

        <div>

            <h3 className='mb-4'>Rutas</h3>

            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearRuta"
                style={{ marginRight: 20}}
            >
                <MdAddCircle/> Agregar Ruta
            </button>

            <ReporteRutas rutas={data}/>

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA CREAR RUTA */}

            <ModalCrearRuta
                data={formValues}
                change={handleChange}
                clientes={clientes}
                cat_ruta={cat_ruta}
                destinos={destinos}
                direccionOrigen={direccionOrigen}
                direccionDestino={direccionDestino}
                moneda={moneda}
                imp_ex={imp_ex}
                activos={activos}
                refresh={buscarRutas}
            />

            {/* MODAL EDITAR RUTA */}

            <ModalEditarRuta
                data={formValues}
                change={handleChange}
                clientes={clientes}
                cat_ruta={cat_ruta}
                destinos={destinos}
                direccionOrigen={direccionOrigen}
                direccionDestino={direccionDestino}
                moneda={moneda}
                imp_ex={imp_ex}
                activos={activos}
                refresh={buscarRutas}
            />

        </div>

    );

}

export default MainRutas;
