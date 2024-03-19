import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { baseURL } from '../../config/config';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

//COMPONENTES
import DynamicForm from '../../components/DynamicForm';
import Tabla from '../../components/Tabla';

//ICONS
import {BsPencil} from 'react-icons/bs';
import {RiDeleteBinFill} from 'react-icons/ri';
import {MdAddCircle} from 'react-icons/md';

const TractorConfidencial = (id) => {

    const idTractor = id.idTractor;

    // ===============================================
    // SEGMENTO PARA MOSTRAR COMENTARIOS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR COMENTARIOS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractor/informacion/${idTractor}`,{
        
            method: "GET",
            headers: {"access-token": token}
        
        })
        .then(result => {
    
            if(result.data.success === true && result.data.result !== "Sin resultados")
            {
                setData(result.data.result);

                setColumns(colums)
            }else{

                setData([]);
            }
    
        })
        .catch(error => {
        
            console.log(error)
        
        })
    
    },[id]);

    const colums = [

        {
            name: 'Serie',
            selector: row => row.serie,
            sortable: true
        },
        {
            name: 'Num. Motor',
            selector: row => row.numero_motor,
            sortable: true
        },
        {
            name: 'Precio',
            selector: row => "$ "+row.precio,
            sortable: true
        },
        {
            name: 'Fecha Compra',
            selector: row => moment(row.fecha_compra).format('YYYY-MM-DD'),
            sortable: true
        },
        {
            name: 'Num. Factura',
            selector: row => row.factura,
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
              
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarInfoTractor"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
             
            ),
            width: "130px"
            
        },

    ]

    // ===============================================
    // SEGMENTO PARA CREAR INFORMACION
    // ===============================================

    //URL PARA CREAR COMENTARIO

    const urlCreate = baseURL + "api/tractor/informacion/crear";

    //VALORES PARA INICIAR FORMULARIO

    const initialFormValues = [{

        rel_tractor: idTractor,
        serie: "",
        numero_motor: "",
        depreciacion_porciento: "",
        fecha_compra: "",
        precio: "",
        factura: "",
        empresa_agencia: "",
        forma_pago: "",
        fecha_liquidacion: ""

    }];

    // DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        serie: {type: "input", inputType: "text", placeholder: "Ingrese serie de tractor", label: "Serie", name: "serie", col:"col-12 mb-4"},

        numero_motor: {type: "input", inputType: "text", placeholder: "Ingrese numero motor", label: "Num. Motor", name: "numero_motor", col:"col-12 mb-4"},

        depreciacion_porciento: {type: "input", inputType: "number", placeholder: "En porcentaje", label: "Depreciacion", name: "depreciacion_porciento", col:"col-6 mb-4"},

        fecha_compra: {type: "input", inputType: "date", placeholder: "Ingrese fecha", label: "Fecha Compra", name: "fecha_compra", col:"col-6 mb-4"},

        precio: {type: "input", inputType: "number", placeholder: "Ingrese serie de tractor", label: "Precio", name: "precio", col:"col-6 mb-4"},

        empresa_agencia: {type: "input", inputType: "text", placeholder: "Ingrese agencia / empresa", label: "Agencia / Empresa", name: "empresa_agencia", col:"col-6 mb-4"},

        factura: {type: "input", inputType: "text", placeholder: "Ingrese numero factura", label: "Num. Factura", name: "factura", col:"col-12 mb-4"},

        forma_pago: {type: "input", inputType: "text", placeholder: "Ingrese forma de pago", label: "Metodo de Pago", name: "forma_pago", col:"col-6 mb-4"},

        fecha_liquidacion: {type: "input", inputType: "date", placeholder: "Ingrese fecha", label: "Fecha Liquidacion", name: "fecha_liquidacion", col:"col-6 mb-4"},

    }

    // ===============================================
    // SEGMENTO PARA EDITAR INFORMACION
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEdit, setUrlEdit] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/tractor/informacion/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEdit(baseURL + "api/tractor/informacion/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR INFORMACION
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
      
              axios.delete(`${baseURL}api/tractor/informacion/delete/${id}`,{
        
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
    // SEGMENTO PARA VALIDAR Y MOSTRAR MODAL
    // ===============================================

    const handleValidate = () => {

        if(initialFormValues[0]["rel_tractor"] === 0){

            Swal.fire({
                icon: 'warning',
                title: 'Seleccione un tractor para continuar!',
            })

        }else{

            document.getElementById("btnCrearInfoTractor").click();

        }

    }

    return (

        <div>

            <button 
                type="button" 
                className="btn btn-primary mt-4"
                onClick={() => handleValidate()} >
                <MdAddCircle/> Agregar Datos
            </button>

            <button 
                id="btnCrearInfoTractor"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearInfoTractor">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR INFO */}

            <DynamicForm 
                modalId="modalCrearInfoTractor" 
                modalSize="modal-lg"
                headerTitle="Agregar Informacion" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR INFO */}

            <DynamicForm 
                modalId="modalEditarInfoTractor" 
                modalSize="modal-lg"
                headerTitle="Editar Informacion" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEdit} 
                tieneImagenes = "NO"
                validar="editar"
            />
            
        </div>

    );

}

export default TractorConfidencial;
