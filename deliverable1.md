\documentclass[a4paper,12pt]{article}
 \usepackage[italian]{babel} 
\usepackage{graphicx}
\usepackage{caption}
\usepackage{geometry}
\usepackage{enumitem}
\usepackage{fancyhdr}
\geometry{a4paper, top=1.5cm, bottom=1.5cm, left=1.5cm, right=1.5cm, }
\setlength{\parindent}{0pt} %\setlength{\parskip}{0,25cm plus1mm minus1mm}
\graphicspath{ {/Users/nicola/Documents/LaTeX/} } 
\lhead{\includegraphics[width=5cm]{logounitn.jpg}}

%\fancyhead[L]{\includegraphics[width=5cm]{logounitn.jpg}}
\renewcommand{\headrulewidth}{0pt}
\raggedbottom

%-----------------------------------------
 \title{LifeManager}
 \author{
 Corso di Ingegneria del software\\ \\Luca Boschiero, Mauro Meneghello, Nicola Turniano
 }
 \begin{document} 
 \maketitle
 \thispagestyle{fancy}
 %-----------------------------------------

\subsection*{Contesto}

LifeManager è un applicazione per la gestione dei vari aspetti della vita di una persona.

\textit{Dominio applicativo}: Gestione della vita quotidiana

\textit{Problemi da risolvere}: Semplificare la gestione di vari aspetti della vita di una persona, organizzando attività quotidiane, cose da fare, informazioni, denaro.




\subsection*{Obiettivi}
\begin{itemize}
 \setlength\itemsep{0.01em}
\item \textit{ Gestione del budget personale}
\\ L'utente gestisce le entrate e le uscite, aggiungendo o rimuovendo movimenti di denaro, organizzandoli secondo categorie, visualizzando statistiche sui propri pagamenti, e ricercando una spesa precisa.
\item \textit{ Gestione degli eventi }
\\ L'utente può aggiungere o rimuovere eventi, inserendo orario, luogo, note. É possibile inoltre impostare e ricevere degli avvisi in prossimità dei propri appuntamenti.
\item \textit{ Gestione di liste }
\\ L'utente può creare varie liste a formate da voci che è possibile confermare attraverso delle caselle (to-do list).
\item \textit{ Lista della spesa}
\\ L'utente ha la possibilità di organizzare la propria lista della spesa, aggiungendo voci, quantità e note e confermandole quando sono state comprate. 
\item \textit{ Promemoria}
\\ L'utente può inserire delle voci come promemoria, eventualmente selezionando una data e un'ora per ricevere un avviso.
\item \textit{ Gestione di file personali }
\\ L'utente può caricare file sul cloud e organizzarli secondo cartelle o tag.
\item \textit{ Mappa }
\\ L'utente può cercare dei luoghi particolari visualizzandone le informazioni. L'utente, inoltre, può salvare i propri luoghi preferiti o visitati e cercare tra di essi.
\item \textit{ Gestione delle carte fedeltà}
\\ L'utente può inserire le carte fedeltà dei propri negozi preferiti. Verrà quindi visualizzato un codice a barre scannerizzabile.
\item \textit{ Gestione di ricette}
\\ L'utente può scrivere una ricetta intera specificando ingredienti e quantità, e scrivendo il procedimento.
\end{itemize}







\subsection*{Attori}
\begin{itemize}
 \setlength\itemsep{0.01em}
\item \textit{ Utenti}
\\ Utenti registrati
\item \textit{ Amministratori}
\\ Ruoli: moderatore, supporto tecnico
\item \textit{ Servizi interni}
\\ Database
\item \textit{ Servizi esterni}
\\ Servizi di autenticazione, notifiche via mail, geolocalizzazione, mappe, calendario, traduttore di codici a barre, cloud

\end{itemize}

\subsection*{User stories}
\begin{list}{-}
\item \textbf{US1}


Come utente, voglio potermi registrare o accedere con le mie credenziali personali oppure con Google. Inoltre, se mi dimentico la password voglio poterla recuperare facilmente.
\begin{description}
\item[RF1] L'applicazione deve permettere all'utente di registrarsi e accedere in modo facile e sicuro.
\item[RF2] L'applicazione deve supportare l'accesso o la registrazione con Google.
\item[RF3] L'applicazione deve permettere di recuperare la password se l'utente lo richiede.
\end{description}

\item Qualcos'altro

\end{list}





%----


\subsection*{Requisiti}

L’utente deve poter registrarsi o fare il log in. Ad accesso avvenuto viene mostrato il menu:

- Gestione del budget personale:

É mostrata una sezione in cui l’utente può aggiungere o rimuovere spese che ha effettuato e visualizzare il saldo, cercare delle spese precise, categorizzare le spese.

- Gestione degli eventi:

Viene visualizzata una schermata calendario in cui l’utente può inserire eventi. Per ogni evento l’utente potrà… 

- Gestione di liste (todo):

L’utente può creare varie liste in cui può aggiungere o rimuovere voci (checkbox). 

- Lista della spesa:

L’utente può scrivere la lista della spesa (descrizione, quantità, note).

L’utente può collegare una lista con il budget e ricette.

- Gestione di file personali (es. drive):

L’utente può aggiungere, rimuovere, organizzare secondo tag o cartelle, o condividere i propri file.

- Mappa (luoghi visitati, con segnalibri):

Viene visualizzata una mappa (es maps) in cui l’utente può salvare i propri luoghi e organizzarli secondo tags.

- Gestione delle carte fedeltà:

L’utente può salvare le proprie carte fedeltà che verranno mostrate attraverso un codice a barre.

- Gestione di ricette

L’utente può scrivere una ricetta: ingredienti e procedimento.

L’utente aggiungere la lista degli ingredienti alla lista della spesa.

L’utente può amministrare il suo profilo.






%-----------------------------------------
 \end{document}
