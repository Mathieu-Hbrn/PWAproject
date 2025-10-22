/**
 * @file Sondes.jsx
 * @description Composant React d'affichage des mesures de sondes.
 *              Il récupère les données depuis une API, filtre pour ne garder que
 *              la dernière mesure reçue de chaque sonde, et les affiche dans un tableau.
 */

import { useEffect, useState } from "react"
import "./Sondes.css"

/**
 * Composant principal d'affichage des sondes.
 *
 * @component
 * @example
 * // Exemple d'utilisation :
 * <Sondes />
 *
 * @returns {JSX.Element} Tableau listant les dernières mesures reçues des sondes.
 */
export default function Sondes() {
    /**
     * État local contenant la liste des mesures affichées.
     * Chaque élément est un objet du type :
     * {
     *   _id: string,
     *   device_id: string,
     *   haut: number,
     *   volt: number,
     *   received_at: string (ISO date)
     * }
     */
    const [data, setData] = useState([])

    /** URL de base de l’API, définie dans le fichier `.env` via la variable VITE_URL_API */
    const apiUrl = import.meta.env.VITE_URL_API

    /**
     * Effet de récupération des données lors du montage du composant.
     *
     * - Appelle l'API `${apiUrl}/sondes`
     * - Si la réponse est un succès (`json.success === true`),
     *   filtre les données pour ne garder que la dernière mesure reçue
     *   pour chaque sonde (`device_id` unique)
     * - Met à jour le state `data` avec ces dernières valeurs.
     */
    useEffect(() => {
        fetch(`${apiUrl}/sondes`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    // Réduction : ne garder que la mesure la plus récente par sonde
                    const latest = Object.values(
                        json.data.reduce((acc, item) => {
                            const id = item.device_id
                            // Si la sonde n’existe pas encore ou si la mesure est plus récente, on remplace
                            if (!acc[id] || new Date(item.received_at) > new Date(acc[id].received_at)) {
                                acc[id] = item
                            }
                            return acc
                        }, {})
                    )
                    setData(latest)
                }
            })
            .catch((err) => console.error("Erreur lors de la récupération des sondes :", err))
    }, [apiUrl]) // dépendance sur apiUrl (bonne pratique même si souvent stable)

    /**
     * Rendu JSX :
     * - Affiche un titre
     * - Table HTML listant les mesures récentes
     * - Chaque ligne correspond à une sonde (identifiée par `_id`)
     */
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
