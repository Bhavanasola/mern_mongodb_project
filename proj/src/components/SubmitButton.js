import React from 'react';
import './SubmitButton.css';

function SubmitButton({ onClick }) {
  return (
    <div className="submit-row">
      <button onClick={onClick}>Save</button>
    </div>
  );
}

export default SubmitButton;
