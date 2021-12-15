import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// ** import @apollo
import { useMutation } from '@apollo/client';
// ** import components
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import DropDown from 'components/Dropdown';
// ** import contexts
import { useAuth } from 'context/authContext';
// ** import hooks
import useFormData from 'hooks/useFormData';
// ** import gql mutations
import { REGISTRO } from 'graphql/auth/mutations';
// ** import ROLES-enums
import { Enum_Rol } from 'utils/enums';


const SignUp = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { form, formData, updateFormData } = useFormData();

    const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
        useMutation(REGISTRO);

    const submitForm = (e) => {
        e.preventDefault();
        registro({ variables: formData });
    };

    useEffect(() => {
        if (dataMutation) {
            if (dataMutation.registro.token) {
                setToken(dataMutation.registro.token);
                navigate('/index');
            }
        }
    }, [dataMutation, setToken, navigate]);

    return (

        // ** Encabezado sección y Formulario de registro **

        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='box-content h-90 w-80 p-6 border rounded-xl border-gray'>
                <div className='H1-header2'>Regístrate</div>
                <form className='flex flex-col w-30 min-w-full md:min-w-50 H4-paragraph' onSubmit={submitForm} onChange={updateFormData} ref={form}>
                    <Input label='Nombre:' name='nombre' type='text' required={true} />
                    <Input label='Apellido:' name='apellido' type='text' required={true} />
                    <Input label='Documento:' name='identificacion' type='text' required={true} />
                    <DropDown label='Rol:' name='rol' required={true} options={Enum_Rol} />
                    <Input label='Correo:' name='correo' type='email' required={true} />
                    <Input label='Contraseña:' name='password' type='password' required={true} />
                    <LoadingButton
                        disabled={Object.keys(formData).length === 0}
                        loading={false}
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
