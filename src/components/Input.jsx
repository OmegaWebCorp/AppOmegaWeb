import React from 'react';

const Input = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className='H4-paragraph flex flex-col my-2'>
      <span>{label}</span>
      
        <input
          required={required}
          type={type}
          name={name}
          className='input w-full h-11 px-4 mt-1 font-Quicksand font-medium text-sm text-gray-dark border rounded-lg focus:shadow-outline'
          defaultValue={defaultValue}
        />
      
    </label>
  );
};

export default Input;