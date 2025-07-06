### Installation
<<<<<<< Updated upstream
1. Clone the repository from Github (https://github.com/abdullahazure/RealEstateCare-Abdullah) with `git clone <>``.
2. Install the required packages with `npm install`.
3. Start the development server with `npm run dev`

### Firebase 
1. npm run build in VScode terminal 
2. firebase deploy 

https://realestatecare-abdullah.web.app
=======
1. Clone the repository from Github https://github.com/abdullahazure/RealEstateCare-Abdullah with `git clone <>``.
2. Install the required packages with `npm install`.
3. Start the development server with `npm run dev`

4. Visit direct the application: 
https://realestatecare-abdullah.web.app/
>>>>>>> Stashed changes

### Login
Login is via firebase 

Below is a list of two user accounts that can be used to log in. Each account is identified by a unique email address and password. These accounts are provided solely for demonstration purposes:

| Email                         | Password |
|-------------------------------|----------|
| abdullahfa@realestatecare.com | admin12  |
| loi@realestatecare.com        | admin123 |

The user accounts presented in this example are entirely fictional. They have been created strictly for the purpose of demonstrating functionality, and do not correspond to any actual individuals or entities. Any resemblance to real persons, living or dead, is purely coincidental. Please ensure that any data used in real applications adheres to privacy standards and ethical guidelines.

### Data
<<<<<<< Updated upstream
API connections related to user and address information are routed through:
https://jsonbin.io/app/bins

### Store 
Making us of Composition API
=======
API connections related to address information are routed through:
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

## Usability (op basis van Jakob Nielsen’s heuristieken)
Bij het ontwerpen van de gebruikersinterface heb ik geprobeerd om de principes van gebruiksvriendelijkheid toe te passen waar relevant:

De app geeft directe feedback via toastmeldingen, bijvoorbeeld bij loginfouten of succesvolle offline synchronisatie. 

Navigatie is logisch opgebouwd via herkenbare knoppen en Vue Router-links
Formulieren zijn duidelijk gelabeld en bieden heldere foutboodschappen
In het dashboard wordt gebruikgemaakt van iconen én tekstlabels, wat de herkenbaarheid verhoogt. Offline acties worden automatisch hervat zodra internetverbinding terugkeert — zonder dat de gebruiker iets hoeft te doen

Deze keuzes zorgen voor een consistente, vloeiende ervaring, ook voor minder technisch onderlegde gebruikers.

## Accessibility (WCAG 2.1)
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
Na twee weken hard zwoegen kwam ik erachter dat het toch niet zo'n goed idee was. De applicatie begon kuren te vertonen, en ik raakte compleet het overzicht kwijt van wat er precies fout ging. Het was alsof ik verdwaald was in een doolhof van code.

Toen heb ik de knoop doorgehakt: terug naar de basis. Ik heb besloten om alleen een paar componenten om te zetten naar de Composition API, en de rest gewoon met de vertrouwde Options API te laten staan. Het voelde als een nederlaag, maar het was wel de enige manier om de applicatie weer stabiel te krijgen.
Tijdens dit project heb ik ook een pijnlijke les geleerd over versiebeheer. Ik had in één keer zó veel veranderingen doorgevoerd (ik denk wel meer dan 300 aanpassingen!), dat het onmogelijk was om terug te keren naar een werkende versie toen de boel crashte. Omdat ik te weinig tussentijdse commits had gemaakt, ben ik twee keer helemaal opnieuw begonnen. Echt balen!
Het was een frustrerende ervaring, maar ik heb er wel een hoop van geleerd:

- Grote veranderingen? Doe het stap voor stap!
- Maak regelmatig commits, ook al voelt het nog niet perfect.
- En wees realistisch: wat werkt wél, en wat is te ambitieus voor nu?

Deze ervaring heeft me niet alleen technisch verder geholpen, maar ook geholpen om mijn manier van werken aan te passen. Soms moet je gewoon een stap terug doen om verder te komen.
>>>>>>> Stashed changes
