import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="field-wrapper">
    {touched && error ? (
      <label className="error">{error}</label>
    ) : (
      <label>{label}</label>
    )}
    <div className="field-wrapper-input">
      <input {...input} type={type} />
    </div>
  </div>
);



const renderDate = ({ input, label, type, placeholder, meta: { touched, error } }) => (
  <div className="field-wrapper-date">
    <input {...input} type={type} placeholder={placeholder} min="0"/>
  </div>
);

const renderSelector = ({input, meta: {touched, error}, options}) => (
  <div>
    <label className="special-label">WHERE DID YOU HERE ABOUT US</label>
    <div className="styled-select slate">
      <select {...input}>
        <option value=""></option>
        {options.map(val => <option value={val} key={val}>{val}</option>)}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderError = ({meta: {touched, error}}) =>
  touched && error ? <p className="error">{error}</p> : false;


export {
  renderDate,
  renderField,
  renderSelector,
  renderError
}

