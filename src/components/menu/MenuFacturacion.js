import { useNavigate } from "react-router-dom";
import {AiOutlineDashboard, AiFillEye} from 'react-icons/ai';
import {MdOutlineCreate} from 'react-icons/md';
import {SiReadthedocs} from 'react-icons/si';
import { Menu } from 'antd';

function MenuFacturacion() {

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
                    key: 'proforma',
                    icon: <SiReadthedocs className='fs-4'/>,
                    label: 'Proformas',
                    children: [
                        {
                            key: 'proforma_create',
                            icon: <MdOutlineCreate className='fs-4'/>,
                            label: 'Crear',
                        },
                        {
                            key: 'proforma_view',
                            icon: <AiFillEye className='fs-4'/>,
                            label: 'Ver',
                        },
                    ],
                },

            ]}
        />

        </div>

    )

}

export default MenuFacturacion