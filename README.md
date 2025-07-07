### Instalatie
1. Clone deze repository van Github https://github.com/abdullahazure/RealEstateCare-Abdullah met `git clone <>``.
2. `npm install`
3. `npm run dev`

## Hoe kan je de applicatie benaderen via web?
1. Doe 'npm run build' in vscode terminal
2. https://realestatecare-abdullah.web.app/

### Login
Login gaat via firebase 

| Email                         | Wachtwoord |
|-------------------------------|------------|
| abdullahfa@realestatecare.com | admin12    |
| loi@realestatecare.com        | admin123   |

De accounts in dit voorbeeld zijn volledig fictief. Ze zijn speciaal gemaakt om de functionaliteit te laten zien en verwijzen niet naar echte personen of bedrijven. 

### Data
De API-koppelingen met betrekking tot adresinformatie worden uitgevoerd via:
https://jsonbin.io/app/bins

### Profile settings
De instellingen kunnen pas gewijzigd worden nadat er eerst is opgeslagen. Het lijkt erop dat het wel wijzigt lokaal (UI), echter de app weet het nog niet. Ik heb van alles geprobeerd tevergeefs. 

### Debriefing
Zie bijlage in GitHub https://github.com/abdullahazure/RealEstateCare-Abdullah

### Verantwoording:

## Security
De loginfunctionaliteit in deze applicatie is veilig opgezet met behulp van Firebase Authentication. Wachtwoorden worden daarmee uitsluitend verwerkt op de Firebase-servers en komen niet in aanraking met de frontend. Dit voorkomt risico op interceptie of opslag van gevoelige gegevens aan de clientzijde — een bewuste keuze die aansluit bij moderne beveiligingsrichtlijnen.

Voor het opslaan en ophalen van inspectiedata wordt gebruikgemaakt van JSONBin. Daarbij maak ik gebruik van een X-Master-Key-header om de data af te schermen voor onbevoegde toegang. Omdat de inhoud alleen bedoeld is voor demonstratie en leerdoeleinden, bevat deze geen privacygevoelige informatie.

Wachtwoorden zijn dus niet zichtbaar of toegankelijk in de frontend, en externe dataopslag wordt alleen ingezet voor niet-gevoelige inhoud.

## Usability 
Bij het ontwerpen van de gebruikersinterface heb ik geprobeerd om de principes van gebruiksvriendelijkheid toe te passen waar relevant:

De app geeft directe feedback via toastmeldingen, bijvoorbeeld bij loginfouten of succesvolle offline synchronisatie. 

Navigatie is logisch opgebouwd via herkenbare knoppen en Vue Router-links
Formulieren zijn duidelijk gelabeld en bieden heldere foutboodschappen
In het dashboard wordt gebruikgemaakt van iconen én tekstlabels, wat de herkenbaarheid verhoogt. Offline acties worden automatisch hervat zodra internetverbinding terugkeert — zonder dat de gebruiker iets hoeft te doen

Deze keuzes zorgen voor een consistente, vloeiende ervaring, ook voor minder technisch onderlegde gebruikers.

## Accessibility
Toegankelijkheid is waar mogelijk meegenomen in het ontwerp van de applicatie:
Elk invoerveld in het loginformulier heeft een bijbehorende <label> gekoppeld via id

Belangrijke UI-elementen zijn voorzien van aria-labels. De dashboardlinks zijn duidelijk benoemd voor screenreaders en bevatten semantische structuur required-velden zorgen voor basisvalidatie vóór verzenden

Wat nog verbeterd zou kunnen worden:
Toetsenbordnavigatie met zichtbare focusindicator ontbreekt momenteel
Kleurcontrast is nog niet getest tegen WCAG AA-normen (zeker relevant met dark mode)

Toastcomponenten missen role="alert" of aria-live, waardoor ze nog niet perfect werken voor screenreaders.
De applicatie voldoet daarmee gedeeltelijk aan WCAG 2.1, met duidelijke aandachtspunten om verder aan te werken.

## Best Practices & Vue-stijl
De applicatie is opgebouwd op basis van zowel Vue 2- als Vue 3-componenten, wat zorgt voor een realistische en flexibele structuur. Nieuwe componenten (zoals het loginformulier) zijn opgezet met de Composition API script setup, terwijl oudere componenten ,zoals App.vue en main.js, gebruikmaken van de Options API.

Verder wordt er gewerkt met:
Vuex voor state management, inclusief het opslaan van offline inspecties
Dynamische themastijlen (main/dark mode) op basis van gebruikersvoorkeur
Externe libraries zoals axios en firebase/auth, correct geïmporteerd en toegepast
Overzichtelijke projectstructuur met mappen zoals /views, /store, /firebase, en /components

Codekwaliteit wordt consistent gehouden dankzij een vaste structuur, duidelijke naamgeving en (waar mogelijk) ondersteuning van ESLint en Prettier.

### Relfectie:
Mijn oorspronkelijke plan voor deze applicatie was simpel: 
alles bouwen met de Composition API van Vue 3. Ik wilde echt duiken in die modernere manier van werken, en voelde dat het me zou helpen om code beter te organiseren en her te gebruiken. Ik zag het helemaal zitten.
Na twee weken hard zwoegen kwam ik erachter dat het toch niet zo'n goed idee was. De applicatie begon kuren te vertonen, en ik raakte compleet het overzicht kwijt van wat er precies fout ging. Het was alsof ik verdwaald was in een doolhof van code. Gezien mijn ervaring lijkt het me ook logisch. 

Toen heb ik de knoop doorgehakt met een beetje hulp van AI: terug naar de basis. Ik heb besloten om alleen een paar componenten om te zetten naar de Composition API, en de rest gewoon met de vertrouwde Options API te laten staan. Het voelde als een nederlaag, maar het was wel de enige manier om de applicatie weer stabiel te krijgen.
Tijdens dit project heb ik ook een pijnlijke les geleerd over versiebeheer. Ik had in één keer zó veel veranderingen doorgevoerd (ik denk wel meer dan 300 aanpassingen!), dat het onmogelijk was om terug te keren naar een werkende versie toen de boel crashte. Omdat ik te weinig tussentijdse commits had gemaakt, ben ik twee keer helemaal opnieuw begonnen. Echt balen!
Het was een frustrerende ervaring, maar ik heb er wel een hoop van geleerd:

- Grote veranderingen? Doe het stap voor stap!
- Maak regelmatig commits, ook al voelt het nog niet perfect.
- En wees realistisch: wat werkt wél, en wat is te ambitieus voor nu?

Deze ervaring heeft me niet alleen technisch verder geholpen, maar ook geholpen om mijn manier van werken aan te passen. Soms moet je gewoon een stap terug doen om verder te komen.
