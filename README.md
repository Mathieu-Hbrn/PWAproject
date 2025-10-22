# 🚰 Supervision des sondes et capteurs de toilettes (PWA)

Application web de supervision en **React + Vite** permettant d’afficher les dernières mesures reçues de sondes et de capteurs de toilettes.  
Le projet est configuré comme une **Progressive Web App (PWA)** avec support **hors ligne** et **installation** sur mobile ou desktop.

---

## 🧩 Fonctionnalités

### 🔹 Sondes
- Récupère les données depuis l’API `/sondes`
- Filtre pour ne garder que **la dernière mesure** par appareil
- Affiche :
    - Pont (`device_id`)
    - Hauteur d’eau (`haut`)
    - Tension (`volt`)
    - Date de réception (`received_at`)

### 🔹 Toilettes
- Récupère les données depuis l’API `/toilettes`
- Affiche :
    - Nom du capteur
    - État d’occupation (occupé / libre)
    - Niveau de batterie
    - Date de réception

### 🔹 PWA
- Installation possible sur mobile et bureau
- Fonctionne **hors connexion**
- Mise à jour automatique via **Workbox**
- Icônes et manifest configurés pour le mode standalone

### 🔹 Notification
- Envoi de notification 
- soumis a validation de l'utilisateur


---

## ⚙️ Technologies utilisées

| Technologie | Rôle |
|--------------|------|
| [React](https://reactjs.org/) | Interface utilisateur dynamique |
| [Vite](https://vitejs.dev/) | Outil de build rapide |
| [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) | Gestion de la PWA et du service worker |
| [Workbox](https://developer.chrome.com/docs/workbox) | Caching et stratégies offline |
| CSS | Mise en forme claire et moderne |

---

## 🛠️ Installation et exécution

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/<ton-utilisateur>/<ton-projet>.git
cd <ton-projet>
