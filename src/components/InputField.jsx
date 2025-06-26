import React, { memo } from 'react';

const InputField = memo(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  required = false,
  placeholder = '',
  ...props
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-blue-200 text-sm font-bold mb-2">
      {label} {required && <span className="text-red-500" aria-label="campo obrigatório">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      placeholder={placeholder}
      className="
        w-full p-3 rounded-lg
        bg-blue-900 text-white placeholder-blue-300
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1
        transition-shadow duration-200
      "
      aria-required={required}
      {...props}
    />
  </div>
));

export default InputField;
