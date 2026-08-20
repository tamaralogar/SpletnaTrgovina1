# SpletnaTrgovina

Aplikacija je sestavljena iz dveh delov:

- SpletnaTrgovina/ — Angular frontend
- backend/ — Flask backend s SQLite bazo


## Funkcionalnosti

- Registracija in prijava uporabnikov (hashiranje gesel)
- JWT avtentikacija — ob prijavi se izda podpisan token (velja 1 uro), ki ga Angular jwtInterceptor doda vsaki nadaljnji zahtevi
- Pot `GET /api/items`, na kateri lahko uporabniki vidijo izdelke, je zaščitena (@token_required) — dostopna samo prijavljenim uporabnikom
- Filtriranje izdelkov (velikost, cena, kategorija, barva) poteka na backendu prek query parametrov
- Dodajanje izdelkov v košarico in iz nje (in računanje skupne cene)
- Odjava počisti token, košarico in filtre, da naslednji prijavljeni uporabnik v isti seji ne podeduje stanja prejšnjega

## Angular vzorci v projektu

### Data binding

- Interpolacija {{ }} — prikaz imen izdelkov, cen, vrednosti filtrov
- Povezovanje lastnosti [item], [disableToggleBasket], [showRemoveButton] — posredovanje podatkov v items-details
- Povezovanje dogodkov (click), (ngSubmit) — dodajanje v košarico, oddaja obrazca
- Dvosmerno povezovanje [(ngModel)] — polja v obrazcih za prijavo in registracijo
  
### Input/Output

- @Input() — lastnosti v items-details
- @Output() z EventEmitter — basketChanged

### Strukturne in atributne direktive

- @if / @for — pogojno prikazovanje in seznami izdelkov
- ngClass — dinamični CSS razred glede na stanje košarice

### Template-driven forms

- NgForm, ngModel, spremenljivke predloge (#email="ngModel")
- Stanja veljavnosti (email.invalid, email.touched) za prikaz napak

### Angular storitve

Ločitev odgovornosti: AuthentificationService, ItemsService, BasketService

### Observables

 - Vse HTTP metode (login, signup, getItems) vračajo Observable, na katerega se komponente naročijo s next/error/complete handlerji
 - BehaviorSubject — hrani trenutno stanje filtrov v ItemsService
 - switchMap — ob spremembi filtrov ponovno pridobi izdelke iz backenda
 - tap — ob prijavi shrani JWT žeton (v AuthentificationService)

### Usmerjanje (routing)

Konfiguracija Routes:
- routerLink, router.navigate()
- AuthGuard, ki varuje poti /items, /basket, /checkout (za prijavljene uporabnike)

### JWT in interceptors

HttpInterceptorFn — vsaki zahtevi doda glavo Authorization: Bearer <token>

## Zagon projekta

### Predpogoji

- Python 3.11+
- Node.js in npm

### 1. Backend (Flask)

V terminalu:

```
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Ustvari datoteko backend/.env na podloagi datoteke backend/.env.example.

Zaženi strežnik:

```
python app.py
```

Backend teče na `http://localhost:5000`.

Baza data/shop.db je že del repozitorija.

### 2. Frontend (Angular)

V drugem terminalu:

```
cd SpletnaTrgovina
npm install
npx ng serve -o
```

Frontend teče na `http://localhost:4200`. (Preko proxy.conf.json posreduje vse `/api/...` klice na Flask backend)

## Varnost

- Gesla so shranjena kot hash.
- JWT_SECRET_KEY je shranjen v .env datoteki, ki ni del repozitorija (`.gitignore`) — vsak si ustvari svojo, po vzoru .env.example.
- Token je shranjen v localStorage na frontendu in velja 1 uro.

## TO DO

 - Dokončanje košarice (shranjevanje stanja košarice določenega uporabnika med sejami)
 - Možnost checkout - kupi (izbris izdelkov iz baze ob plačilu)
 - Varnejše shranjevanje JWT tokena (prehod iz localStorage na httpOnly cookie)
