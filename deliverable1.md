# LifeManager

## Corso di Ingegneria del software

### Luca Boschiero, Mauro Meneghello, Nicola Turniano

LifeManager è un applicazione per la gestione dei vari aspetti della vita di una persona.

**Dominio applicativo:** Gestione della vita quotidiana

**Problemi da risolvere:** Semplificare la gestione di vari aspetti della vita di una persona, organizzando attività quotidiane, cose da fare, informazioni, denaro.


### Obiettivi

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
   Come utente, voglio potermi registrare o accedere con le mie credenziali personali oppure con Google. Inoltre, se mi dimentico la password voglio poterla recuperare facilmente.
   * RF1: L'applicazione deve permettere all'utente di registrarsi e accedere in modo facile e sicuro.
   * RF2: L'applicazione deve supportare l'accesso o la registrazione con Google.
   * RF3: L'applicazione deve permettere di recuperare la password se l'utente lo richiede.
   * RF4: L'applicazione deve chiedere all'utente se vuole salvare la propria password per ricordare i dati di autenticazione senza costringere l'utente a fare il login ogni volta.
 * **US2**
   Come utente, voglio poter visualizzare tutte le funzionalità nella home page sotto forma di menù iniziale, e cliccando sull'icona di ogni funzionalità entrare nella scheda corrispondente. Inoltre voglio avere due pulsanti che mi permettono di entrare nella scheda impostazioni e in quella dove amministro il mio profilo.
   * RF1: L'applicazione deve essere in grado di mostrare la home page organizzata per funzionalità.
   * RF2: L'applicazione deve permettere di entrare sulla scheda relativa ad ogni funzione quando cliccate.
   * RF3: L'applicazione deve permettere di visualizzare e accedere alla sezione impostazioni e profilo.
 * **US3**
   Come utente, voglio poter aggiungere o rimuovere entrate e uscite, categorizzarle, visualizzare il saldo e ricercare una o un insieme di spese.
   * RF1: L'applicazione deve permettere di inserire, rimuovere e modificare una spesa.
   * RF2: L'applicazione deve permettere di assegnare una categoria a ciascun movimento.
   * RF3: L'applicazione deve permettere di visualizzare i movimenti in un dato periodo.
   * RF4: L'applicazione deve permettere di ricercare una precisa spesa.
   * RF5: L'applicazione deve permettere di visualizzare graficamente il saldo delle varie categorie e, cliccando su una specifica categoria, visualizzare le spese associate a tale classe.
 * **US4**
   Come utente, voglio poter visualizzare un calendario in cui posso aggiungere, rimuovere, modificare eventi. Voglio anche che, su richiesta, mi arrivi un avviso via mail in un tempo che posso definire. 
   * RF1: L'applicazione deve permettere di inserire, rimuovere e modificare un evento e le sue caratteristiche.
   * RF2: L'applicazione deve inviare all'utente una mail per ricordargli l'evento.
   * RF3: L'applicazione deve poter mostrare gli eventi in un calendario.
   * RF4: L'applicazione deve permettere all'utente di ricercare un evento specifico. 
 * **US5**
   Come utente, voglio poter salvare e amministrare le mie carte fedeltà e, in  negozio, mostrare il codice a barre alla cassiera.
   * RF1 L'applicazione deve permettere di inserire, rimuovere e modificare una carta fedeltà.
   * RF2: L'applicazione deve mostrare tutte le carte fedeltà anche sotto forma di codice a barre leggibile.
   * RF3: L'applicazione deve permettere all'utente di ricercare una precisa carta.
 * **US6**
   Come utente, voglio poter salvare e amministrare i luoghi cui sono stato o che voglio visitare, anche con la propria posizione.
   * RF1: L'applicazione deve permettere di inserire, rimuovere e modificare un luogo.
   * RF2: L'applicazione deve mostrare una mappa con dei segnalibri sui luoghi salvati.
   * RF3: L'applicazione deve permettere all'utente di ricercare un luogo.
   * RF4: L'applicazione deve permettere di poter salvare la propria posizione

