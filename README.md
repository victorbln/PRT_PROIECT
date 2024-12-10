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
    git clone https://github.com/utilizator/repository.git
    ```
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
/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
```

**Descriere:** Această expresie regulată caută adrese de e-mail.

**Componente:**
- `\b`: Asigură că începe și se termină la un cuvânt (evită să captureze fragmente de text care conțin adrese de e-mail).
- `[A-Za-z0-9._%+-]+`: Căutăm caractere care pot apărea într-o adresă de e-mail (litere mari și mici, cifre, puncte, liniuțe, procent, semne plus și minus).
- `@`: Simbolul „@” care separă numele utilizatorului de domeniu.
- `[A-Za-z0-9.-]+`: Permite numele domeniului să conțină litere, cifre, puncte și liniuțe.
- `\.`: Caracterul punct (în domeniul de top, ex: .com).
- `[A-Z|a-z]{2,}`: Permite domeniile de top să aibă cel puțin două litere, de exemplu .com, .ro, etc.
- `\b`: Asigură că se termină la un cuvânt.
- `g`: Căutare globală, pentru a găsi toate instanțele.

### URLs

```javascript
/https?:\/\/[^\s<>]+(?:\.[^\s<>]+)+(?:\/[^\s<>]*)?/g
```

**Descriere:** Această expresie regulată caută URL-uri.

**Componente:**
- `https?`: Căutăm „http” sau „https” (cu sau fără „s”).
- `:\/\/`: Urmează „://” care este parte din sintaxa unui URL.
- `[^\s<>]+`: Permite orice caractere care nu sunt spații, semne de mai puțin decât sau mai mare decât (< sau >), acestea fiind caractere interzise într-un URL.
- `(?:\.[^\s<>]+)+`: Permite domeniul URL-ului să conțină mai multe segmente (de exemplu, .com, .co.uk).
- `(?:\/[^\s<>]*)?`: Permite o cale URL, care poate conține caractere care nu sunt spații sau semne de mai puțin decât sau mai mare decât.
- `g`: Căutare globală.

### Phone Numbers

```javascript
/\b\d{10,15}\b/g
```

**Descriere:** Această expresie regulată caută numere de telefon formate din 10 până la 15 caractere numerice.

**Componente:**
- `\b`: Căutăm la începutul și sfârșitul unui cuvânt.
- `\d{10,15}`: Căutăm un șir de 10 până la 15 cifre (0-9).
- `\b`: Se asigură că se termină la un cuvânt.
- `g`: Căutare globală.

### Dates

```javascript
/\b\d{2}\/\d{2}\/\d{4}\b/g
```

**Descriere:** Căutăm datele în formatul „zz/ll/aaaa” (de exemplu, 12/12/2024).

**Componente:**
- `\b`: Căutăm la începutul și sfârșitul unui cuvânt.
- `\d{2}`: Căutăm exact 2 cifre (pentru zi și lună).
- `\/`: Caracterul „/” care separă ziua, luna și anul.
- `\d{4}`: Căutăm exact 4 cifre pentru anul.
- `\b`: Asigură că se termină la un cuvânt.
- `g`: Căutare globală.

### HTML Tags

```javascript
/<([a-z][a-z0-9]*)\b[^>]*>/gi
```

**Descriere:** Căutăm taguri HTML.

**Componente:**
- `<`: Începe cu semnul „<”, care marchează începutul unui tag HTML.
- `([a-z][a-z0-9]*)`: Permite identificarea numelui unui tag HTML. Numele tagului trebuie să înceapă cu o literă mică, urmată de litere mici și/sau cifre.
- `\b`: Asigură că numele tagului se termină la un cuvânt.
- `[^>]*`: Permite orice caracter, cu excepția „>”, care poate apărea în interiorul tagului (de exemplu, atributele tagului).
- `>`: Se încheie cu semnul „>”.
- `g`: Căutare globală (pentru toate instanțele).
- `i`: Căutare insensibilă la litere mari și mici (pentru a prinde și tagurile cu litere mari).
