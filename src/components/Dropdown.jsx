import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const DropDown = ({ label, name, defaultValue = '', required, options }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const optionsSelect = [['', 'Selecciona una opción', true], ...Object.entries(options)];
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);
  return (
    <label htmlFor={name} className='flex flex-col'>
      <span>{label}</span>
      <select
        required={required}
        name={name}
        className='input w-full h-10 px-4 mt-1 mb-2 font-medium text-gray border rounded-lg focus:shadow-outline'
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}>
        {optionsSelect.map((o) => {
          return (
            <option key={nanoid()} value={o[0]} disabled={o[2] ?? false}>
              {o[1]}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default DropDown;