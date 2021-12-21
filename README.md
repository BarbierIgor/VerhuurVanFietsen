# VerhuurVanFietsen

### Alles draait op k8s op de vm van Barbier-Igor:

Frontend: op poort 31402\
Backend: op poort 31401\
Adminer op poort 31400

## Test account

### admin:

email: docent@howest.be\
password: P@ssw0rd

### non admin:

email: robbe.platteeuw@gmail.com\
password: StrongPassword123

## Project info

- Er kunnen één of meer fietsen gereserveerd worden.
  noot: Wanneer een fietsenstalling leeg is, wordt de baas (Admin) verwittigd en kunnen zo de
  fietsen opgehaald worden.
- Huurprijs is afhankelijk van duurtijd, het type (vb. elektrisch) en locatie ( vb. stad centrum).
- Klanten kunnen een beoordeling invullen. Rapport kan bevraagd worden door de admin.
- Bezetting van de fietsenstalling en hun locatie is zichtbaar.

## Planning

### 28-11-2021

Frontend:

- afwerken schermen (visueel)

Backend:

- foutcontrole
- routes beveiligen (zodat bvb. enkel de admin toegang heeft tot een route)
- Graphql toevoegen

### 28-11-2021

Frontend:

- login & signup maken

Backend:

- Alle nodige routes aanmaken

### 05-12-2021

Frontend:

- Coderen visueel schermen
- dynamische data toevoegen op homepagina, account

### 12-12-2021

Frontend:

- dynamische data toevoegen op homepagina
- integratie google maps

Backend:

- Dockerizing backend

### 19-12-2021

Frontend:

- dynamische data op alle schermen
- dockerize
- github actions
- deployen op k8s

Backend:

- deployen op k8s
- github actions
- swagger documentatie

### 21-12-2021

Frontend:

- vertaling toevoegen
- maps verder uitwerken
- pwa maken

---

## Checklist backend

- [x] Is een NodeJS Express API die via Docker gehost wordt op Kubernetes

- [x] Gegevens worden persistent gestockeerd in de meest passende datastructuur. Maak
      een goed onderbouwde keuze. SQL

- [ ] Backend communiceert naar frontend in realtime en vice-versa met de gepaste
      protocollen.

- [x] Firebase of dergelijke

- [x] PKCE flow gebruiken

- [x] Minimaal 2 rollen: gebruiker en administrator.

- [x] Admin is voorzien: “docent@howest.be” met paswoord “P@ssw0rd”

- [x] CORS is enabled.

- [ ] Extra beveiligingen tegen Cross Site Forgery, Cross Site Scripting.

- [x] De API documenteert zichzelf op basis van een self-documenting library. (bv.: Swagger
      of GraphiQL)
      **_Er is documentatie aanwezich maar die wordt niet vanzelf gemaakt._**

- [x] Ook statuscodes bij foutcondities worden gedocumenteerd.

- [x] Kies een goede manier om je project te structureren.

- [x] Via een seeder wordt de database bij opstarten van de applicatie automatisch
      aangemaakt.

- [x] Gebruik logische microservices in Docker / Kubernetes.

- [x] Eén service maakt gebruik van gRPC of GraphQL.
      **_Je kan fietsen ophalen via graphql maar dat is niet verder uitgebreid omdat we dat niet in de frontend gebruiken_**

- [x] Het crashen van de applicatie wordt verhinderd door het gebruik van een try/catch
      structuur waarbij de oorzaken bijgehouden worden via een logger.
      **_Trycatch aanwezich maar wordt niet bijgehouden in log bestanden_**

- [x] Foutboodschappen worden altijd via een JSON aan de front bezorgd.

- [x] Source controle gebeurt via GitHub door regelmatig te pushen.

- [x] De applicatie draait volledig in Docker.

- [x] Container wordt automatisch via GitHub Actions gebuild en gepushed naar een Image
      Registry (DockerHub / Harbor) (met versiebeheer van de Container tags)
      **_Staat op github registry_**

- [ ] Image beschikbaar op DockerHub / Harbor

---

## Checklist frontend

- [x] Met een JS-framework gemaakt, met TypeScript. Vuejs

- [ ] Minstens één unit test

- [ ] Minstens één integratie test

- [x] Je werkt met SCSS met een solide achterliggende structuur of **tailwindCSS**.

- [x] Je voorziet ghosts, skeletons / loading states.

- [x] Je voorziet input-validatie en error meldingen.

- [x] De web app kan fullscreen launchen en heeft een correcte PWA-setup.

- [x] Multi-language

- [ ] Error Logging

- [x] De applicatie draait volledig in Docker.

- [x] Build optimisation
      **_vite_**

- [x] Eigen inbreng
      **_Google maps in de frontend & qr code scanner_**

---

## Grootste moeilijkheid

Afstanden berekenen bij google maps en het plaatsen van markers

Google maps met dynamische data zorgde ook voor problemen

Als je op de rancher waar de frontend op draait naar een pagina wilt die google maps gebruikt krijg je een 404 code terwijl je er lokaal wel naartoe kan bij "npm run dev"
