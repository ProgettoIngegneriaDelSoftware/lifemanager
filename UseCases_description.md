# Descrizione use cases

### UseCase registrazione utente
    * **Sommario**
        Questo use case descrive come l'utente non autenticato effettua la registrazione nel sistema tramite form.
    * **Descrizione**
        1. L'utente anonimo, se non registrato, inserisce nome [nota1], cognome[nota1], username, email[nota2], password[nota3], conferma password[nota3] e preme sul pulsante "Registrati"[nota4][nota5].
        2. Il sistema, tramite Gmail, manda una mail di verifica all'indirizzo specificato, premendo nel link presente nella mail viene effettuata la verifica dell'indirizzo email e visualizzato un messaggio di benvenuto.
        3. A registrazione effettuata, si può effettuare il login. 
        4. A login completato, viene visualizzata la HomePage dell'applicazione.
    * **Note**
        1. Nome e/o cognome non valido (non soddisfano la regex "[a-zA-Z0-9]"), il bordo del campo diventa rosso.
        2. Email non valida (non soddisfa la regex ".+@.+\..+"), il bordo del campo diventa rosso.
        3. Password non valida oppure le due password non sono uguali, il bordo del campo diventa rosso.
        4. Ci sono campi non compilati oppure non validi, il bordo di tali campi diventa rosso.
        5. L'email inserita è già associata ad un altro account, appare la scritta "Indirizzo email già in uso".
        



### UseCase login
    * **Sommario**
        Questo use case descrive come l'utente non autenticato effettua il login nel sistema tramite form.
    * **Descrizione**
        1. L'utente anonimo, se registrato, inserisce username o email e la sua password e conferma premendo su "Accedi", oppure sceglie l'opzione "Accedi con Google" per accedere tramite il proprio accout Google[nota1][nota2].
    * **Note**
        1. Ci sono campi non compilati, il bordo di tali campi diventa rosso.
        2. Dati inseriti non corretti, appare la scritta "Utente non presente nel sistema o password inserita errata".


### UseCase comferma email
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
        1. Email non corretta o non associata a nessun accout, appare il messaggio "


### UseCase logout
    * **Sommario**
        Questo use case permette all'utente autenticato di effettuare il logout.
    * **Descrizione**
        1. L'utente accedendo alla scheda impostazioni, clicca sul pulsante "Logout".
        2. Il sistema visualizza un banner per permettere all'utente di confermare il logout.


### UseCase visualizzazione HomePage
    * **Sommario**
        Questo use case descrive la visualizzazione della home page da parte di un utente autenticato.
    * **Descrizione**
        1. L'utente visualizza la lista delle schede che corrispondono alle varie funzionalità.
        2. L'utente può cliccare su ognuna delle schede presenti nella home page.
    


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
