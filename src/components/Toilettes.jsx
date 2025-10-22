import { useEffect, useState } from "react"

export default function Toilettes() {
    const [data, setData] = useState([])

    const apiUrl = import.meta.env.VITE_URL_API

    useEffect(() => {
        fetch(`${apiUrl}/toilettes`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data)
                    const latest = Object.values(
                        json.data.reduce((lToilettes, item) => {
                            const id = item.device_id
                            if (!lToilettes[id] || new Date(item.received_at) > new Date(lToilettes[id].received_at)) {
                                lToilettes[id] = item
                            }
                            return lToilettes
                        }, {})
                    )
                    setData(latest)
                }
            })
            .catch((err) => console.error("Erreur :", err))
    }, [])

    return (
        <div className="container">
            <h2 className="title">Infos des toilettes</h2>

            <div className="table-wrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nom du capteur</th>
                        <th>Occupation</th>
                        <th>Batterie</th>
                        <th>Date de réception</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(({ _id, device_id, occupancy, battery, received_at }) => (
                        <tr key={_id}>
                            <td>{device_id}</td>
                            <td className="num">{occupancy}</td>
                            <td className="num">{battery}</td>
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