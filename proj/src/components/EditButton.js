import React from 'react';
import './EditButton.css';

function EditButton({ onClick }) {
  return (
    <div className="edit-row">
      <button onClick={onClick}>Edit</button>
    </div>
  );
}

export default EditButton;
