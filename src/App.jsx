import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sondes from "./components/Sondes";
import Toilettes from "./components/Toilettes.jsx";

function App() {
  const [count, setCount] = useState(0)
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                const el = document.querySelector<HTMLParagraphElement>("#status");
                if (el) {
                    el.textContent = registrations.length
                        ? `ServiceWorkerRegistrations found: ${registrations.length}`
                        : 'No ServiceWorkerRegistrations found.';
                }
            }).catch((err) => {
                const el = document.querySelector<HTMLParagraphElement>("#status");
                if (el) el.textContent = `ServiceWorker check error: ${err}`;
            });
        }
    }, []);
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
