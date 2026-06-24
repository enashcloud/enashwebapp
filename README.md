# Enash Cloud — website

A single-page React site for Enash Cloud (trading name of Indesign and Developers (Pty) Ltd),
built with [Vite](https://vite.dev) and [lucide-react](https://lucide.dev) icons. No backend
required to run or preview it.

## 1. Install prerequisites

You need [Node.js](https://nodejs.org) 18 or later. Check what you have:

```bash
node -v
npm -v
```

If `node -v` fails, install Node.js from nodejs.org first.

## 2. Install dependencies

From inside this folder:

```bash
npm install
```

## 3. Run it locally

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). Edit `src/App.jsx` and the browser
updates instantly.

## 4. Before you go live, replace these placeholders

- `hello@enashcloud.co.za` and `+27 00 000 0000` in the contact section of `src/App.jsx`
- The contact form currently shows a success message but does not send anywhere. Wire it up to
  a real endpoint (see below) before relying on it for leads.

### Making the contact form actually send messages

Pick one:

- **Quickest:** use a form backend like [Formspree](https://formspree.io) or
  [Web3Forms](https://web3forms.com) — sign up, get an endpoint URL, and `fetch()` it from
  `handleSubmit` in `src/App.jsx` instead of the current `setTimeout`.
- **Azure-native:** create an Azure Function (HTTP trigger) that emails you via SendGrid or
  Microsoft Graph, then call that function's URL from `handleSubmit`. This keeps everything on
  the stack you're already using your Azure credits for.

## 5. Build for production

```bash
npm run build
```

This creates a `dist/` folder with the optimised, static site, plain HTML/CSS/JS, ready to host
anywhere.

Preview the production build locally before deploying:

```bash
npm run preview
```

## 6. Deploy

### Option A: Azure Static Web Apps (recommended, uses your existing Azure credits)

1. Push this folder to a GitHub repository.
2. In the Azure Portal, create a new **Static Web App** resource and connect it to that repo.
3. When asked for build settings, use:
   - App location: `/`
   - Output location: `dist`
4. Azure sets up a GitHub Actions workflow automatically. Every push to `main` redeploys the site.
5. Once deployed, add your own domain (e.g. `enashcloud.co.za`) under **Custom domains** in the
   Static Web App resource.

### Option B: Netlify or Vercel (fastest to get a link)

1. Run `npm run build`.
2. Drag the `dist/` folder into Netlify's deploy page, or run `vercel` / `netlify deploy` from
   this folder if you have their CLI installed.

## Project structure

```
enash-cloud-app/
├── index.html        # HTML entry point
├── package.json       # dependencies and scripts
├── vite.config.js     # build tool config
└── src/
    ├── main.jsx        # mounts <App /> into the page
    ├── index.css       # minimal global reset
    └── App.jsx         # the entire site (sections, styles, content)
```
"# enashwebapp" 
