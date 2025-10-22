import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sondes from "./components/Sondes";
import Toilettes from "./components/Toilettes.jsx";

function App() {
  const [count, setCount] = useState(0)

    useEffect(() => {
        const button = document.getElementById("notifications");
        button.addEventListener("click", () => {
            Notification.requestPermission().then((result) => {
                if (result === "granted") {
                    const notification = new Notification("Notification de test", {})
                }
            });
        });
    })
  return (
    <>
      <div>
          <Sondes />
      </div>
        <div>
            <Toilettes />
        </div>
        <button id="notifications">Envoyer une notification</button>
    </>
  )
}

export default App
