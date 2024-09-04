const ReactInput = ({
  type,
  name,
  label,
  error,
  placeholder,
  inputClassName,
  reactInputClassName,
  onChange,
  onClick,
  value,
  icon,
  iconClassName,
  onIconClick,
  min,
}) => {
  return (
    <div className={`react-input ${reactInputClassName}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <div className="innerInput">
        <input
          className={`form-control ${inputClassName}`}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onClick={onClick}
          value={value}
          min={min}
        />
        {icon && <i className={iconClassName} onClick={onIconClick} />}
      </div>

      {error && <p className="text-danger errorMsg mb-0">{error}</p>}
    </div>
  );
};

export default ReactInput;
