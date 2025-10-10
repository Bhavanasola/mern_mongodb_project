import React from 'react';
import './FormRow.css';

function FormRow({ label, value, name, onChange, placeholder }) {
  return (
    <div className="form-row">
      <label>{label}:</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormRow;
