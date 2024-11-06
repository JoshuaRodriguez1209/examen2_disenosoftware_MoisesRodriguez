// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Menu from "./components/Menu";
import History from "./components/History";

function App() {
  const [activeTab, setActiveTab] = useState("menu");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [historyUpdate, setHistoryUpdate] = useState(false);
  const [clientId, setClientId] = useState(0);
  
  const update_history = () => {
    setHistoryUpdate(!historyUpdate);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setActiveTab("menu");
  };

  if (!isAuthenticated) {
    return <Login setUserType={setUserType} setIsAuthenticated={setIsAuthenticated} setClientId={setClientId} />;
  }
  

  return (
    <div>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAuthenticated={isAuthenticated} 
        handleLogout={handleLogout} 
      />
      <div className="p-6 flex flex-col w-full items-center">
        {userType === "admin" && activeTab === "history" ? (
          <div className="w-full max-w-4xl flex justify-center">
            <History isAdmin={true} historyUpdate={historyUpdate} />
          </div>
        ) : (
          <div className={`flex ${activeTab === "menu" ? "flex-col lg:flex-row" : ""} w-full justify-between items-start`}>
            <div className="w-full lg:w-12/12">
              <Menu update_history={update_history} />
            </div>
            {activeTab === "history" && (
              <div className="w-full lg:w-3/12 mt-6 lg:mt-0 lg:pl-6">
                <History isAdmin={false} clientId = {clientId} historyUpdate={historyUpdate} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
