# LifeManager

## Corso di Ingegneria del software

### Luca Boschiero, Mauro Meneghello, Nicola Turniano

LifeManager è un applicazione per la gestione dei vari aspetti della vita di una persona.

**Dominio applicativo:** Gestione della vita quotidiana

**Problemi da risolvere:** Semplificare la gestione di vari aspetti della vita di una persona, organizzando attività quotidiane, cose da fare, informazioni, denaro.


### 1. Obiettivi
  * **Gestione del budget personale**
    L'utente gestisce le entrate e le uscite, aggiungendo o rimuovendo movimenti di denaro, organizzandoli secondo categorie, visualizzando statistiche sui propri         pagamenti, e ricercando una spesa precisa.
  * **Gestione degli eventi**
    L'utente può aggiungere o rimuovere eventi, inserendo orario, luogo, note. É possibile inoltre impostare e ricevere degli avvisi in prossimità dei propri           appuntamenti.
  * **Gestione di liste**
    L'utente può creare varie liste a formate da voci che è possibile confermare attraverso delle caselle (to-do list).
  * **Lista della spesa**
    L'utente ha la possibilità di organizzare la propria lista della spesa, aggiungendo voci, quantità e note e confermandole quando sono state comprate. 
  * **Promemoria**
    L'utente può inserire delle voci come promemoria, eventualmente selezionando una data e un'ora per ricevere un avviso.
  * **Gestione di file personali**
    L'utente può caricare file sul cloud e organizzarli secondo cartelle o tag.
  * **Mappa**
    L'utente può cercare dei luoghi particolari visualizzandone le informazioni. L'utente, inoltre, può salvare i propri luoghi preferiti o visitati e cercare tra di essi.
  * **Gestione delle carte fedeltà**
    L'utente può inserire le carte fedeltà dei propri negozi preferiti. Verrà quindi visualizzato un codice a barre scannerizzabile.
  * **Gestione di ricette**
    L'utente può scrivere una ricetta intera specificando ingredienti e quantità, e scrivendo il procedimento.

### Attori

  * **Utenti**
    Utenti registrati
  * **Amministratori**
    Ruoli: moderatore, supporto tecnico
  * **Servizi interni**
    Database
  * **Servizi esterni**
    Servizi di autenticazione, notifiche via mail, geolocalizzazione, mappe, calendario, traduttore di codici a barre, cloud

