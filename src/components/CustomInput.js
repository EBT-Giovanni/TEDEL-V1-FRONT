import React from 'react'

const CustomInput = (props) => {

    const {type, label, i_id, i_class} = props;

    return (
        
        <div className="form-floating mb-3">

            <input 
                type={type} 
                className={`input-sin-bordes ${i_class}`} 
                id={i_id} 
                placeholder={label} 
            />
            
        </div>

    );

};

export default CustomInput