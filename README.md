# React + Vite

Acest șablon oferă o configurare minimă pentru a face React să funcționeze în Vite cu HMR și câteva reguli ESLint.

În prezent, sunt disponibile două pluginuri oficiale:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) folosește [Babel](https://babeljs.io/) pentru Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) folosește [SWC](https://swc.rs/) pentru Fast Refresh

# Extractor Regex

## Descriere
Aplicația permite extragerea informațiilor utile din text folosind expresii regulate. Aceasta este capabilă să identifice și să extragă diverse tipuri de date, cum ar fi adrese de e-mail, URL-uri, numere de telefon, date și taguri HTML. Utilizând această aplicație, utilizatorii pot analiza rapid și eficient texte pentru a găsi și a izola informațiile de interes.

## Funcționalități
- **Extragerea adreselor de e-mail:** Aplicația poate găsi și extrage toate adresele de e-mail valide dintr-un text.
- **Identificarea URL-urilor:** Este capabilă să detecteze și să extragă toate URL-urile prezente într-un text.
- **Detectarea numerelor de telefon:** Poate identifica și extrage numerele de telefon formate din 10 până la 15 cifre.
- **Recunoașterea datelor:** Aplicația poate găsi datele în formatul „zz/ll/aaaa” și le poate extrage.
- **Extragerea tagurilor HTML:** Este capabilă să identifice și să extragă tagurile HTML dintr-un text.

## Instrucțiuni de instalare și rulare

### Cerințe preliminare
- Node.js (versiunea 14 sau mai recentă)
- npm (versiunea 6 sau mai recentă) sau yarn

### Instalare
1. Clonați repository-ul:
    ```bash
    git clone https://github.com/victorbln/PRT_PROIECT.git
    ```
    sau descărcați și extrageți arhiva ZIP.
2. Navigați în directorul proiectului:
    ```bash
    cd repository
    ```
3. Instalați dependențele:
    ```bash
    npm install
    ```
    sau
    ```bash
    yarn install
    ```

### Rulare
1. Porniți serverul de dezvoltare:
    ```bash
    npm run dev
    ```
    sau
    ```bash
    yarn dev
    ```
2. Deschideți browser-ul și accesați [Proiect PRT Balan Victor](http://127.0.0.1:5173/) pentru a vedea aplicația în acțiune.

## Explicația expresiilor regulate

### Emails

```javascript
/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}(?<!")\b/g
```

**Descriere:** Această expresie regulată caută adrese de e-mail.

**Componente:**
- `\b`: Căutăm la începutul și sfârșitul unui cuvânt.
- `[A-Za-z0-9._%+-]+`: Căutăm orice combinație de litere, cifre și caractere speciale „._%+-”.
- `@`: Căutăm caracterul „@”.
- `[A-Za-z0-9.-]+`: Căutăm orice combinație de litere, cifre și caractere speciale „.-”.
- `\.`: Căutăm caracterul „.”.
- `[A-Z|a-z]{2,}`: Căutăm două sau mai multe litere mari sau mici.
- `\b`: Se asigură că se termină la un cuvânt.
- `g`: Căutare globală.

### URLs

```javascript
/https?:\/\/[^\s<>"]+(?:\.[^\s<>"]+)+(?:\/[^\s<>"]*)?(?<!")/g
```

**Descriere:** Această expresie regulată caută URL-uri.

**Componente:**
- `https?`: Protocolul „http” sau „https”.
- `:\/\/`: Secvența „://”.
- `[^\s<>"]+`: Căutăm orice caracter care nu este spațiu, „<” sau „"”.
- `(?:\.[^\s<>"]+)+`: Căutăm un punct urmat de orice caracter care nu este spațiu, „<” sau „"”, repetat de una sau mai multe ori.
- `(?:\/[^\s<>"]*)?`: Căutăm un „/” urmat de orice caracter care nu este spațiu, „<” sau „"”, zero sau mai multe ori, opțional.
- `(?<!")`: Asigură că nu se extrag ghilimele.
- `g`: Căutare globală.

### Phone Numbers

```javascript
/\b\d{10,15}(?<!")\b/g
```

**Descriere:** Această expresie regulată caută numere de telefon formate din 10 până la 15 caractere numerice.

**Componente:**
- `\b`: Căutăm la începutul și sfârșitul unui cuvânt.
- `\d{10,15}`: Căutăm un șir de 10 până la 15 cifre.
- `\b`: Se asigură că se termină la un cuvânt.
- `g`: Căutare globală.
- `(?<!")`: Asigură că nu se termină cu un ghilimele.
- `g`: Căutare globală.

### Dates

```javascript
/\b\d{2}\/\d{2}\/\d{4}(?<!")\b/g
```

**Descriere:** Căutăm datele în formatul „zz/ll/aaaa”.

**Componente:**
- `\b`: Căutăm la începutul și sfârșitul unui cuvânt.
- `\d{2}\/\d{2}\/\d{4}`: Căutăm un șir de 2 cifre, urmat de „/”, apoi de un alt șir de 2 cifre, „/” și un șir de 4 cifre.
- `\b`: Se asigură că se termină la un cuvânt.
- `g`: Căutare globală.

### HTML Tags

```javascript
/<\/?([a-z][a-z0-9]*).*?>(?<!")/gi
```

**Descriere:** Căutăm taguri HTML.

**Componente:**
- `<\/?`: Căutăm un caracter „<” urmat de un caracter opțional „/”.
- `([a-z][a-z0-9]*)`: Căutăm un caracter literă urmat de orice combinație de litere și cifre.
- `.*?`: Căutăm orice caracter zero sau mai multe ori, non-greedy.
- `>`: Căutăm caracterul „>”.
- `g`: Căutare globală.
- `i`: Căutare nesensibilă la majuscule și minuscule.
