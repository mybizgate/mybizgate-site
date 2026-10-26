# MyBizGate Websites & Deployment Guide

MyBizGate maintains independent static websites for the main corporate site, reusable industry demos, and client-specific implementations.

The long-term structure is **one Git repository per website**. The parent `mybizgate/` directory is only a local workspace and must **not** be a Git repository.

---

## 1. Local Workspace Structure

Recommended local structure:

```text
/home/jul/Workspace/mybizgate/
│
├── mybizgate-site/
│   ├── .git/
│   ├── .github/workflows/deploy.yml
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── assets/
│
├── autogate/
│   ├── .git/
│   ├── .github/workflows/deploy.yml
│   └── ...
│
├── beautygate/
│   ├── .git/
│   └── ...
│
├── dentalgate/
│   ├── .git/
│   └── ...
│
├── petgate/
│   ├── .git/
│   └── ...
│
├── supplygate/
│   ├── .git/
│   └── ...
│
└── clients/
    ├── client-pawhaven/
    │   ├── .git/
    │   ├── .github/workflows/deploy.yml
    │   └── ...
    │
    └── client-abc-mart/
        ├── .git/
        ├── .github/workflows/deploy.yml
        └── ...
```

Important: `/home/jul/Workspace/mybizgate/.git` should **not** exist.

Each website is independently versioned and deployed.

---

## 2. Repository Naming Convention

### MyBizGate products / demos

```text
mybizgate-site
petgate
autogate
beautygate
dentalgate
supplygate
```

### Client repositories

Use:

```text
client-<business-slug>
```

Examples:

```text
client-pawhaven
client-abc-mart
client-kl-beauty
client-smile-dental
```

Recommended local path:

```text
/home/jul/Workspace/mybizgate/clients/client-<business-slug>
```

Recommended GitHub repository:

```text
mybizgate/client-<business-slug>
```

The repository name is internal. The public subdomain can remain clean, for example:

```text
pawhaven.mybizgate.com
```

instead of:

```text
client-pawhaven.mybizgate.com
```

---

## 3. Current Website Mapping

| Repository | Hosting Directory | Public Site |
| --- | --- | --- |
| `mybizgate-site` | `/home/mybizgat/public_html/` | `mybizgate.com` / `www.mybizgate.com` |
| `autogate` | `/home/mybizgat/public_html/site-autogate/` | `autogate.mybizgate.com` |
| `beautygate` | `/home/mybizgat/public_html/site-beautygate/` | `beautygate.mybizgate.com` |
| `dentalgate` | `/home/mybizgat/public_html/site-dentalgate/` | `dentalgate.mybizgate.com` |
| `petgate` | `/home/mybizgat/public_html/site-petgate/` | `petgate.mybizgate.com` |
| `supplygate` | `/home/mybizgat/public_html/site-supplygate/` | `runcithub.mybizgate.com` |

Future client example:

```text
GitHub repo:
client-pawhaven

Local folder:
/home/jul/Workspace/mybizgate/clients/client-pawhaven

Subdomain:
pawhaven.mybizgate.com

Server folder:
/home/mybizgat/public_html/pawhaven
```

---

# 4. New Client Deployment Checklist

Example client:

```text
Business: Paw Haven
Repository: client-pawhaven
Subdomain: pawhaven.mybizgate.com
Server folder: /home/mybizgat/public_html/pawhaven
```

High-level flow:

```text
Create local project
        ↓
Create cPanel subdomain
        ↓
Create GitHub repository
        ↓
Push main branch
        ↓
Create deploy branch
        ↓
Add GitHub Actions secrets
        ↓
Add deploy.yml
        ↓
Test deployment
        ↓
Validate production
```

---

# 5. Step 1 — Create the Client Project Locally

```bash
cd /home/jul/Workspace/mybizgate/clients
mkdir client-pawhaven
cd client-pawhaven
```

Typical structure:

```text
client-pawhaven/
├── index.html
├── style.css
├── script.js
├── assets/
├── images/
└── README.md
```

Keep asset URLs relative.

Example:

```html
<img src="images/hero.webp" alt="Paw Haven">
```

---

# 6. Step 2 — Create the Subdomain in cPanel

Login:

```text
https://baboon.awedns.com:2083/
```

Username:

```text
mybizgat
```

