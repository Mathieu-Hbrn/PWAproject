/**
 * @file Toilettes.jsx
 * @description Composant React affichant les informations des capteurs de toilettes.
 *              Il interroge l'API, filtre pour ne garder que la dernière donnée reçue
 *              par capteur, puis affiche le tout dans un tableau.
 */

import { useEffect, useState } from "react"

/**
 * Composant principal d’affichage de l’état des capteurs de toilettes.
 * 
 * @component
 * @example
 * // Exemple d'utilisation :
 * <Toilettes />
 * 
 * @returns {JSX.Element} Tableau des dernières informations d’occupation et de batterie.
 */
export default function Toilettes() {
    /**
     * État local contenant les dernières données reçues pour chaque capteur de toilettes.
     * Chaque objet du tableau est typiquement de la forme :
     * {
     *   _id: string,
     *   device_id: string,
     *   occupancy: number | boolean,
     *   battery: number,
     *   received_at: string (date ISO)
     * }
     */
    const [data, setData] = useState([])

    /** URL de base de l’API, injectée via la variable d’environnement `VITE_URL_API`. */
    const apiUrl = import.meta.env.VITE_URL_API

    /**
     * Effet déclenché au montage du composant :
     * - Récupère la liste complète des données de capteurs via l’API.
     * - Filtre pour ne conserver que la dernière mesure reçue par capteur (`device_id` unique).
     * - Met à jour le state `data` avec ces valeurs récentes.
     */
    useEffect(() => {
        fetch(`${apiUrl}/toilettes`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    // Réduction : garder uniquement la dernière mesure pour chaque capteur
                    const latest = Object.values(
                        json.data.reduce((acc, item) => {
                            const id = item.device_id
                            // Si première occurrence ou mesure plus récente, on remplace
                            if (
                                !acc[id] ||
                                new Date(item.received_at) > new Date(acc[id].received_at)
                            ) {
                                acc[id] = item
                            }
                            return acc
                        }, {})
                    )
                    setData(latest)
                }
            })
            .catch((err) => console.error("Erreur lors de la récupération des données :", err))
    }, [apiUrl]) // bonne pratique : inclure apiUrl comme dépendance

    /**
     * Rendu du tableau principal :
     * - Chaque ligne représente un capteur (une toilette).
     * - Colonnes : nom du capteur, état d’occupation, niveau de batterie, date de réception.
     */
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
                                <td className="num">
                                    {/* Affichage lisible de l’état d’occupation */}
                                    {occupancy ? "Occupé" : "Libre"}
                                </td>
                                <td className="num">{battery}%</td>
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
