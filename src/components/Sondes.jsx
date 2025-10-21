import { useEffect, useState } from "react"

export default function Sondes() {
    const [data, setData] = useState([])

    const apiUrl = import.meta.env.URL_APIfetch(apiUrl,'/sondes')

    useEffect(() => {
        fetch(apiUrl,'/sondes')
            .then((res) => res.json())
            .then((json) => {
                if (json.success) setData(json.data)
            })
            .catch((err) => console.error("Erreur :", err))
    }, [])

    return (
        <div>
            <h2>Liste des sondes</h2>

            {data.map((sonde) => {
                const { _id, device_id, haut, volt, received_at } = sonde
                return (
                    <div key={_id}>
                        <p>Pont : {device_id}</p>
                        <p>Hauteur : {haut} m</p>
                        <p>Tension : {volt}</p>
                        <p>Date : {new Date(received_at).toLocaleString("fr-FR")}</p>
                    </div>
                )
            })}
        </div>
    )
}
