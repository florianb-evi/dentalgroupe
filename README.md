# DENTAL GROUPE — site du groupe

Site statique : une page HTML, sans compilation. Vercel le sert tel quel.

## Contenu du dépôt

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Le site complet (5 pages, 6 langues, styles et scripts inclus) |
| `dg-switcher.js` | Barre « Toutes nos entités », à installer aussi sur les sites des entités |
| `logos/` | Logos des entités, des marques et icônes de la barre |
| `vendor/lenis.min.js` | Défilement fluide (Lenis 1.3.26, licence MIT dans `vendor/LENIS-LICENSE`) |
| `favicon.svg`, `apple-touch-icon.png` | Icônes du site |
| `robots.txt`, `sitemap.xml` | Référencement |
| `vercel.json` | En-têtes de sécurité et de cache |

## Mise en ligne

1. Créer un dépôt GitHub (par exemple `dentalgroupe-site`) et y déposer **tout le contenu de ce dossier** à la racine (pas le dossier lui-même).
2. Sur vercel.com : **Add New → Project → Import** le dépôt.
3. Réglages du projet :
   - Framework Preset : **Other**
   - Build Command : *(vide)*
   - Output Directory : *(vide, ou `.`)*
   - Install Command : *(vide)*
4. **Deploy**. Chaque `git push` sur la branche principale republie le site automatiquement.
5. Domaine : Project → Settings → **Domains** → ajouter `dentalgroupe.com` (et `www.dentalgroupe.com` en redirection), puis suivre les enregistrements DNS indiqués par Vercel.

Si le domaine final n'est pas `dentalgroupe.com`, remplacer l'adresse dans `index.html` (balises `canonical` et `og:url`), `robots.txt` et `sitemap.xml`.

## Barre des entités sur les autres sites

Sur chaque site d'entité (oofti.fr, safe-implant.fr, cmonlab.fr…), ajouter avant `</body>` :

```html
<script src="https://dentalgroupe.com/dg-switcher.js" data-home="https://dentalgroupe.com/" defer></script>
```

Les icônes sont chargées depuis `https://dentalgroupe.com/logos/`.

## À brancher avant l'ouverture

- **Formulaires** (Contact et Candidature) : ils affichent pour l'instant un message de maquette et n'envoient rien. À relier à un service d'envoi (Formspree, Brevo, une fonction Vercel…).
- **Evidentall** : le lien pointe vers la page Contact tant que le site n'est pas en ligne.
