# Mon Budget

Application de budget personnel installable (PWA), pour tout le monde : mois en deux étapes (préparer puis suivre), charges perso, compte commun optionnel, crédits avec suivi mois par mois, pointage, dépenses au réel, reprises sur l'épargne.

Pas de compte à créer : au premier lancement, un écran de bienvenue demande le prénom, s'il y a un compte commun et le salaire du mois.
Fonctionne sur iPhone, Android et PC, y compris hors ligne.

**Aucune donnée personnelle dans ce dépôt.** Les données restent sur chaque appareil (stockage du navigateur) et se transfèrent avec un fichier de sauvegarde `.json`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application |
| `manifest.webmanifest` | Nom, icône et mode plein écran de l'app installée |
| `sw.js` | Fonctionnement hors ligne et mises à jour |
| `icons/` | Icônes de l'app |

## Mettre en ligne avec GitHub Pages

1. Sur github.com, crée un dépôt (bouton **New**), par exemple `budget`. Laisse-le **Public** (obligatoire pour Pages gratuit).
2. Dans le dépôt : **Add file → Upload files**, glisse tout le contenu de ce dossier (y compris le dossier `icons`), puis **Commit changes**.
3. Va dans **Settings → Pages**. Sous *Branch*, choisis `main` et `/ (root)`, puis **Save**.
4. Après 1 à 2 minutes, l'adresse s'affiche : `https://<ton-pseudo>.github.io/budget/`.

## Installer sur iPhone

1. Ouvre l'adresse dans **Safari**.
2. Bouton **Partager** → **Sur l'écran d'accueil** → **Ajouter**.
3. Ouvre l'app depuis l'icône. Pour reprendre tes données : ⚙︎ Réglages → **Importer** et choisis le fichier `.json` exporté depuis le PC.

L'app installée a ses propres données, séparées de Safari : importe la sauvegarde **depuis l'app installée**.

## Mettre à jour l'app

1. Remplace `index.html` (et les autres fichiers modifiés) dans le dépôt.
2. Dans `sw.js`, change `VERSION` (par exemple `budget-v11`) et le numéro affiché dans `index.html` (id `appVer`).
3. Ferme et rouvre l'app : la nouvelle version s'applique. Tes données ne sont pas touchées.

## Sauvegardes

Fais régulièrement ⚙︎ Réglages → **Exporter**, puis **Enregistrer dans Fichiers** (iCloud Drive). C'est ta copie de sécurité, et le moyen de passer tes données d'un appareil à l'autre (⚙︎ → **Importer** de l'autre côté).

Sur PC (Chrome ou Edge), la **sauvegarde automatique** peut écrire dans un dossier (par exemple sur le NAS) : ⚙︎ → **Choisir le dossier**. Elle n'existe pas sur iPhone (Safari ne le permet pas).
