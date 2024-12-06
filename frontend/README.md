# CineMate - filmapplikation

CineMate är en webbaserad applikation byggd med Vue 3 och TypeScript. Applikationen låter användare söka efter filmer, se detaljerad information om en specifik film och hantera en lista över favoritfilmer.

## Funktionalitet

1. **Startsida**: Användare kan söka efter filmer med hjälp av en sökruta. Sökresultaten visas som en lista av filmkort.

2. **Pagination**: Användaren navigerar mellan sidorna med hjälp av en pagineringsfunktion.

3. **Film-detaljer**: Användare kan klicka på ett filmkort för att gå till en separat sida där detaljerad information om filmen visas, inklusive en knapp för att lägga till filmen som favorit.

4. **Favoritfilmer**: Användare kan se en lista över sina sparade favoritfilmer och ta bort filmer från favoritlistan.

5. **Temaväxling**: Applikationen har stöd för mörkt och ljust läge, som kan växlas med en knapp i navigeringsfältet.

6. **Responsiv design**: I mobilvy visas en hamburgermeny där användare kan navigera till favoritsidan, logga ut och växla tema.

## Teknisk Stack
CineMate är byggd med i frontend:
- **Vue 3**: Används för komponentbaserad UI-uppbyggnad.

- **TypeScript**: För att säkerställa typning och robust kod.

- **Vue Router**: För att hantera navigering mellan sidor.

- **Pinia**: För att hantera globala state

CineMate är byggd med i backend:

- **Node.js**: För server-logik och hantering av backend-tjänster.

- **MongoDB**: För att lagra användardata och favoritfilmer.

- **mongoose**: För att modellera och interagera med MongoDB.

- **Express**: För att skapa API-endpoints och hantera HTTP-förfrågningar.

- **bcrypt**: För att hasha och verifiera användarlösenord.

- **jsonwebtoken**: För att hantera autentisering och användarsessioner.

## Projektstruktur

- **/components**: Återanvändbara Vue-komponenter

- **/router**: Hanterar routning mellan olika vyer i applikationen

- **/services**: Innehåller API-anrop
- **/store**: Globala state management-filer skapade med Pinia
- **/types**: TypeScript typedefinitioner
- **/views**: Vue-filer för applikationens huvudvyer

## Miljövariabler

Lägg till en config.env fil i root-mappen (backend) med följande variabler:

```
DATABASE=<din MongoDB-URL>
DB_NAME=<namnet på din databas>
DATABASE_PASSWORD=<ditt databaslösenord>
JWT_SECRET=<din JWT-hemlighet>
PORT=6008

Exempel:

DATABASE=mongodb+srv://<användarnamn>:<lösenord>@cluster0.mongodb.net/<din-db-namn>?retryWrites=true&w=majority
```

```
Lägg till .env fil i root-mappen (frontend) med följande variabler:

VITE_TMDB_API_KEY= din VITE_TMDB_API_KEY
VITE_TMDB_BASE_URL= din VITE_TMDB_BASE_URL
```


## Installation
1. Klona repot:

```
git clone [repo-url]
```

2. Installera beroenden:

```
# npm
npm install

# yarn
yarn install
```

3. Starta utvecklingsservern:

```
# npm
npm run dev

# yarn
yarn dev
```

## Produktion

```
# npm
npm run build

# yarn
yarn build
```

## Kontakt
För frågor eller feedback:
- **E-post**: luay.asaadsson@chasacademy.se