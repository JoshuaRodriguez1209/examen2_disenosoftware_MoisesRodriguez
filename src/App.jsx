import React, { useState, useEffect } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Menu from "./components/Menu";
import History from "./components/History";
import { logoutUser, auth } from "./services/auth";


function App() {

  const [activeTab, setActiveTab] = useState("menu");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [historyUpdate, setHistoryUpdate] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [newAccount, setNewAccount] = useState(false);
  const inactivityLimit = 10000;
  let inactivityTimer = null;

  const updateHistory = () => {
    setHistoryUpdate(!historyUpdate);
  };

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUserType(null);
    setActiveTab("menu");
    if (inactivityTimer) clearTimeout(inactivityTimer);
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(handleLogout, inactivityLimit);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(newAccount)
      if (user && !newAccount) {
        try {
          const token = await getIdToken(user, true);
          
          if (token ) {
            const decodedToken = await auth.currentUser?.getIdTokenResult();
            const role = decodedToken?.claims?.role || 'client';
            
            setIsAuthenticated(true);
            setUserType(role);
            setClientId(user.uid);
            resetInactivityTimer();
          }
        } catch (error) {
          console.error("Error al verificar la sesión:", error);
          handleLogout();
        }
      } else {
        handleLogout();
      }
    },[newAccount]);

    // Eventos de actividad del usuario
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    return () => {
      unsubscribe();
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <Login
        setUserType={setUserType}
        setIsAuthenticated={setIsAuthenticated}
        setClientId={setClientId}
        setNewAccount={setNewAccount}
        newAccount = {newAccount}
      />
    );
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
              <Menu update_history={updateHistory} user={clientId} />
            </div>
            {activeTab === "history" && (
              <div className="w-full lg:w-3/12 mt-6 lg:mt-0 lg:pl-6">
                <History isAdmin={false} clientId={clientId} historyUpdate={historyUpdate} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;