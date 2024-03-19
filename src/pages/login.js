import React, { useEffect, useState } from 'react'
// import CustomInput from '../components/CustomInput'
import backImage from '../img/backgroundLogin.jpg'
import logoLogin from '../img/tedellogo.png';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(true);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleApi = () => {

    if(email !== '' && password !== ''){

      axios.post(`${baseURL}authenticate`,{

        email: email,
        password: password
  
      })
      .then(result => {
        
        if(result.data.success === false)
        {
          setErr(false);
        }
        else
        {

          const expires = new Date();

          expires.setDate(expires.getDate() + 1);
  
          Cookies.set('jwtoken', result.data.result.token, {expires});
          Cookies.set('eval', result.data.result.mail, {expires});
          Cookies.set('perfil', result.data.result.perfil, {expires});

          navigate('/dashboard')

        }
  
      })
      .catch(error => {
  
        setErr(false);
        console.log(error)
  
      })

    }

  }

  // SEGMENTO PARA LOGIN RESPONSIVO

  const [divWidth, setDivWidth] = useState('30%');

  // Función para actualizar el ancho del div en función del tamaño de la pantalla
  const updateDivWidth = () => {
    if (window.innerWidth >= 768) {
      // Para pantallas más grandes o iguales a 768px de ancho
      setDivWidth('30%');
    } else {
      // Para pantallas más pequeñas de 768px de ancho
      setDivWidth('80%');
    }
  };

  useEffect(() => {

    updateDivWidth(); // Actualizar el ancho inicialmente
    window.addEventListener('resize', updateDivWidth); // Agregar event listener para cambios de tamaño de pantalla
    return () => {
      window.removeEventListener('resize', updateDivWidth); // Limpiar event listener al desmontar el componente
    };

  },[])

  return (

    <div className='py-5' style={{backgroundImage: `url(${backImage})`, minHeight: "100vh"}}>

      <div className='my-5 rounded-3 mx-auto p-4' style={{background: "#fff", boxShadow: "5px 10px 8px #888888", width: divWidth }}>

        <div className="text-center">

          <img src={logoLogin} alt="" className="img-fluid mx-auto" />

        </div>

        {/* <h3 className='text-center'><b>Login</b></h3> */}

        <form>
          
          <div className="form-floating mb-3">

            {/* <CustomInput type='text' label='Email Address' id='email' /> */}

            <input 
                  type="text" 
                  value={email}
                  className="input-sin-bordes "
                  placeholder="Correo Electronico" 
                  onChange={handleEmail}
            />

            {/* <CustomInput type='password' label='Password' id='pass'/> */}

            <input 
                  type="password" 
                  value={password}
                  className="input-sin-bordes "
                  placeholder="Contraseña" 
                  onChange={handlePassword}
            />

          </div>

            {

              err !== true ? (

              <div className="alert alert-danger text-center" role="alert">
                Error ! Usuario o Contraseña Invalido !
              </div> 

              ) : (

                <div></div>

              )

            }

          {/* <div className='mb-3 text-center'>

            <Link to="forgot-password">¿ Olvidaste tu contraseña ?</Link>

          </div> */}

          <button 
            className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5' 
            style={{"background":"#F04E2C"}}
            type="button"
            onClick={handleApi}
          >Login</button>

        </form>

      </div>

    </div>

  )

}