# Descrizione use cases

### UseCase registrazione utente
   * **Sommario**
        Questo use case descrive come l'utente non autenticato effettua la registrazione nel sistema tramite form.
   * **Descrizione**
       1. L'utente anonimo, se non registrato, inserisce nome [nota1], cognome[nota1], username, email[nota2], password[nota3], conferma password[nota3] e preme sul pulsante "Registrati"[nota4] [nota5].
       2. Il sistema, tramite Gmail, manda una mail di verifica all'indirizzo specificato, premendo nel link presente nella mail viene effettuata la verifica dell'indirizzo email e visualizzato un messaggio di benvenuto.
       3. A registrazione effettuata, si può effettuare il login. 
       4. A login completato, viene visualizzata la HomePage dell'applicazione.
   * **Note**
       1. Nome e/o cognome non valido (non soddisfano la regex "[a-zA-Z0-9]"), il bordo del campo diventa rosso.
       2. Email non valida (non soddisfa la regex ".+@.+\..+"), il bordo del campo diventa rosso.
       3. Password non valida oppure le due password non sono uguali, il bordo del campo diventa rosso.
       4. Ci sono campi non compilati oppure non validi, il bordo di tali campi diventa rosso.
       5. L'email inserita è già associata ad un altro account, appare la scritta "Email inserita associata ad un altro account, inserire un'altra email".
        


### UseCase login
   * **Sommario**
        Questo use case descrive come l'utente non autenticato effettua il login nel sistema tramite form.
   * **Descrizione**
       1. L'utente anonimo, se registrato, inserisce username o email e la sua password e conferma premendo su "Accedi", oppure sceglie l'opzione "Accedi con Google" per accedere tramite il proprio accout Google[nota1] [nota2].
   * **Note**
       1. Ci sono campi non compilati, il bordo di tali campi diventa rosso.
       2. Dati inseriti non corretti, appare la scritta "Utente non presente nel sistema o password inserita errata".



### UseCase conferma email
   * **Sommario**
        Questo use case descrive come avviene la verifica dell'indirizzo email.
   * **Descrizione**
       1. Il sistema, tramite Gmail, manda una mail di verifica all'indirizzo specificato durante la registrazione, premendo sul link presente nella mail viene effettuata la verifica dell'indirizzo email e visualizzato un messaggio di benvenuto.



### UseCase recupero password
   * **Sommario**
        Questo use case descrive come avviene il recupero della password nel caso in cui l'utente se la sia dimenticata o voglia modificarla.
   * **Descrizione**
       1. L'utente clicca sul pulsante "Recupera password".
       2. L'utente inserisce la sua email[nota1] e preme su "Invia email di recupero".
       3. L'email inviata tramite Gmail permetterà all'utente di impostare una nuova password.
   * **Note**
       1. Email inserita non corretta o non associata a nessun accout, appare il messaggio "Email inserita non valida".



### UseCase visualizzazione HomePage
   * **Sommario**
        Questo use case descrive la visualizzazione della home page da parte di un utente autenticato.
   * **Descrizione**
       1. L'utente visualizza la lista delle schede che corrispondono alle varie funzionalità.
       2. L'utente può cliccare su ognuna delle schede presenti nella home page.
    


### UseCase visualizzazione profilo
   * **Sommario**
      Questo use case descrive la visualizzazione dei dati associati al proprio profilo da parte di un utente autenticato.
   * **Descrizione**
       1. L'utente autenticato visualizza le informazioni relative al proprio profilo, come username, email, foto profilo.[nota1]
   * **Note**
       1. L'utente non è tenuto a specificare una foto profilo, può lasciare l'icona generica.



### UseCase modifica profilo
   * **Sommario**
      Questo use case descrive come l'utente possa andare a modificare le informazioni associate al proprio profilo.
   * **Descrizione**
      1. L'utente modifica la foto profilo premendo sull'icona della matita e scegliendo un'immagine a suo piacimento.
      2. L'utente modifica nome e cognome premendo sull'icona della matita.
      3. L'utente preme il pulsante "Modifica profilo" se ha necessità di cambiare username, email [nota1], password [nota2] [nota3] [nota4].
   * **Note**
      1. Email non valida (non soddisfa la regex ".+@.+\..+"), il bordo del campo diventa rosso.
      2. Password non valida oppure le due password non sono uguali, il bordo del campo diventa rosso.
      3. Ci sono campi non compilati oppure non validi, il bordo di tali campi diventa rosso.
      4. L'email inserita è già associata ad un altro account, appare la scritta "Email inserita associata ad un altro account, inserire un'altra email".



