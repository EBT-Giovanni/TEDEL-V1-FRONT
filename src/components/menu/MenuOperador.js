import { useNavigate } from "react-router-dom";
import {AiOutlineDashboard} from 'react-icons/ai';
import { Menu } from 'antd';

const MenuOperador = () => {

  const navigate = useNavigate();

  return (

    <div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['']}
        onClick = {({key}) => {

            if(key === 'signout'){
              navigate("/")

            }else{
              navigate(key)
            }

        }}
        items={[
          {
            key: '',
            icon: <AiOutlineDashboard className='fs-4'/>,
            label: 'Dashboard',
          },
          

        ]}
      />
        
    </div>

  );

}

export default MenuOperador;