Do **not** store the cPanel password in this repository. Retrieve it from the approved secure source / hosting welcome email when needed.

Navigate:

```text
cPanel
→ Domains
→ Domains
→ Create A New Domain
```

Example:

```text
Domain:
pawhaven.mybizgate.com
```

Leave **Share document root with mybizgate.com** unchecked.

Set:

```text
Document Root:
/public_html/pawhaven
```

Click **Submit**.

Final server path:

```text
/home/mybizgat/public_html/pawhaven
```

Verify in:

```text
cPanel
→ File Manager
→ public_html
```

Expected:

```text
public_html/
├── pawhaven/
├── site-autogate/
├── site-beautygate/
├── site-dentalgate/
├── site-petgate/
├── site-supplygate/
└── ...
```

---

# 7. Step 3 — Verify SSL

Open:

```text
https://pawhaven.mybizgate.com
```

If HTTPS is not yet valid, check:

```text
cPanel
→ SSL/TLS Status
```

Wait for AutoSSL or resolve the SSL issue before production launch.

---

# 8. Step 4 — Initialize Git

```bash
cd /home/jul/Workspace/mybizgate/clients/client-pawhaven

git init
git branch -M main
```

Configure repository identity if needed:

```bash
git config user.name "mybizgate"
git config user.email "YOUR_GITHUB_EMAIL"
```

Recommended `.gitignore`:

```gitignore
.env
.env.*
*.pem
*.key
node_modules/
dist/
.DS_Store
Thumbs.db
.idea/
.vscode/
*.log
```

Never commit passwords, API keys, FTP credentials, cPanel credentials, database credentials, private keys, or private customer data.

Commit:

```bash
git add .
git commit -m "Initial client website"
```

---

# 9. Step 5 — Create the GitHub Repository

Create a new repository:

```text
mybizgate/client-pawhaven
```

Recommended visibility:

```text
Private
```

Do not initialize it with a second README or `.gitignore` if the local project already has files.

Verify the dedicated GitHub SSH identity:

```bash
ssh -T git@github-mybizgate
```

Expected:

```text
Hi mybizgate! You've successfully authenticated, but GitHub does not provide shell access.
```

Add the remote:

```bash
git remote add origin git@github-mybizgate:mybizgate/client-pawhaven.git
git remote -v
git push -u origin main
```

---

# 10. Step 6 — Create the Production Branch

Development branch:

```text
main
```

Production branch:

```text
deploy
```

Create it:

```bash
git checkout -b deploy
git push -u origin deploy
git checkout main
```

A push to `main` must not deploy production. A push to `deploy` triggers deployment.

---

# 11. Step 7 — Configure GitHub Actions Secrets

Open:

```text
Repository
→ Settings
→ Secrets and variables
→ Actions
→ Repository secrets
```

Create:

```text
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
```

Current FTPS server:

```text
FTP_SERVER=baboon.awedns.com
```

Connection:

```text
Protocol: FTPS
Port: 21
Encryption: Explicit FTP over TLS
```

Never put credentials directly inside `deploy.yml`.

Long-term recommendation: create a dedicated restricted FTP account for each site/client once its server path is confirmed.

---

# 12. Step 8 — Create `.github/workflows/deploy.yml`

```bash
mkdir -p .github/workflows
nano .github/workflows/deploy.yml
```

Example for `client-pawhaven`:

```yaml
name: Deploy Paw Haven Production

on:
  push:
    branches:
      - deploy

concurrency:
  group: client-pawhaven-production
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Add cache busting version
        run: |
          VERSION="${GITHUB_SHA::8}"
          echo "Deploy version: $VERSION"

          if grep -q "__BUILD_VERSION__" index.html; then
            sed -i "s/__BUILD_VERSION__/$VERSION/g" index.html
          fi

      - name: Deploy Paw Haven via FTPS
        uses: SamKirkland/FTP-Deploy-Action@v4.4.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          local-dir: ./
          server-dir: public_html/pawhaven/

          exclude: |
            **/.git*
            **/.git*/**
            **/.github/**
            **/node_modules/**
            README.md
            AGENTS.md
```

Because each client/site is now a standalone repository:

```yaml
local-dir: ./
```

The only deployment path that changes per client is:

```yaml
server-dir: public_html/<subdomain>/
```

---

# 13. Cache Busting

