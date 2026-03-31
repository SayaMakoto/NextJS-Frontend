function Select({ options = [], labelKey, valueKey, name, value, onChange }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 bg-white transition duration-200"
    >
      <option value="">-- Chọn danh mục --</option>

      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}

export default Select;
