import { useEffect, useState } from "react"
import "./Sondes.css"


export default function Sondes() {
    const [data, setData] = useState([])

    const apiUrl = import.meta.env.VITE_URL_API

    useEffect(() => {
        fetch(`${apiUrl}/sondes`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data)
                    const latest = Object.values(
                        json.data.reduce((lSonde, item) => {
                            const id = item.device_id
                            if (!lSonde[id] || new Date(item.received_at) > new Date(lSonde[id].received_at)) {
                            lSonde[id] = item
                            }
                            return lSonde
                        }, {})
                    )
                    setData(latest)
                }
            })
            .catch((err) => console.error("Erreur :", err))
    }, [])

    return (
        <div className="container">
            <h2 className="title">Mesures des sondes</h2>

            <div className="table-wrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Pont</th>
                        <th>Hauteur (m)</th>
                        <th>Tension (V)</th>
                        <th>Date de réception</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({ _id, device_id, haut, volt, received_at }) => (
                        <tr key={_id}>
                            <td>{device_id}</td>
                            <td className="num">{haut}</td>
                            <td className="num">{volt}</td>
                            <td className="nowrap">
                                {new Date(received_at).toLocaleString("fr-FR")}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
