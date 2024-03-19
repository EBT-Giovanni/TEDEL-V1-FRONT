import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';

// ICONOS
import {MdAttachMoney} from 'react-icons/md';

//COMPONENTES
import Tabla from '../../components/Tabla';
import ModalRegistros from './modales/ModalRegistros';
import ModalCrearGastoAsignado from './modales/ModalCrearGastoAsignado';
import ModalEditarGastoAsignado from './modales/ModalEditarGastoAsignado';
import ModalValidarGastoOperador from './modales/ModalValidarGastoOperador';

const OrdenesAbiertas = () => {

    const [token, setToken] = useState('');

    //==========================================

    //#region ORDENES ABIERTAS

    // ===============================================
    // SEGMENTO PARA ORDENES ABIERTAS
    // ===============================================

    const [data, setData] = useState([]);

    useEffect(() => {

        buscarOrdenesAbiertas();
    
    },[token]);

    // FUNCION PARA BUSCAR ORDENES

    const buscarOrdenesAbiertas = () => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/despachos/asignados`,{
        
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

    // ===============================================
    // COLUMNAS PARA TABLA
    // ===============================================

    const colums = [

        {
            name: 'Orden',
            selector: row => row.id + " - " +row.nombre_comercial,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Operador',
            selector: row => row.operador,
            sortable: true,
            width: "30%"
        },
        {
            name: 'Estado',
            selector: row => row.estatus,
            width: "30%"
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalGestionarBiaticos" type="button" onClick={() => handleGastos(row.id, row.operador, row.rel_estatus_orden)}><MdAttachMoney/></button>
                </div>
                
            ),
            width: "10% "
            
        },

    ];

    // ===============================================
    // VALIDAR SI CAMBIA ESTADO
    // ===============================================

    const [estado, setEstado] = useState(false);

    const handleEstado = () => {

        setEstado(!estado);

    }

    // ===============================================
    // MANEJAR GASTOS 
    // ===============================================

    const [idOrden, setIdOrden] = useState(0);

    const [operador, setOperador] = useState('');

    const [disable, setDisable] = useState(false);

    const handleGastos = (id, nombreOperador, estatus) => {

        setBiaticos(0)
        setTotalGastosAprobados(0)
        setGastosOperador(0)

        if(estatus === 3 || estatus === 5 || estatus === 6){

            setDisable(true);

        }

        // SETEAMOS EL VALOR DEL ID DE LA ORDEN Y EL NOMBRE DEL OPERADOR PARA PASARLO AL MODAL

        setIdOrden(id);
        setOperador(nombreOperador);

    }

    // ===============================================
    // CARGAR TIPOS DE GASTOS PARA SELECT
    // ===============================================

    const [gastos, setGastos] = useState([]);

    useEffect(()=>{

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/get/tipo/gastos`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success == true && result.data.result !== "Sin resultados")
            {

                let temp = result.data.result;

                temp.unshift({id: "", descripcion: "Seleccione el tipo de gasto"})

                setGastos(temp);
                
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })

    },[token])

    // ===============================================
    // DATOS PARA EL FORMULARIO
    // ===============================================

    const [formValues, setFormValues] = useState({

        rel_orden: idOrden,
        rel_user: 0,
        tipo_gasto: "",
        monto: "",
        ruta: ""

    });

    
    // ===============================================
    // CAPTURAR ID DE ORDEN Y DE USUARIO
    // ===============================================

    useEffect(() => {

        if(idOrden !== 0){

            setFormValues({

                rel_orden: idOrden,
                rel_user: Cookies.get('idUser'),
                tipo_gasto: "",
                monto: "",
                ruta: ""
        
            })

            //setFormValues({ ...formValues, ["rel_orden"]: idOrden, ["rel_user"]:Cookies.get('idUser')})

        }

    }, [idOrden])

    // ===============================================
    // SEGMENTO PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChange = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        if(name === "ruta"){

            setFormValues({ ...formValues, ["ruta"]: event.target.files[0]});

        }else{

            setFormValues({ ...formValues, [name]: val});

        }

    }

    //#endregion

    //==========================================

    //#region GASTOS DEL OPERADOR

    // ===============================================
    // DATOS PARA EL FORMULARIO
    // ===============================================

    const [formValidarGastos, setFormValidarGastos] = useState({

        id: "",
        monto_aprobado: 0,
        adeudo: "",
        comentario: "",
        descripcion: "",
        monto: ""

    });

    // ===============================================
    // FUNCION PARA ACTUALIZAR FORMULARIO
    // ===============================================

    const handleChangeGastosOperador = (event) => {

        const val = event.target.value;
        const name = event.target.name;

        console.log(val, name)

        if(name === "monto_aprobado"){

            const total = parseFloat(totalGastosAprobados) + parseFloat(val) ;

            if(total > biaticos){

                Swal.fire({
                    icon: 'warning',
                    title: 'A excedido la cantidad de viaticos asignados!',
                    text: 'Aumente los viaticos asigandos para continuar'
                  }).then(() => {
          
                    setFormValidarGastos({ ...formValidarGastos, ["monto_aprobado"]: 0, ["comprobado"]:0});

                    document.getElementById("inputMontoGastoAprobado").value = "0";
          
                })

            }else{

                setFormValidarGastos({ ...formValidarGastos, [name]: val});

            }

        }else{

            setFormValidarGastos({ ...formValidarGastos, [name]: val});

        }

    }

    // ===============================================
    // VALIDAR SI CAMBIA ESTADO PARA GASTOS DE OPERADOR
    // ===============================================

    const [estadoGastos, setEstadoGastos] = useState(false);

    const handleEstadoGastos = () => {

        setEstadoGastos(!estadoGastos);

    }

    //#endregion

    //==========================================

    //#region BITACORA DE GASTOS

    // ===============================================
    // TOTAL DE BIATICOS
    // ===============================================

    const [biaticos, setBiaticos] = useState(0);

    const [totalGastosAprobados, setTotalGastosAprobados] = useState(0);

    const [totalGastosOperador, setGastosOperador] = useState(0);

    //#endregion

    //==========================================

    return (

        <div className='mt-4'>

            {/* TABLA DE ORDENES ABIERTAS */}

            <Tabla columns = {colums} data = {data}/>

            {/* MODAL PARA VER REGISTROS */}

            <ModalRegistros 
                idOrden={idOrden} 
                operador={operador} 
                estado={estado}
                estadoGastos={estadoGastos}
                setFormValues={setFormValues}
                setFormValidar={setFormValidarGastos}
                setBiaticos={setBiaticos}
                viaticos={biaticos}
                setTotalGastosAprobados={setTotalGastosAprobados}
                gastosAprobados={totalGastosAprobados}
                setGastosOperador={setGastosOperador}
                totalGastosOperador={totalGastosOperador}  
                disable={disable}
            />

            {/* MODAL PARA CREAR GASTO ASIGNADO */}

            <ModalCrearGastoAsignado 
                idOrden={idOrden} 
                operador={operador} 
                cambiarEstado={handleEstado}
                gastos={gastos}
                handleChange={handleChange}
                formValues={formValues}
            />

            {/* MODAL PARA EDITAR GASTOS ASIGNADOS */}

            <ModalEditarGastoAsignado
                idOrden={idOrden} 
                operador={operador} 
                cambiarEstado={handleEstado}
                gastos={gastos}
                handleChange={handleChange}
                formValues={formValues}
            />

            {/* MODAL PARA VALIDAR GASTOS DEL OPERADOR */}

            <ModalValidarGastoOperador
                change={handleChangeGastosOperador}
                cambiarEstado={handleEstadoGastos}
                formValues={formValidarGastos}
            />

        </div>

    )

}

export default OrdenesAbiertas