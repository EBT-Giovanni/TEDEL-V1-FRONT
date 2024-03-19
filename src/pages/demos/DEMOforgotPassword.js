import React from 'react'
import CustomInput from '../../components/CustomInput'
import backImage from '../img/backgroundLogin.jpg'
import logoLogin from '../img/logo.png';

export const ForgotPassword = () => {

  return (

    <div className='py-5' style={{backgroundImage: `url(${backImage})`, minHeight: "100vh"}}>

      <div className='my-5 w-25 rounded-3 mx-auto p-4' style={{background: "#fff", boxShadow: "5px 10px 8px #888888"}}>

        <div className="text-center">

          <img src={logoLogin} alt="Descripción de mi imagen" className="img-fluid mx-auto" />

        </div>
        
        <br/>

        <h3 className='text-center'><b>¿ Has olvidado tu contraseña ?</b></h3>

        <br/>

        <p className='text-center'>Porfavor ingrese su correo registrado.</p>

        <form>

          <CustomInput type='text' label='Email Address' id='email' />

          <button 
            className='border-0 px-3 py-2 text-white fw-bold w-100' 
            style={{"background":"#7FC44A"}}
            type="submit"
          >Mandar Enlace</button>

        </form>

      </div>

    </div>

  )

}
