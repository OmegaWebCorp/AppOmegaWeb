import React from 'react'
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        // Pendiente completar funciones, dejar los required en true.
        // Incluir en form los submit, onchange y ref.
        // Incluir función de LoadingButton.
        
        <div className='flex flex-col items-center justify-center w-full h-full p-10'>
            <h1 className='text-6xl font-Quicksand font-semibold text-green'>OmegaWeb</h1>
            <span className='H2-header2'>Ingresa para empezar a gestionar tus proyectos.</span>  
            <form className='flex flex-col'>
                <Input name='correo' type='email' label='Correo' required={false} />
                <Input name='password' type='password' label='Contraseña' required={false} />
                {/*<Input name='correo' type='email' label='Correo' required={true} />
                <Input name='password' type='password' label='Contraseña' required={true} />*/}
                <LoadingButton
                 text='Ingresar'
                />
                <Link to='/'>
                    <span className='H2-header2 flex flex-col items-center justify-center'>Ingresar temporal</span>
                </Link>
            </form>
            <Link to='/auth/signup'>
                <span className='H2-header2 items-center justify-center'>¿Eres un nuevo usuario?</span>
            </Link>
        </div>
    )
}

export default Login