### User stories
 * **US1**
   Come utente non registrato (anonimo), voglio potermi registrare al sistema inserendo: nome, cognome, username, email e password, in modo da poter accedere all'applicazione. É inoltre accettata la registrazione tramite Google. ([RF1](#RF1), [RNF1](#RNF1))
   
 * **US2**
   Come utente registrato, voglio poter accedere inserendo le mie credenziali: username o email e password oppure tramite Google, in modo da poter utilizzare le funzionalità dell'applicazione. Se dimentico la password voglio poterla recuperare facilmente ricevendo una mail e resettando la password. ([RF2](#RF2),[RNF1](#RNF1), [RNF2](#RNF2), [RNF3](#RNF3))
   
 * **US3** 
   Come utente autenticato, voglio poter visualizzare tutte le funzionalità nella home page sotto forma di menù iniziale, e cliccando sull'icona di ogni funzionalità accedere alla scheda corrispondente, in modo da poter accedere alle task in modo semplice ed intuitivo. Inoltre dalla home page voglio avere due icone che mi permettono di entrare nella scheda impostazioni e in quella dove amministro il mio profilo. ([RF3](#RF3), [RF4](#RF4), [RNF3](#RF3), [RNF4](#RNF4))
 
 * **US4**
   Come utente autenticato, voglio poter aggiungere o rimuovere le mie entrate e le uscite, visualizzare il saldo totale e ricercare una o un insieme di spese, in modo da tenere sotto controllo tutti i miei movimenti e visualizzare il saldo aggiornato. Inoltre voglio poter accedere in modo veloce all'insieme delle bollette e delle spese attraverso un bottone. Infine voglio poter creare delle categorie e assegnare a ciascun movimento una categoria specifica. ([RF3](#RF6), [RF5](#RF5), [RF6](#RF6),[RF7](#RF7),[RF8](#RF8))
   
 * **US5**
   Come utente autenticato, voglio poter visualizzare un calendario in cui posso aggiungere, rimuovere, modificare eventi. Voglio anche che, su richiesta, mi arrivi un avviso via mail in un tempo che posso definire. L'evento può avere un'inizio e una fine precisa o può essere giornaliero. Per ogni evento, inoltre, voglio poter aggiungere delle note. ([RF9](#RF9), [RF10](#RF10), [RF11](#RF11),[RF12](#RF12))
   
 * **US6**
   Come utente autenticato, voglio poter salvare e amministrare le mie carte fedeltà e, in negozio, mostrare il codice a barre alla cassiera cliccando sul nome della tessera. ([RF13](#RF13), [RF14](#RF14), [RF15](#RF15))
      
 * **US7**
   Come utente autenticato, voglio poter salvare e gestire i luoghi cui sono stato o che voglio visitare, anche con la propria posizione. Voglio poter categorizzare tutti i luoghi in modo da, ad esempio, capire quali ho già visitiato e quali no. ([RF16](#RF16), [RF17](#RF17), [RF18](#RF18), [RF19](#RF19))
   
 * **US8**
   Come utente autenticato, voglio poter salvare e amministrare le mie ricette, inserendo i vari ingredienti e le rispettive quantità e descrivendo i passaggi. Voglio inoltre aggiungere tutti gli ingredienti di una specifica ricetta alla lista della spesa attraverso un bottone, senza dover trascriverli. ([RF20](#RF20), [RF21](#RF21), [RF22](#RF22), [RF23](#RF23))
   
 * **US9**
   Come utente autenticato, voglio poter visualizzare, aggiugnere, modificare delle liste, come la lista della spesa e la to-do list. In ogni lista, voglio poter segnare (validare) attraverso una checkbox ogni elemento. ([RF24](#RF24), [RF25](#RF25), [RF26](#RF26), [RF27](#RF27))
   
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
* **RF6**
  L'applicazione deve permettere a un utente autenticato di visualizzare un elenco di movimenti in entrata e uscita, ordinati dal più recente al meno recente, e di scegliere se visualizzare tutti i movimenti o solamente quelli del mese corrente. L'applciazione deve permettere una visualizzazione grafica del saldo delle varie categorie([RF8](#RF8)) e un resoconto di entrare e uscite del mese corrente.


<a name=RF6></a>
* **RF7**
  L'applicazione deve permettere a un utente autenticato di aggiungere un movimento inserendo l'importo, la tipologia (se è un'entrata o un'uscita), la categoria ([RF8](#RF8)) e delle eventuali note associate. L'applicazione deve consentire di rimuovere o modificare un movimento.

<a name=RF7></a>
* **RF8**
  L'applicazione deve permettere a un utente autenticato di associare una categoria ad ogni movimento, di visualizzare tutti i movimenti associati ad ogni categoria, ordinati dal più recente al meno recente, e di scegliere se visualizzare tutti i movimenti o solo quelli del mese corrente.

<a name=RF8></a>
* **RF9**
  L'aplicazione deve permettere a un utente autenticato di cercare uno specifico movimento, tramite la barra di ricerca, inserendo il titolo del movimento o le note associate.

<a name=RF9></a>
* **RF11**
  L'applicazione deve mostrare a un utente autenticato un calendario, in cui sono mostrati gli eventi nei giorni associati.

<a name=RF10></a>
* **RF12**
  L'applicazione deve permettere a un utente autenticato di aggiungere un nuovo evento cliccando sul tasto "aggiungi evento" inserendo il titolo, le note, la data, l'ora di inizio e l'ora di fine e se si vuole ricevere una notifica via mail([RF13](#RF13)). L'applicazione deve consentire l'opzione "tutto il giorno", infatti spuntando la casella l'evento sarà assegnato a tutto il giorno corrispondente, e l'eliminazione o la modifica dell'evento.

<a name=RF11></a>
* **RF13**
  L'applicazione deve inviare una mail all'utente per ricordargli l'evento. La mail sarà mandata all'indirizzo email fornito dall'utente in fase di registrazione.

<a name=RF12></a>
* **RF14**
  L'applicazione deve permettere a un utente autenticato di ricercare uno specifico evento tramite la barra di ricerca inserendo il titolo dell'evento.

<a name=RF13></a>
* **RF15**
  L'applicazione deve mostrare a un utente autenticato un elenco di tutte le carte fedetlà inserite, in cui viene mostrato il nome della carta.

<a name=RF14></a>
* **RF16**
  L'aplicazione deve permettere a un utente autenticato di inserire una nuova carta fedeltà inserendo il nome e il numero della carte. L'applicazione deve creare poi il codice a barre corrispondente al numero fornito.

<a name=RF15></a>
* **RF17**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica carta tramite la barra di ricerca, inserendo il nome.

<a name=RF16></a>
* **RF18**
  L'applicazione deve mostrare a un utente autenticato una mappa con dei segnalibri sui luoghi salvati dall'utente e un elenco con tutti i luoghi salvati, ordinati dal più recente al meno recente.

<a name=RF17></a>
* **RF19**
  L'applicazione deve permettere a un utente autenticato di aggiungere un luogo inserendo l'indirizzo, la città e può essere assegnato una categoria. L'applicazione deve consentire l'eliminazione o la modifica di un luogo.

<a name=RF18></a>
* **RF20**
  L'applicazione deve permettere a un utente autenticato di ricercare uno specifico luogo tramite la barra di ricera, inserendo il nome.

<a name=RF19></a>
* **RF21**
  L'applicazione deve permettere la localizzazione di un utente autenticato e salvarne la posizione.

<a name=RF20></a>
* **RF22**
  L'applicazione deve mostrare a un utente autenticato una lista delle ricette inserite.

<a name=RF21></a>
* **RF23**
  L'applicazione deve permettere a un utente autenticato di aggiugnere una ricetta inserendo il titolo, gli ingredienti necessari e il procedimento. L'applicazione deve consentire l'eliminazione e la modifica di una ricetta.

<a name=RF22></a>
* **RF24**
  L'applicazione deve permettere a un utente autenticato di aggiugnere gli ingredienti necessari per una ricetta alla lista della spesa.

<a name=RF23></a>
* **RF25**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica ricetta tramite la barra di ricerca, inserendo il titolo.

<a name=RF24></a>
* **RF26**
  L'applicazione deve mostrare a un utente autenticato le liste salvate.

<a name=RF25></a>
* **RF27**
  L'applicazione deve permettere a un utente autenticato di aggiungere una lista, inserendo il nome, e di modificare o rimuovere una lista.

<a name=RF26></a>
* **RF28**
  L'applicazione deve permettere a un utente autenticato di aggiugnere, rimuovere le voci all'interno di una lista. Le voci sono affiancate da una checkbox che può essere spuntata.

<a name=RF27></a>
* **RF29**
  L'applicazione deve permettere a un utente autenticato di ricercare una specifica lista.


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
    *Un utente deve essere in grado di registrarsi e di imparare ad usare le diverse funzionalità in modo autonomo.
