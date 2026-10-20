# Boki-Passport

# Team members (BokiNarak group)
- Krittameth Tansuwan 672115002
- Nattikorn Sae-sue 672115014
- Apitawan Chirakunasin 672115050

# Submission URLs
Application Demo URL: https://drive.google.com/file/d/1DS79gZOeBvkm_AHec0pH_S7_M1mNHlot/view?usp=sharing  
Boki-Passport Vercel Deployment URL: https://se331-2026-project01-bokinarak.vercel.app/  
JSON-Server Vercel Deployment URL: https://boki-passport-json-server.vercel.app/

## Contributions (Provided by Git Stats extension)
<img width="1515" height="350" alt="image" src="https://github.com/user-attachments/assets/fc7a924a-6bfe-4a18-937d-c4c90b774817" />  
**NOTE: GERRYExpress and Krittameth Tansuwan are the same person.**

## JSON-SERVER USAGE
Enter the following command into the terminal:
```
# install the dependencies first
npm install

# start JSON server at port 3000
npx json-server ./db.json
```

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