### UseCase visualizzazione impostazioni
   * **Sommario**
      Questo use case descrive la visualizzazione delle impostazioni del sistema da parte di un utente autenticato.
   * **Descrizione**
      1. L'utente autenticato visualizza se le notifiche sono attivate o meno premendo sul pulsante "Notifiche".
      2. L'utente autenticato visualizza le informazioni relative a privacy e sicurezza, in particolare l'informativa sul trattamento dei dati personali e la gestione dei cookies, premendo su "Privacy e sicurezza" .
      3. L'utente autenticato visualizza la lingua impostata per il sistema premendo il pulsante "Lingua".
      4. L'utente autenticato visualizza le informazioni generali del sistema, come la versione attuale dell'applicazione e i contatti degli sviluppatori.
   
   

### UseCase gestione impostazioni
   * **Sommario**
      Questo use case descrive come l'utente autenticato effettua modifiche alle impostazioni del sistema premendo sul bottene relativo alla funzionalità/impostazione che vuole modificare.
   * **Descrizione**
      1. L'utente autenticato attiva/disattiva le notifiche.
      2. L'utente autenticato cambia la lingua scegliendo tra una lista di lingue predefinita.
      3. L'utente autenticato può modificare le sue preferenze per la gestione dei cookies.
      4. L'utente autenticato può disconnettersi in modo sicuro [nota1].
   * **Note**
      1. Il sistema visualizza un banner per permettere all'utente di confermare il logout.



### UseCase visualizzazione budget
   * **Sommario**
     Questo use case descrive la visualizzazione da parte dell'utente autenticato del proprio budget e le informazioni relative ai propri movimenti.
   * **Descrizione**
      1. L'utente autenticato visualizza una presentazione grafica delle categorie in cui ogni movimento è classificato, relativa al mese corrente.
      2. L'utente autenticato visualizza il riepilogo delle entrate e delle uscite del mese corrente.
      3. L'utente autenticato visualizza l'elenco di tutti i suoi movimenti ordinati in base a quando sono stati inseriti[nota1] e con la possibilità di essere filtrati (tutti o solo mese corrente).
      4. L'utente autenticato può cercare un determinanto movimento premendo il pulsante "Cerca" [nota2].
   * **Note**
      1. Dal più recente a quello meno recente.
      2. La ricerca viene effettuata in base al nome del movimento o delle note associate a esso. 



### UseCase visualizzazione per categoria
   * **Sommario**
       Questo use case descrive la visualizzazione da parte dell'utente autenticato del proprio budget relativo a una determinata categoria e le informazioni sui movimenti associati a tale categoria.
   * **Descrizione**
      1. L'utente autenticato, cliccando sulla categoria che desidera ispezionare, visualizza l'elenco dei movimenti associati a tale categoria [nota1] e con la possibilità di essere filtrati (tutti o solo mese corrente).
      2. L'utente autenticato può cercare un determinato movimento nella lista di movimenti della categoria desiderata con il pulsante "Cerca" [nota2].
   * **Note**
      1. Dal più recente a quello meno recente.
      2. La ricerca viene effettuata in base al nome del movimento o delle note associate a esso.



### UseCase visualizzazione entrate/uscite
   * **Sommario**
      Questo use case descrive la visualizzazione da parte dell'utente autenticato delle proprie entrate o delle proprie uscite.
   * **Descrizione**
      1. L'utente autenticato, cliccando su "Entrate" o su "Uscite", visualizza rispettivamente l'elenco dei movimenti in entrata o l'elenco dei movimenti in uscita [nota1] e con la possibilità di essere filtrati (tutti o solo mese corrente).
      2. L'utente autenticato può cercare un determinato movimento nella lista di movimenti in entrata/uscita con il pulsante "Cerca" [nota2].
   * **Note**
      1. Dal più recente a quello meno recente.
      2. La ricerca viene effettuata in base al nome del movimento o delle note associate a esso.



