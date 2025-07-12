import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="px-7 items-center w-full">
        <h1 className="text-center font-bold">ETHIO EXCHANGE APP</h1>
      </div>
    </>
  );
}

export default App;
