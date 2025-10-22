import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sondes from "./components/Sondes";
import Toilettes from "./components/Toilettes.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <Sondes />
      </div>
        <div>
            <Toilettes />
        </div>
    </>
  )
}

export default App
