import React from "react";

const Login = ({ setUserType, setIsAuthenticated,setClientId}) => {
  
  const handleLogin = (type) => {
    setUserType(type);
    setIsAuthenticated(true);
   
    if (type === "client") {
      
      setClientId(1);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        onClick={() => handleLogin("admin")}
      >
        Ingresar como Admin
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        onClick={() => handleLogin("client")}
      >
        Ingresar como Cliente
      </button>
    </div>
  );
};

export default Login;