import React from 'react';
import Select from 'react-select';

const CustomDropdown = ({
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
  label,
}) => {
  const customStyles = {
    control: (base, { isFocused }) => ({
      ...base,
      borderColor: isFocused ? '#007bff' : '#ccc',
      borderWidth: '1px',
      borderRadius: '4px',
      padding: '5px',
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#007bff' : 'transparent',
      color: isSelected ? '#fff' : '#333',
    }),
  };

  return (
    <div className="custom-dropdown-container">
      <label htmlFor={label}>{label}</label>
      <Select
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(option) => onChange(option)}
        onBlur={onBlur}
        styles={customStyles}
        isSearchable={true}
        placeholder="Search or select an option"
      />
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CustomDropdown;