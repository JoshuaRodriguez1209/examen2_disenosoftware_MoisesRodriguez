import React from "react";

const Navbar = ({ activeTab, setActiveTab, isAuthenticated, handleLogout }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white shadow-md">
      <h1 className="text-2xl font-bold">Restaurante</h1>
      <div className="flex space-x-10">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "menu" ? "bg-blue-700" : "bg-blue-500"
          }`}
          onClick={() => setActiveTab("menu")}
        >
          Menú
        </button>
        {isAuthenticated && (
          <>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "history" ? "bg-blue-700" : "bg-blue-500"
              }`}
              onClick={() => setActiveTab("history")}
            >
              Historial
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
