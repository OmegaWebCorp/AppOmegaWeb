import React, { useEffect } from 'react';
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { form, formData, updateFormData } = useFormData();
 
    const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
      useMutation(LOGIN);
 
    const submitForm = (e) => {
      e.preventDefault();
 
      login({
        variables: formData,
      });
    };
 
    useEffect(() => {
      console.log('data mutation', dataMutation);
      if (dataMutation) {
        if (dataMutation.login.token) {
          setToken(dataMutation.login.token);
          navigate('/');
        }
      }
    }, [dataMutation, setToken, navigate]);

    return (
        // ***Autenticación, estilos y estados botón ingresar

        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='box-content h-130 w-80 p-6 border rounded-xl border-gray'>
                <h1 className='H1-header2'>OmegaWeb</h1>
                <span className='H2-header2 pb-4'>Ingresa y empeza a gestionar tus proyectos.</span>
                <form className='flex flex-col w-full max-w-xs' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                    <Input name='correo' type='email' label='Correo' required={false} />
                    <Input name='password' type='password' label='Contraseña' required={false} />
                    <LoadingButton
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
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
