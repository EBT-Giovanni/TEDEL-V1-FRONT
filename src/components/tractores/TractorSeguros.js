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

const TractorSeguros = (id) => {

    const idTractor = id.idTractor;

    // ===============================================
    // SEGMENTO PARA MOSTRAR SEGUROS
    // ===============================================

    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([]);

    const [token, setToken] = useState('');

    //TRAER DATOS PARA MOSTRAR SEGUROS

    useEffect(() => {

        setToken(Cookies.get('jwtoken'));
        
        axios.get(`${baseURL}api/tractor/seguros/${idTractor}`,{
        
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

    //COLUMNAS PARA LOS COMENTARIOS

    const colums = [

        {
            name: 'Num. Poliza',
            selector: row => row.no_poliza,
            sortable: true
        },
        {
            name: 'Fecha Inicio',
            selector: row => moment(row.fecha_inicio).format('YYYY-MM-DD'),
            sortable: true
        },
        {
            name: 'Aseguradora',
            selector: row => row.aseguradora,
            sortable: true
        },
        {
            name: 'Agente',
            selector: row => row.agente,
            sortable: true
        },
        {
            name: 'Vigencia ',
            selector: row => moment(row.vegiencia_de).format('YYYY-MM-DD') + " al " + moment(row.vigencia_hasta).format('YYYY-MM-DD'),
            sortable: true
        },
        {
            name: "",
            button: true,
            cell: (row) => (
                
                <div className="input-group">
                    <button className="btn btn-outline-warning" type="button" onClick={() => handleEdit(row.id)} data-bs-toggle="modal" data-bs-target="#modalEditarSeguroTractor"><BsPencil/></button>
                    <button className="btn btn-outline-danger" type="button" onClick={() => handleDelete(row.id)}><RiDeleteBinFill/></button>
                </div>
                
            ),
            width: "130px"
            
        },

    ];

    // ===============================================
    // SEGMENTO PARA CREAR SEGURO
    // ===============================================

    //URL PARA CREAR COMENTARIO

    const urlCreate = baseURL + "api/tractor/seguro/crear";

    //VALORES PARA INICIAR FORMULARIO

    const initialFormValues = [{

        rel_tractor: idTractor,
        no_poliza: "", 
        inciso: "",
        aseguradora: "",
        agente: "",
        vegiencia_de: "",
        vigencia_hasta: "",
        endoso: "",
        fecha_inicio: "",
        deducible_dano_material: "",
        deducible_robo: "",
        deducible_responsabilidad_civil: "",
        comentarios: ""

    }];

    // DATOS PARA GENERAR EL FORMULARIO

    const formData = {

        no_poliza: {type: "input", inputType: "text", placeholder: "Ingrese num. poliza", label: "Num. Poliza", name: "no_poliza", col:"col-6 mb-4"},

        fecha_inicio: {type: "input", inputType: "date", placeholder: "Ingrese fecha", label: "Fecha Inicio", name: "fecha_inicio", col:"col-6 mb-4"},

        aseguradora: {type: "input", inputType: "text", placeholder: "Ingrese aseguradora", label: "Aseguradora", name: "aseguradora", col:"col-6 mb-4"},

        agente: {type: "input", inputType: "text", placeholder: "Ingrese nombre agente", label: "Agente", name: "agente", col:"col-6 mb-4"},

        vegiencia_de: {type: "input", inputType: "date", placeholder: "Ingrese fecha", label: "Vigencia de", name: "vegiencia_de", col:"col-6 mb-4"},

        vigencia_hasta: {type: "input", inputType: "date", placeholder: "Ingrese fecha", label: "Hasta", name: "vigencia_hasta", col:"col-6 mb-4"},

        inciso: {type: "input", inputType: "text", placeholder: "Ingrese el inciso", label: "Inciso", name: "inciso", col:"col-6 mb-4"},

        endoso: {type: "input", inputType: "text", placeholder: "Ingrese endoso", label: "Endoso", name: "endoso", col:"col-6 mb-4"},

        deducible_dano_material: {type: "input", inputType: "number", placeholder: "Ingrese deducible", label: "Deducible Daño Material", name: "deducible_dano_material", col:"col-6 mb-4"},

        deducible_robo: {type: "input", inputType: "number", placeholder: "Ingrese el deducible", label: "Deducible Robo", name: "deducible_robo", col:"col-6 mb-4"},

        deducible_responsabilidad_civil: {type: "input", inputType: "number", placeholder: "Ingrese el deducible", label: "Deducible Responsabilidad Civil", name: "deducible_responsabilidad_civil", col:"col-6 mb-4"},

        comentarios: {type: "input", inputType: "text", placeholder: "Ingrese el comentario", label: "Comentario", name: "comentarios", col:"col-6 mb-4"},

    }

    // ===============================================
    // SEGMENTO PARA EDITAR SEGURO
    // ===============================================

    const [formValues, setFormValues] = useState(initialFormValues);

    const [urlEditComent, setUrlEditComent] = useState('');

    const handleEdit = (id) => {

        axios.get(`${baseURL}api/tractor/seguro/id/${id}`,{
  
            method: "GET",
            headers: {"access-token": token},
    
        })
        .then(result => {
    
            if(result.data.success == true)
            {
                setFormValues(result.data.result);

                setUrlEditComent(baseURL + "api/tractor/seguro/editar");
            }
    
        })
        .catch(error => {
        
            console.log(error)
    
        })

    }

    // ===============================================
    // SEGMENTO PARA ELIMINAR SEGURO
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
      
              axios.delete(`${baseURL}api/tractor/seguro/delete/${id}`,{
        
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

            document.getElementById("btnCrearSeguroTractor").click();

        }

    }

    // ========================================================

    return (

        <div>

            <button 
                type="button" 
                className="btn btn-primary mt-4"
                onClick={() => handleValidate()} >
                <MdAddCircle/> Agregar Seguro
            </button>

            <button 
                id="btnCrearSeguroTractor"
                type="button" 
                style={{display: "none"}}
                data-bs-toggle="modal" 
                data-bs-target="#modalCrearSeguroTractor">
            </button>

            <Tabla columns = {columns} data = {data}/>

            {/* MODAL PARA CREAR COMENTARIO */}

            <DynamicForm 
                modalId="modalCrearSeguroTractor" 
                modalSize="modal-xl"
                headerTitle="Crear Seguro" 
                formData={formData} 
                formValues={initialFormValues} 
                apiURL={urlCreate} 
                tieneImagenes = "NO"
                validar="crear"
            />

            {/* MODAL PARA EDITAR COMENTARIO */}

            <DynamicForm 
                modalId="modalEditarSeguroTractor" 
                modalSize="modal-xl"
                headerTitle="Editar Seguro" 
                formData={formData} 
                formValues={formValues} 
                apiURL={urlEditComent} 
                tieneImagenes = "NO"
                validar="editar"
            />

        </div>

    );

}

export default TractorSeguros;
