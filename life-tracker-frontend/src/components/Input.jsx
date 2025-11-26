const Input = ({ type = "text", placeholder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 mb-3 border rounded"
    />
  );
};

export default Input;
