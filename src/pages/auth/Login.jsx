import React from 'react'
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        // Pendiente completar funciones, dejar los required en true.
        // Incluir en form los submit, onchange y ref.
        // Incluir función de LoadingButton.

        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='box-content h-130 w-80 p-6 border rounded-xl border-gray'>
                <h1 className='H1-header2'>OmegaWeb</h1>
                <span className='H2-header2 pb-4'>Ingresa y empeza a gestionar tus proyectos.</span>
                <form className='flex flex-col w-full max-w-xs'>
                    <Input name='correo' type='email' label='Correo' required={false} />
                    <Input name='password' type='password' label='Contraseña' required={false} />
                    {/*<Input name='correo' type='email' label='Correo' required={true} />
                    <Input name='password' type='password' label='Contraseña' required={true} />*/}
                    <LoadingButton
                        text='Ingresar'
                    />
                    <Link to='/'>
                        <span className='H2-header2'>Ingreso temporal</span>
                    </Link>
                </form>
                <Link to='/auth/signup'>
                    <span className='H4-paragraph hover:text-green hover:underline'>¿Eres un nuevo usuario?</span>
                </Link>
            </div>
            <span className='H5-small'>Misión TIC / UdeA / Ciclo 4 / Grupo 10-11-12.</span>
        </div>
    )
}

export default Login
