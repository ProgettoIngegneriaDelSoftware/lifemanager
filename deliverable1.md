# LifeManager

## Corso di Ingegneria del software - Luca Boschiero, Mauro Meneghello, Nicola Turniano

### Dominio e obiettivi del progetto
Questo progetto ha come obiettivo lo sviluppo di una WebApp per gestire i vari aspetti relativi alla vita quotidiana di una persona. L'applicazione, denominata LifeManager, infatti permetterà ad un individuo di semplificare molti aspetti della propria routine, organizzando e gestendo attività quotidiane, cose da fare, informazioni e denaro. Questa semplificazione si basa sull'esigenza di avere tutto ciò racchiuso in un unico servizio e facilmente accessibile in ogni momento della giornata, differenziandosi dalle applicazioni presenti attualmente sul mercato.

Più in dettaglio, il sistema deve essere in grado di:
  
  1. **Gestire registrazione e autenticazione di un individuo**
     Il sistema permette ad un utente di registrarsi e, dopo aver effettuato l'accesso, di procedere all'utilizzo dell'applicativo
  2. **Gestire del budget personale**
    Il software permette all'utente di gestisce le proprie entrate e le uscite, aggiungendo o rimuovendo movimenti di denaro, organizzandoli secondo categorie, visualizzando statistiche sui propri pagamenti, ricercando una spesa precisa consentendo così di monitorare i propri movimenti.
  3. **Gestire gli eventi**
    L'utente visualizza un calendario in cui può aggiungere eventi o promemoria e gestirli in modo personalizzato, impostando avvisi che verranno ricevuti in prossimità degli appuntamenti.
  4. **Gestire le liste di interesse**
    Il sistema permette all'utente di creare e organizzare varie liste le cui voci si possono contrassegnare attraverso delle checkbox. Aclune liste sono già preimpostate: lista della spesa e la to-do list.
  5. **Gestire i luoghi di interesse**
    Il sistema permette all'utente di cercare dei luoghi particolari visualizzandone le informazioni attraverso una mappa e salvarli come preferiti, visitati o da visitare, aggiungendo anche note e categorie, e cercare tra di essi.
  6. **Gestire le carte fedeltà**
    L'utente inseririsce le prorie carte fedeltà fornite dai negozi e, quando necessario, visualizza il codice a barre facilmente scannerizzabile.
  7. **Gestire le ricette**
    Il sistema permette all'utente di scrivere e memorizzare ricette specificandone tutti i dettagli, ingredienti e procedimento, e aggiungere facilmente tutti o alcuni degli ingredienti della ricetta alla propria lista della spesa.

### Attori

  * **Utenti**
    Utenti non autenticati e utenti autenticati.
  * **Amministratori**
    Ruoli: moderatore, supporto tecnico.
  * **Servizi interni**
    Database
  * **Servizi esterni**
    Servizi di autenticazione, notifiche via mail, geolocalizzazione, mappe, calendario, traduttore di codici a barre, cloud
    
### Analisi SWOT
  1. **Punti di forza**
      * Interesse da parte del pubblico a causa della mancanza di un'unica applicazione di questo tipo.
      * Aumenta l'organizzazione e permette di risparmiare tempo. 
      * User interface facile e intuitiva che facilita l'organizzazione.
      * Avere tutto insieme.
      * Migliorare le abitudini e la routine quotidiana grazie a promemoria e avvisi.
    
  2. **Punti di debolezza**
      * Molte persone potrebbero preferire i metodi "classici", non aprendosi al "nuovo".
      * Template troppo rigidi (alle persone potrebbe non andare bene come vengoro organizzati i propri dati).
      * Funzionalità già esistenti nel telefono (ma non congiuntamente).
      * Mancanza di esperienza del team.
      * Alcune fascie di età (over 60) sono poco propense alla digitalizzazione e informatizzazione.

  3. **Opportunità**
      * Espansione da uno a più individui sincronizzati per gestire famiglie e/o gruppi.
      * Aumento delle persone che potrebbe essere interessate conseguentemente al maggiore utilizzo delle tecnologie e di Internet.
      * Statistiche che permettono all'utente di prendere atto delle proprie abitudini.

  4. **Minacce**
      * Possibile concorrenza.
      * Possibile assenza di Internet.
      * Possibile dipendenza dal sistema, che porta al dimenticarsi di come si faceva prima.
      * Errori o malfunzionamenti dell'app che potrebbero compromettere l'utilizzo e causare malcontento.
    

