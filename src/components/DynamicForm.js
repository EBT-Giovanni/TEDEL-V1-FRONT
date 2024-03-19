import React from 'react';
import {BiSave} from 'react-icons/bi';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import md5 from 'md5';

function DynamicForm({modalId, modalSize, headerTitle, formData, formValues, apiURL, tieneImagenes, validar}) {

  //FUNCION PARA CREAR ID PARA KEYS

  const getID = () => {

    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();

  }

  const formulario = {};

  Object.keys(formValues[0]).forEach(key => {

    formulario[key] = formValues[0][key]
    
  });

  const handleSubmit = (event) => {

    event.preventDefault(); // Prevenir que el navegador envíe el formulario automáticamente

    const token = Cookies.get('jwtoken');

    // CREAR REGISTRO

    if(validar === "crear"){

      console.log(formulario)

      console.log(apiURL);

      //VALIDAMOS QUE NO SE MANDEN VALORES VACIOS

      let validar = true;

      Object.entries(formulario).forEach(entry => {

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

        //VALIDAMOS SI TIENE IMAGENES

        if(tieneImagenes === "SI"){

          axios.post(apiURL, formulario,{
  
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
        else{ //NO TIENE IMAGENES

          axios.post(apiURL, formulario,{
  
            headers: {
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

    }
    else{ //EDITAR REGISTRO

      console.log(apiURL);

      console.log(formulario)

      if(tieneImagenes === "SI"){

        axios.put(apiURL, formulario,{
  
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

      }else{

        axios.put(apiURL, formulario,{
  
          headers: {
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

  };

  //=====================================================
  //CREAR INPUTS

  const fields = [];

  if(validar === "crear"){

    for (const key in formData) {
  
      const fieldData = formData[key];
  
      if (fieldData.type === "input") {

        // VALIDAR SI ES TIPO NUMBER

        if(fieldData.inputType === "number"){

          const inputComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input
                    className='form-control'
                    key = {getID()}
                    type = {fieldData.inputType}
                    name = {fieldData.name}
                    step="any"
                    placeholder={fieldData.placeholder}
                    onChange={(event) => {     
                        formulario[key] = event.target.value;               
                      }}
                    autoComplete = "off"
                />
  
            </div>
  
          );
    
          fields.push(inputComponent);

        }else{

          const inputComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input
                    className='form-control'
                    key = {getID()}
                    type = {fieldData.inputType}
                    name = {fieldData.name}
                    placeholder={fieldData.placeholder}
                    onChange={(event) => {     
                        formulario[key] = event.target.value;               
                      }}
                    autoComplete = "off"
                />
  
            </div>
  
          );
    
          fields.push(inputComponent);

        }
  
      } else if (fieldData.type === "select") {
  
        const {id, valor} = fieldData;
  
        const options = [];
  
        for (const option of fieldData.options) {
  
            const referenciaId = option[id];
  
            const referenciaValor = option[valor];
  
            const optionComponent = (
  
              <option key={getID()} value={referenciaId}>
                {referenciaValor}
              </option>
  
            );
  
            options.push(optionComponent);
  
          }
  
        const selectComponent = (
  
            <div className={fieldData.col}> 
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <select 
                key={getID()} 
                name={fieldData.name} 
                className='form-select'
                onChange={(event) => {
                    formulario[key] = event.target.value;
                }}
                >
  
                    {options}
  
                </select>
  
            </div>
  
        );
  
        fields.push(selectComponent);
  
      } else if (fieldData.type === "file") {
  
        const fileComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input 
                    className="form-control"  
                    type="file"
                    name={fieldData.name}
                    onChange={(event) => {
                      formulario[key] = event.target.files[0];
                    }}
                />
  
            </div>
  
        );
  
        fields.push(fileComponent);
  
      }
  
    }

  }
  else if(validar === "editar"){

    for (const key in formData) {
  
      const fieldData = formData[key];
  
      if (fieldData.type === "input") {

        if(formValues.length !== 0){

          var value = formValues[0][key]

          if(fieldData.inputType === "date" && value !== null){
            value = (value.split("T"))[0];
          }

          if(fieldData.inputType === "password" && value !== null){
            value ="";
          }

        }
        else{
          var value = "";
        }

        if(fieldData.inputType === "number"){

          const inputComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input
                    className='form-control'
                    defaultValue={value}
                    key = {getID()}
                    type = {fieldData.inputType}
                    name = {fieldData.name}
                    step = "any"
                    placeholder={fieldData.placeholder}
                    onChange={(event) => {
                      if(fieldData.inputType === "password"){
                        formulario[key] = md5(event.target.value);
                      }else{
                        formulario[key] = event.target.value;
                      }
                    }}
                    autoComplete = "off"
                />
  
            </div>
  
          );
    
          fields.push(inputComponent);

        }else{

          const inputComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input
                    className='form-control'
                    defaultValue={value}
                    key = {getID()}
                    type = {fieldData.inputType}
                    name = {fieldData.name}
                    placeholder={fieldData.placeholder}
                    onChange={(event) => {
                      if(fieldData.inputType === "password"){
                        formulario[key] = md5(event.target.value);
                      }else{
                        formulario[key] = event.target.value;
                      }
                    }}
                    autoComplete = "off"
                />
  
            </div>
  
          );
    
          fields.push(inputComponent);

        }
  
      } else if (fieldData.type === "select") {
  
        const {id, valor} = fieldData;
  
        const options = [];
  
        for (const option of fieldData.options) {
  
            const referenciaId = option[id];
  
            const referenciaValor = option[valor];
  
            const optionComponent = (
  
              <option key={getID()} value={referenciaId}>
                {referenciaValor}
              </option>
  
            );
  
            options.push(optionComponent);
  
          }

          if(formValues.length > 0){
            var value = formValues[0][key];
          }
          else{
            var value = "";
          }
  
        const selectComponent = (
  
            <div className={fieldData.col}> 
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <select 
                key={getID()} 
                defaultValue={value}
                name={fieldData.name} 
                className='form-select'
                onChange={(event) => {
                  formulario[key] = event.target.value;
                }}
                >
  
                    {options}
  
                </select>
  
            </div>
  
        );
  
        fields.push(selectComponent);
  
      } else if (fieldData.type === "file") {
  
        const fileComponent = (
  
            <div className={fieldData.col}>
  
                <span className="badge text-bg-secondary mb-2">{fieldData.label}:</span>
  
                <input 
                    key={getID()} 
                    className="form-control"  
                    type="file"
                    name={fieldData.name}
                    onChange={(event) => {
                      formulario[key] = event.target.files[0];
                    }}
                />
  
            </div>
  
        );
  
        fields.push(fileComponent);
  
      }
  
    }

  }
   
  return (

    <>
        
      <div className="modal fade" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" key={getID()} >

        <div className={`modal-dialog ${modalSize}`}>

          <div className="modal-content">

            <form onSubmit={handleSubmit}> 

              <div className="modal-header">

                <h5 className="modal-title" id="staticBackdropLabel">{headerTitle}</h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

              </div>

              <div className="modal-body">
              
                  <div className='container'>

                    <div className='row'>

                      {fields} 

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

    </>

  )

}

export default DynamicForm