For sites with separate CSS / JavaScript files:

```html
<link rel="stylesheet" href="style.css?v=__BUILD_VERSION__">
<script src="script.js?v=__BUILD_VERSION__"></script>
```

During deployment GitHub Actions replaces `__BUILD_VERSION__` with the current commit SHA.

Example:

```text
style.css?v=82ba19f3
script.js?v=82ba19f3
```

For a true single-file `index.html` with inline CSS/JS, this is normally unnecessary.

---

# 14. Step 9 — Commit the Workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Configure automatic production deployment"
git push origin main
```

Deploy:

```bash
git checkout deploy
git merge main
git push origin deploy
git checkout main
```

---

# 15. Step 10 — Test the First Deployment

For a new site, temporarily add an obvious marker:

```html
<div style="background:#ffeb3b;color:#111;text-align:center;padding:10px;font-weight:700;">
  AUTO DEPLOY TEST
</div>
```

Commit to `main`:

```bash
git add .
git commit -m "Test automatic deployment"
git push origin main
```

Deploy:

```bash
git checkout deploy
git merge main
git push origin deploy
git checkout main
```

Open:

```text
GitHub
→ Repository
→ Actions
```

The deployment workflow should finish with a green check.

Then open:

```text
https://pawhaven.mybizgate.com
```

Confirm the test marker appears.

Remove the marker, commit, and deploy again.

---

# 16. Production Validation Checklist

After the first deployment verify:

- subdomain loads
- valid HTTPS certificate
- `index.html` loads
- CSS / JS / images / fonts / icons load
- no browser console errors
- no 404 errors
- no mixed-content errors
- mobile layout
- desktop layout
- forms
- booking/order flows
- WhatsApp number and pre-filled message
- localStorage flows if used
- title and meta description
- canonical URL if present
- Open Graph metadata if present
- favicon
- robots.txt / sitemap.xml when used

For cache testing:

```text
F12
→ Network
→ Disable cache
```

Reload and verify the newest asset versions are requested.

---

# 17. Normal Development Workflow

Develop:

```bash
git checkout main
```

Commit:

```bash
git add .
git commit -m "Update client website"
git push origin main
```

Deploy only when ready:

```bash
git checkout deploy
git merge main
git push origin deploy
git checkout main
```

Flow:

```text
main
  ↓
development/testing
  ↓
merge
  ↓
deploy
  ↓
GitHub Actions
  ↓
FTPS
  ↓
server folder
  ↓
subdomain
```

---

# 18. Main MyBizGate Deployment

Repository:

```text
mybizgate/mybizgate-site
```

Local:

```text
/home/jul/Workspace/mybizgate/mybizgate-site
```

Server:

```text
/home/mybizgat/public_html/
```

Public:

```text
mybizgate.com
www.mybizgate.com
```

Workflow deployment mapping:

```yaml
local-dir: ./
server-dir: public_html/
```

Example:

```yaml
name: Deploy MyBizGate Production

on:
  push:
    branches:
      - deploy