### User stories
 * **US1**
   Come utente non registrato (anonimo), voglio potermi registrare al sistema inserendo: nome, cognome, username, email e password, in modo da poter accedere all'applicazione. É inoltre accettata la registrazione tramite Google. ([RF1](#RF1), [RNF1](#RNF1))
   
 * **US2**
   Come utente registrato, voglio poter accedere inserendo le mie credenziali: username o email e password oppure tramite Google, in modo da poter utilizzare le funzionalità dell'applicazione. Se dimentico la password voglio poterla recuperare facilmente ricevendo una mail e resettando la password. ([RF2](#RF2),[RNF1](#RNF1), [RNF2](#RNF2), [RNF3](#RNF3))
   
 * **US3** 
   Come utente autenticato, voglio poter visualizzare tutte le funzionalità nella home page sotto forma di menù iniziale, e cliccando sull'icona di ogni funzionalità accedere alla scheda corrispondente, in modo da poter accedere alle task in modo semplice ed intuitivo. Inoltre dalla home page voglio avere due icone che mi permettono di entrare nella scheda impostazioni e in quella profilo in modo da poterle visualizzare e gestire facilmente. ([RF3](#RF3), [RF4](#RF4), [RNF3](#RF3), [RNF4](#RNF4))
 
 * **US4**
   Come utente autenticato, voglio poter aggiungere o rimuovere le mie entrate e uscite, visualizzare il saldo totale e ricercare una o un insieme di spese, in modo da tenere sotto controllo tutti i miei movimenti e visualizzare il saldo aggiornato. Inoltre voglio poter creare e accedere in modo veloce alle categorie in cui i movimenti sono classificati attraverso un bottone, in modo da visualizzare e gestire i movimenti categoria per categoria. ([RF3](#RF6), [RF5](#RF5), [RF6](#RF6),[RF7](#RF7),[RF8](#RF8))
   
 * **US5**
  Come utente autenticato, voglio poter visualizzare un calendario in cui posso aggiungere, rimuovere, modificare eventi. Voglio anche che, su richiesta, mi arrivi un avviso via mail in un tempo che posso definire in modo da ricordarmi della ricorrenza desiderata. L'evento può avere un'inizio e una fine precisa o può essere giornaliero. Per ogni evento, inoltre, voglio poter aggiungere delle note. ([RF9](#RF9), [RF10](#RF10), [RF11](#RF11),[RF12](#RF12))
   
 * **US6**
   Come utente autenticato, voglio poter salvare e amministrare le mie carte fedeltà in modo da poter mostrare il codice a barre al negozio cliccando sul nome della tessera. ([RF13](#RF13), [RF14](#RF14), [RF15](#RF15))
      
 * **US7**
   Come utente autenticato, voglio poter salvare e gestire i luoghi cui sono stato o che voglio visitare, anche con la propria posizione. Voglio poter categorizzare tutti i luoghi in modo da capire, ad esempio, quali ho già visitiato e quali no. ([RF16](#RF16), [RF17](#RF17), [RF18](#RF18), [RF19](#RF19))
   
 * **US8**
   Come utente autenticato, voglio poter salvare e amministrare le mie ricette, inserendo i vari ingredienti e le rispettive quantità e descrivendo i passaggi per la preparazione, in modo da averle sempre a disposizione. Voglio inoltre aggiungere tutti o alcuni degli ingredienti di una specifica ricetta direttamente alla lista della spesa attraverso un bottone, senza dover trascriverli. ([RF20](#RF20), [RF21](#RF21), [RF22](#RF22), [RF23](#RF23))
   
 * **US9**
   Come utente autenticato, voglio poter visualizzare, aggiugnere, modificare delle liste, come per esempio la lista della spesa e la to-do list. In ogni lista, voglio poter contrassegnare attraverso una checkbox ogni elemento in modo da evidenziare che di quell'elemento non ho più bisogno. ([RF24](#RF24), [RF25](#RF25), [RF26](#RF26), [RF27](#RF27))
   
### 2. Requisiti Funzionali
<a name=RF1></a>
 * **RF1**
   L'applicazione deve permettere a un utente non registrato di registrarsi inserendo in un form: nome, cognome, username, email, password, la quale viene richiesta due volte per evitare errori di inserimento. Una volta completata la registrazione viene inviata una email di benvenuto contenente un link per confermare l'indirizzo email.

<a name=RF2></a>
* **RF2**
  L'applicazione deve permettere a un utente registrato di poter accedere al sistema inserendo username o email e password forniti in fase di registrazione.

<a name=RF3></a>
* **RF3**
  L'applicazione deve permettere a un utente autenticato la visualizzazione di un menù iniziale dove sono visibili tutte le funzionalità. Le funzionalità presenti sono: gestione budget, liste, eventi, ricette, mappa e carte fedeltà.

<a name=RF4></a>
* **RF4**
  L'applicazione deve permettere a un utente autenticato di entrare nella scheda relativa ad ogni funzione quando viene cliccata nel menù iniziale.

<a name=RF5></a>
* **RF5**
  L'applicazione deve permettere a un utente autenticato di visualizzare un elenco di movimenti in entrata e uscita, ordinati dal più recente al meno recente, e di scegliere se visualizzare tutti i movimenti o solamente quelli del mese corrente. L'applciazione deve permettere una visualizzazione grafica del saldo delle varie categorie([RF8](#RF8)) e un resoconto di entrare e uscite del mese corrente.


<a name=RF6></a>
* **RF6**
  L'applicazione deve permettere a un utente autenticato di aggiungere un movimento inserendo l'importo, la tipologia (se è un'entrata o un'uscita), la categoria ([RF8](#RF8)) e delle eventuali note associate. L'applicazione deve consentire di rimuovere o modificare un movimento.

<a name=RF7></a>
* **RF7**
  L'applicazione deve permettere a un utente autenticato di associare una categoria ad ogni movimento, di visualizzare tutti i movimenti associati ad ogni categoria, ordinati dal più recente al meno recente, e di scegliere se visualizzare tutti i movimenti o solo quelli del mese corrente.

<a name=RF8></a>
* **RF8**
  L'aplicazione deve permettere a un utente autenticato di cercare uno specifico movimento, secondo il titolo del movimento o le note associate.

<a name=RF9></a>
* **RF9**
  L'applicazione deve mostrare a un utente autenticato un calendario, in cui sono mostrati gli eventi nei giorni associati.

<a name=RF10></a>
* **RF10**
  L'applicazione deve permettere a un utente autenticato di aggiungere un nuovo evento cliccando sul tasto "aggiungi evento" inserendo il titolo, le note, la data, l'ora di inizio e l'ora di fine e se si vuole ricevere una notifica via mail([RF13](#RF13)). L'applicazione deve consentire l'opzione "tutto il giorno", infatti spuntando la casella l'evento sarà assegnato a tutto il giorno corrispondente, e l'eliminazione o la modifica dell'evento.

<a name=RF11></a>
* **RF11**
  L'applicazione deve inviare una mail all'utente per ricordargli l'evento. La mail sarà mandata all'indirizzo email fornito dall'utente in fase di registrazione.

<a name=RF12></a>
* **RF12**
  L'applicazione deve permettere a un utente autenticato di ricercare uno specifico evento secondo il titolo dell'evento.

<a name=RF13></a>
* **RF13**
  L'applicazione deve mostrare a un utente autenticato un elenco di tutte le carte fedetlà inserite, in cui viene mostrato il nome della carta.

<a name=RF14></a>
* **RF14**
  L'aplicazione deve permettere a un utente autenticato di inserire una nuova carta fedeltà inserendo il nome e il numero della carte. L'applicazione deve creare poi il codice a barre corrispondente al numero fornito.

<a name=RF15></a>
* **RF15**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica carta secondo il nome.

<a name=RF16></a>
* **RF16**
  L'applicazione deve mostrare a un utente autenticato una mappa con dei segnalibri sui luoghi salvati dall'utente e un elenco con tutti i luoghi salvati, ordinati dal più recente al meno recente.

<a name=RF17></a>
* **RF17**
  L'applicazione deve permettere a un utente autenticato di aggiungere un luogo inserendo l'indirizzo, la città e può essere assegnato una categoria. L'applicazione deve consentire l'eliminazione o la modifica di un luogo.

<a name=RF18></a>
* **RF18**
  L'applicazione deve permettere a un utente autenticato di ricercare uno specifico luogo tramite la barra di ricera, inserendo il nome.

<a name=RF19></a>
* **RF19**
  L'applicazione deve permettere la localizzazione di un utente autenticato e salvarne la posizione.

<a name=RF20></a>
* **RF20**
  L'applicazione deve mostrare a un utente autenticato una lista delle ricette inserite.

<a name=RF21></a>
* **RF21**
  L'applicazione deve permettere a un utente autenticato di aggiugnere una ricetta inserendo il titolo, gli ingredienti necessari e il procedimento. L'applicazione deve consentire l'eliminazione e la modifica di una ricetta.

<a name=RF22></a>
* **RF22**
  L'applicazione deve permettere a un utente autenticato di aggiugnere gli ingredienti necessari per una ricetta alla lista della spesa.

<a name=RF23></a>
* **RF23**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica ricetta secondo il titolo.

<a name=RF24></a>
* **RF24**
  L'applicazione deve mostrare a un utente autenticato le liste salvate.

<a name=RF25></a>
* **RF25**
  L'applicazione deve permettere a un utente autenticato di aggiungere una lista, inserendo il nome, e di modificare o rimuovere una lista.

<a name=RF26></a>
* **RF26**
  L'applicazione deve permettere a un utente autenticato di aggiugnere, rimuovere le voci all'interno di una lista. Le voci sono affiancate da una checkbox che può essere spuntata.

<a name=RF27></a>
* **RF27**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica lista secondo il nome.


### 3. Requisiti Non Funzionali
  
  <a name=RNF1></a>
  * **RNF1**
    L'applicazione deve supportare l'accesso o la registrazione con Google.

  <a name=RNF2></a>
  * **RNF2**
    L'applicazione deve permette di recuperare la password se l'utente lo richiede, tramite l'invio di una mail in cui c'è un link per impostare una nuova password.

  <a name=RNF3></a>
  * **RNF3**
    L'applicazione deve richiedere all'utente se vuole salvare la propria password per ricordare i dati di autenticazione per fare in modo che non debba fare il login ad ogni accesso.

  <a name=RF4></a>
  * **RF5**
  L'applicazione deve permettere a un utente autenticato di entrare nella scheda impostazioni dalla pagina iniziale, dove l'applicazione deve consentire la gestione delle notifiche, la consultazione dell'informativa sulla privacy, la modifca della lingua dell'applicazione, la visualizzazione delle informazioni sugli sviluppatori e sulla versione attuale e infine la disconnessione. Disconnettendosi l'applicazione reindirizza l'utente nella pagina di login.

  <a name=RF5></a>
  * **RF5**
  L'applicazione deve permettere a un utente autenticato di entrare scheda profilo dalla pagina iniziale, dove l'applicazione deve consentire la visualizzazione della propria foto profilo, il nome e cognome, l'username e la mail e permette la modifica di queste informazioni oltre che della password.

  <a name=RNF6></a>
  * **RNF4**
    L'applicazione deve rispettare il regolamento europeo 2016/679 conosciuto come GDPR, il regolamento generale sulla protezione dei dati.
  
  <a name=RNF7></a>
  * **RNF7**
    * La trasmissione dei dati deve avvenire in modo sicuro
    * L'applicazione non accetta password troppo deboli
    * Le password non sono salvate in chiaro

  <a name=RNF8></a>
  * **RNF8**
    Un utente deve essere in grado di registrarsi e di imparare ad usare le diverse funzionalità in modo autonomo.
