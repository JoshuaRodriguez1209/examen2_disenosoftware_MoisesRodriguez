import React  from 'react';

const Alert = ({
  title = "¡Alerta!",
  color_title = "text-green-700", 
  text = "Texto.",
  color = "text-gray-700",
  text_2 = "",
  color_text2 = "text-gray-700",
  button_text = "Aceptar", 
  color_button = "bg-green-500 hover:bg-green-700 text-white", 
  onClose
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 space-y-4 shadow-lg max-w-xs text-center">
        <h3 className={`text-lg font-semibold ${color_title}`}>
          {title}
        </h3>
        <p className={`${color}`}>
          {text}
        </p>
        <p className={`${color_text2}`}>
          {text_2}
        </p>
        <button
          onClick={onClose}
          className={`mt-4 w-full py-2 px-4 rounded-md ${color_button}`}
        >
          {button_text}
        </button>
      </div>
    </div>
  );
};

export default Alert;
