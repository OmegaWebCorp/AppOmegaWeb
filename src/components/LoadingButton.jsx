import React from 'react';
import ReactLoading from 'react-loading';

const LoadingButton = ({ disabled, loading, text, bgColor = 'bg-green', onClick = () => { } }) => {
  return (
    <button
      
      onClick={onClick}
      disabled={disabled}
      type='submit'
      className={`${bgColor} rounded-3xl shadow-md text-gray-dark font-bold font-Quicksand text-lg p-2.5 text-l rounded-xl hover:bg-gray-light shadow-md my-4 disabled:opacity-50 disabled:bg-gray`}
      data-testid='button-loading'
    >
      {loading ? <ReactLoading data-testid='loading-in-button' type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default LoadingButton;

