# Boki-Passport

# Team members (BokiNarak group)
- Krittameth Tansuwan 672115002
- Nattikorn Sae-sue 672115014
- Apitawan Chirakunasin 672115050

# Submission URLs (Midterm Project)
Application Demo URL: https://drive.google.com/file/d/1DS79gZOeBvkm_AHec0pH_S7_M1mNHlot/view?usp=sharing  
Boki-Passport Vercel Deployment URL: https://se331-2026-project01-bokinarak.vercel.app/  
JSON-Server Vercel Deployment URL: https://boki-passport-json-server.vercel.app/

# Submission URLs (Final Term Project)
- Frontend: [Link](https://github.com/chartchai-class/953331-2026-component-based-software-dev-project2-frontend-group-1)
- Backend: [Link](https://github.com/chartchai-class/953331-2026-component-based-software-dev-project-2-group-2)

# Deployment Link
Deployed on **Azure VM**  
Link: https://20-191-146-137.sslip.io/


## BACKEND USAGE
The Spring Boot backend runs on port 8080 (`VITE_BACKEND_URL`) and seeds its own
test accounts on startup, so **login always goes to the backend** — the json-server
mock only serves the levels, exams, courses and badges lists.

| username | password | roles | levels | note |
|---|---|---|---|---|
| `admin` | `123` | ROLE_ADMIN, ROLE_USER | 1-4 | the admin account |
| `boki` | `boki123` | ROLE_USER | 1 | 3 badges, exam history |
| `pimchanok` | `123` | ROLE_USER | 1-4 | every badge and level |
| `krittin` | `123` | ROLE_USER | 1-3 | |
| `tanapat` | `123` | ROLE_USER | 1-3 | |
| `nicha` | `123` | ROLE_USER | 1-3 | |
| `collapsee` | `123` | ROLE_USER | 1-2 | |
| `somchai` | `123` | ROLE_USER | 1-2 | |
| `mali` | `123` | ROLE_USER | 1 | |
| `thianlnwza007` | `123` | ROLE_USER | 1 | |
| `gerry` | `123` | ROLE_USER | 1-3 | disabled — cannot log in |
| `arthit` | `123` | ROLE_USER | 1-3 | disabled — cannot log in |
| `supansa` | `123` | ROLE_USER | 1 | disabled — cannot log in |

A new account can also be created from the register page — it starts with
ROLE_USER, no badges and level 1.
