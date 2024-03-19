import { useNavigate } from "react-router-dom";
import {AiOutlineDashboard, AiOutlineFolderOpen} from 'react-icons/ai';
import { Menu } from 'antd';

const MenuTemperaturas = () => {

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
                {
                    key: 'ordenes_t',
                    icon: <AiOutlineFolderOpen className='fs-4'/>,
                    label: 'Ordenes'
                },

            ]}
        />

        </div>

    )

}

export default MenuTemperaturas