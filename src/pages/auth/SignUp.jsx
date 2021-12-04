import React from 'react'
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        /*<div className='flex flex-col items-center justify-center w-full h-full p-10'>
           <div className='H1-header2'>Regístrate</div>
           <span className='H2-header2 text-white'>Ingresa para empezar a gestionar tus proyectos.</span>    
        </div>*/

        // Pendiente completar funciones, dejar los required en true.
        // Incluir en form los submit, onchange y ref.
        // Incluir función de LoadingButton.

        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='box-content h-90 w-80 p-6 border rounded-xl border-gray'>
                <div className='H1-header2'>Regístrate</div>
                <form className='flex flex-col w-30 min-w-full md:min-w-50'>
                        <Input label='Nombre:' name='nombre' type='text' required={false} />
                        <Input label='Apellido:' name='apellido' type='text' required={false} />
                        <Input label='Documento:' name='identificacion' type='text' required={false} />
                        {/*<DropDown label='Rol deseado:' name='rol' required={true} options={Enum_Rol} />*/}
                        <Input label='Correo:' name='correo' type='email' rrequired={false} />
                        <Input label='Contraseña:' name='password' type='password' required={false} />
                    <LoadingButton
                        text='Registrarme'
                    />
                </form>
                <Link to='/auth/login'>
                    <span className='H4-paragraph hover:text-green hover:underline'>¿Ya tienes una cuenta?</span>
                </Link>
            </div>
            <span className='H5-small'>Misión TIC / UdeA / Grupo 10-11-12.</span>
        </div>
    )
};

export default SignUp
