
import React from 'react';
import ReactLoading from 'react-loading';

const LoadingButton = ({ disabled, loading, text, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className='bg-green rounded-3xl shadow-md text-gray-dark font-bold font-Quicksand text-lg p-2.5 text-l rounded-xl hover:bg-white shadow-md my-2 disabled:opacity-50 disabled:bg-gray'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default LoadingButton;

