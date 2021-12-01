import React from 'react';

const Input = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3 font-Quicksand font-normal text-sm text-white'>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input'
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;