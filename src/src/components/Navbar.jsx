import React from "react";

const Navbar = ({ activeTab, setActiveTab, isAuthenticated }) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white shadow-md">
      <h1 className="text-2xl font-bold">Restaurante</h1>
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "menu" ? "bg-blue-700" : "bg-blue-500"
          }`}
          onClick={() => setActiveTab("menu")}
        >
          Menú
        </button>
        {isAuthenticated && (
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "history" ? "bg-blue-700" : "bg-blue-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Historial
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;