### UseCase gestione budget
   * **Sommario**
      Questo use case descrive come l'utente autenticato può aggiungere, rimuovere o modificare movimenti e aggiungere, rimuovere o modificare le categorie in cui i movimenti sono classificate.
   * **Descrizione**
      1. L'utente autenticato aggiunge una categoria con il bottone "+" presente nel grafico delle categorie [nota1].
      2. L'utente autenticato rimuove o modifica una categoria esistente tenendo premuta tale categoria e selezionando "Modifica" oppure "Rimuovi" [nota1].
      3. L'utente autenticato aggiunge un nuovo movimento premendo il pulsante "+" presente nell'elenco dei movimenti, oppure presente nella categoria selezionata o nella sezione "Entrate"/"Uscite" [nota2] [nota3] [nota4].
      4. L'utente autenticato rimuove o modifica un movimento esistente tenendo premuta tale categoria e selezionando "Modifica" oppure "Rimuovi" [nota2] [nota3] [nota4].
   * **Note**
      1. Nell'aggiunta o la modifica di una categoria, l'utente autenticato inserisce o modifica il nome di tale categoria.
      2. Nell'aggiunta o la modifica di un movimento, l'utente autenticato inserisce o modifica titolo, importo, tipologia (entrata o uscita), categoria (tra le categorie presenti), eventuali note.
      3. Se l'aggiunta o la modifica di un  movimento avvengono da una scheda relativa ad una categoria specifica, il campo categoria sarà pre-impostato secondo la tale categoria.
      4. Se l'aggiunta o la modifica di un movimento avvengono dalla scheda "Entrate" o dalla scheda "Uscite", il campo tipologia sarà pre-impostato secondo la tale scheda.



### UseCase visualizzazione liste
   * **Sommario**
      Questo use case descrive la visualizzazione da parte dell'utente autenticato delle proprie liste di interesse [nota1].
   * **Descrizione**
      1. L'utente autenticato visualizza l'elenco delle proprie liste.
      2. L'utente autenticato può cercare una determinata lista con il pulsante "Cerca" [nota2]. 
   * **Note**
      1. Le liste predefinite sono: lista della spesa, to_do_list e altro.
      2. La ricerca avviene secondo il nome della lista. 

   

### UseCase gestione liste
   * **Sommario**
      Questo use case descrive come l'utente autenticato può aggiungere, rimuovere o modificare liste, e per ogni lista può aggiungere, rimuovere o modificare gli elementi.
   * **Descrizione**
      1. L'utente autenticato aggiunge una lista con il bottone "+" presente nella scheda Liste [nota1].
      2. L'utente autenticato rimuove o modifica una lista esistente tenendo premuta tale lista e selezionando "Modifica" oppure "Rimuovi" [nota1].
      3. Per ogni lista, l'utente autenticato aggiunge un elemento alla lista[nota2].
      4. Per ogni lista, l'utente autenticato modifica o rimuove un elemento esestente nella lista e tenendo premuto tale elemento e selezionando "Modifica" oppure "Rimuovi" [nota2].
      5. L'utente autenticato contrassegna gli elementi della lista una volta che non ne ha più bisogno; per farlo, clicca sul box in fianco all'elemento che vuole contrassegnare[nota3].
      6. L'utente svuota la lista quando non è più interessato agli elementi in tale lista.
   * **Note**
      1. Nell'aggiunta o la modifica di una lista, l'utente autenticato inserisce o modifica il nome di tale lista.
      2. Nell'aggiunta o la modifica di un elemento di ogni lista, l'utente autenticato inserisce o modifica il nome di tale elemento.
      3. Gli elementi contrassegnati verranno barrati e sbiaditi nell'elenco degli elementi.



### UseCase visualizzazione eventi/calendario
   * **Sommario**
      Questo use case descrive la visualizzazione da parte dell'utente autenticato dei propri eventi o impegni in un calendario [nota1].
   * **Descrizione**
      1. L'utente autenticato visualizza il calendario con segnalati i propri eventi.
   * **Note**
      1. Calendario fornito da ...


### UseCase gestione eventi
   * **Sommario**
      Questo use case descrive come l'utente autenticato può aggiungere, rimuovere o modificare eventi nel calendario. 
   * **Descrizione**
      1. L'utente autenticato aggiunge un nuovo evento cliccando su un giorno del calendario[nota1] oppure con il bottone "Aggiungi evento" [nota2].
      2. L'utente autenticato modifica o rimuove un evento esistente dal calendario tenendo premuto tale elemento e selezionando "Modifica" oppure "Rimuovi" [nota2].
   * **Note**
      1. La data del giorno selezionato sarà pre-impostata nella scheda di aggiunta di un evento. 
      2. Nell'aggiunta o la modifica di un evento, l'utente autenticato inserisce o modifica titolo, eventuali note, la data, giorno e ora di inizio e fine (o se tutto il giorno contrassegna il box "Tutto il giorno").


### UseCase notifica evento
   * **Sommario**
      Questo use case descrive come l'utente autenticato attiva la notifica di un evento.
   * **Descrizione**
      1. L'utente autenticato, se desidera ricevere una notifica per ricordargli di un determinato evento, contrassegna il box "Notifica"[nota1].
   * **Note**
      1. Se contrassegnato il box, l'utente autenticato potrà anche scegliere quanto prima vuole ricevere la notifica.


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**


### UseCase login/registrazione utente
   * **Sommario**
   * **Descrizione**
   * **Note**
