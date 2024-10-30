import Menu from "./components/Menu"

function App() {
  document.title = "App Restaurante";
  return (
    <>
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl font-bold text-white bg-blue-600 py-4 rounded-lg shadow-lg">
          Menú del Restaurante
        </h1>
      </div>
      <Menu />
    </>
  )
}

export default App;