concurrency:
  group: mybizgate-production
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Add cache busting version
        run: |
          VERSION="${GITHUB_SHA::8}"
          echo "Deploy version: $VERSION"

          if grep -q "__BUILD_VERSION__" index.html; then
            sed -i "s/__BUILD_VERSION__/$VERSION/g" index.html
          fi

      - name: Deploy MyBizGate via FTPS
        uses: SamKirkland/FTP-Deploy-Action@v4.4.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          local-dir: ./
          server-dir: public_html/

          exclude: |
            **/.git*
            **/.git*/**
            **/.github/**
            **/node_modules/**
            README.md
            AGENTS.md
```

---

# 19. Existing Demo Deployment Targets

| Repo | Server Directory | Subdomain |
| --- | --- | --- |
| `autogate` | `/public_html/site-autogate/` | `autogate.mybizgate.com` |
| `beautygate` | `/public_html/site-beautygate/` | `beautygate.mybizgate.com` |
| `dentalgate` | `/public_html/site-dentalgate/` | `dentalgate.mybizgate.com` |
| `petgate` | `/public_html/site-petgate/` | `petgate.mybizgate.com` |
| `supplygate` | `/public_html/site-supplygate/` | `runcithub.mybizgate.com` |

Each standalone repository uses:

```yaml
local-dir: ./
```

Only `server-dir` changes.

---

# 20. Hosting Folder Convention

Reusable MyBizGate demos:

```text
/public_html/site-<gate-name>
```

Examples:

```text
/public_html/site-petgate
/public_html/site-autogate
/public_html/site-beautygate
```

Real clients:

```text
/public_html/<subdomain>
```

Example:

```text
GitHub:
client-pawhaven

Server:
/public_html/pawhaven

Public:
https://pawhaven.mybizgate.com
```

---

# 21. FileZilla / Emergency Manual Deployment

Automatic deployment is the normal method.

For emergency/manual deployment:

```text
Host: baboon.awedns.com
Port: 21
Protocol: FTP
Encryption: Require explicit FTP over TLS
```

Useful bookmarks:

```text
MyBizGate → /public_html
AutoGate  → /public_html/site-autogate
PetGate   → /public_html/site-petgate
Paw Haven → /public_html/pawhaven
```

Do not accidentally upload unrelated local projects.

---

# 22. Important Server Files

Do not overwrite/delete unless intentionally changing server configuration:

```text
.htaccess
.user.ini
php.ini
.well-known/
cgi-bin/
.ftpquota
```

Exclude repository-only files from deployment:

```text
.git/
.github/
README.md
AGENTS.md
node_modules/
```

Do not use destructive clean-slate deployment against `/public_html`.

---

# 23. FTP Deployment State

The FTP deployment action may create:

```text
.ftp-deploy-sync-state.json
```

inside the remote deployment directory.

This is expected and supports incremental synchronization. Do not remove it routinely.

---

# 24. New Client Quick Reference

Example:

```text
Client: Paw Haven
Local: /home/jul/Workspace/mybizgate/clients/client-pawhaven
GitHub: mybizgate/client-pawhaven
Subdomain: pawhaven.mybizgate.com
Document Root: /public_html/pawhaven
Full Server Path: /home/mybizgat/public_html/pawhaven
Branches: main, deploy
```

Checklist:

```text
1. Create local client folder
2. Build/customize website
3. Create cPanel subdomain
4. Set Document Root
5. Confirm SSL
6. git init
7. Create GitHub repository
8. Push main
9. Create deploy branch
10. Add FTP_SERVER secret
11. Add FTP_USERNAME secret
12. Add FTP_PASSWORD secret
13. Create .github/workflows/deploy.yml
14. Push workflow to main
15. Merge main → deploy
16. Push deploy
17. Check GitHub Actions
18. Open production subdomain
19. Validate desktop/mobile
20. Remove deployment test marker
21. Deploy final version
```

---

# 25. Security Rules

Never commit:

```text
cPanel passwords
FTP passwords
email passwords
API secrets
database passwords
private keys
customer personal data
```

Never place passwords inside:

```text
README.md
deploy.yml
JavaScript
HTML
Git commits
```

Use GitHub Actions Secrets for deployment credentials.

---

# 26. Demo Data and Privacy

- Static forms may prepare enquiries for WhatsApp.
- Some demos may use browser `localStorage`.
- `localStorage` is not a production database.
- Backend/auth/payment capability must not be assumed unless explicitly implemented.
- Keep prices, phone numbers, WhatsApp messages, and metadata synchronized.
- Never include private customer information in public demo repositories.

---

# 27. Final Architecture

```text
Developer Pop!_OS
│
├── mybizgate-site/.git
│       ↓ GitHub → deploy → Actions → FTPS
│     /public_html
│       ↓
│     mybizgate.com
│
├── petgate/.git
│       ↓ GitHub → deploy → Actions → FTPS
│     /public_html/site-petgate
│
├── autogate/.git
│       ↓ GitHub → deploy → Actions → FTPS
│     /public_html/site-autogate
│
└── clients/
    ├── client-pawhaven/.git
    │       ↓ GitHub → deploy → Actions → FTPS
    │     /public_html/pawhaven
    │       ↓
    │     pawhaven.mybizgate.com
    │
    └── client-abc-mart/.git
            ↓ GitHub → deploy → Actions → FTPS
          /public_html/abc-mart
            ↓
          abc-mart.mybizgate.com
```

This structure keeps every site independent, keeps deployment predictable, and lets MyBizGate scale to many client projects without mixing Git histories or production targets.
