// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Menu from "./components/Menu";
import History from "./components/History";

function App() {
  const [activeTab, setActiveTab] = useState("menu");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // "admin" o "client"'
  const [historyUpdate, setHistoryUpdate] = useState(false)
  const update_history = () => {
    setHistoryUpdate(!historyUpdate)
  }
  if (!isAuthenticated) {
    return <Login setUserType={setUserType} setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isAuthenticated={isAuthenticated} />
      <div className="p-6 flex flex-col lg:flex-row w-full justify-between items-start">
        <div className="w-full lg:w-9/12">
          <Menu update_history = {update_history}/>
        </div>
        <div className="w-full lg:w-3/12 mt-6 lg:mt-0 lg:pl-6">
          {activeTab === "history" && (
            <History showAllOrders={userType === "admin"} historyUpdate = {historyUpdate}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
