import React, { useState } from "react";
import { loginUser, registerUser, createUser } from "../services/auth";
import Alert from "./Alert";

const Login = ({ setUserType, setIsAuthenticated, setClientId, setNewAccount,newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      }
      const { user, error } = await registerUser(email, password, userName);
      if (user) {
        await createUser(user);
        setShowConfirmation(true);
      }
      if (error) {
        setError(error);
      }
    } else {
      const { user, role, error } = await loginUser(email, password);
      if (user) {
        setIsAuthenticated(true);
        setUserType(role);
        if (role === "client") {
          setClientId(user.uid);
        }
      }
      if (error) {
        setError(error);
      }
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
    // setNewAccount(false);
    setIsRegister(false);
    
  };
  const isNewaccount = async () => {
    await setNewAccount(true)
    console.log("carajo",newAccount)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-green-700">
            {isRegister ? "Crear una cuenta" : "Iniciar sesión"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm">
            {isRegister && (
              <div className="py-2">
                <input
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre de usuario"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            )}
            <div className="py-2">
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2">
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isRegister && (
              <div className="py-2">
                <input
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
            <div className="pt-6">
              <button
              onClick={isRegister ? isNewaccount() : null}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isRegister ? "Registrarse" : "Iniciar sesión"}
              </button>
            </div>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isRegister ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
            <span
              onClick={() => {
                setIsRegister(!isRegister)
                setError(null)
              }}
              className="text-green-500 hover:text-green-700 cursor-pointer font-medium"
            >
              {isRegister ? "Inicia sesión" : "Crear una cuenta"}
            </span>
          </p>
        </div>
      </div>
      {showConfirmation && (
        <Alert
          title="¡Registro exitoso!"
          text="Tu cuenta ha sido creada exitosamente. Por favor, inicia sesión con tus credenciales."
          onClose={handleConfirmationClose}
        />
      )}
    </div>
  );
};

export default Login;