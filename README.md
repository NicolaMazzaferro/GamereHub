# React Masterclass Progetto Finale
## AulabGamerHub - Project Plan

- [Pre-requisiti](#pre-requisiti-progetto)
- [Descrizione](#descrizione)
- [API](#api)
- [Styling Solution o Component Library](#styling-solution-o-component-library)
- [Pages](#pages)
- [API + User Interaction](#api--user-interaction)
- [Deployment](#deployment)

## Pre requisiti progetto

Per questo progetto, utilizzerai tutto ciò che hai imparato in questo corso per creare una SPA React che:
* [x] Ha almeno 4 pagine
* [x] Si integra con una web API esterna
* [x] Effettua richieste API in risposta alle interazioni dell'utente
* [x] Condivide i dati all'interno dell'applicazione utilizzando l'API Context o ogni altra Global state management libraries a scelta
* [x] Utilizza una soluzione di styling o una libreria di componenti a scelta
* [x] Utilizza un Backend as a Service (BaaS) per autenticare utenti e salvare dati per gli utenti. 
* [x] Viene distribuito sul Web

## Descrizione

Piattaforma che mostra videogiochi, e da la possibilitá ai suoi utenti autenticati di comunicare tra di loro, scegliere i giochi migliori/preferiti e lasciare reviews su quelli più usati. 

## API

* [API Rawg.io](https://rawg.io/apidocs)
  * [x] Supports CORS
  * [x] Requires an API Key
* [Service-BaaS-supabase](https://supabase.com/)

## Styling Solution o Component Library

* [MaterialUI](https://mui.com/) 

## Pages 

* [x] Home Page - Lista dei giochi disponibili e ricerca tra i giochi
* [x] Filter Page - Lista dei giochi secondo un filtro specifico 
* [x] Single Game Page - Mostra dettagli sullo specifico gioco
    * [x] Se autenticato utente puó selezionarlo tra i preferiti e puo lasciare un commento sul gioco. 
* [x] Login Page - Possibilitá di autenticazione ( email, OAuth ( discord ) )
* [x] Register Page - Possibilitá di registrare Utente con Email
* [x] Account Page - Dettaglio profilo Utente, Mostra dati utente autenticato
* [x] Settings Page - Aggiornamento profilo Utente

## API + User Interaction

* [x] Utenti possono cercare un gioco con una query
* [x] Utenti possono cliccare su un gioco per vederne il dettaglio e eventuali reviews 
* [x] Utenti possono filtrare su un gioco basandosi su un parametro
* [x] Utenti loggati possono caricare informazioni profilo ( nome, cognome, avatar, username, ecc... )
* [x] Utenti loggati possono lasciare una review su un gioco specifico
* [x] Utenti loggati creare una lista di giochi preferiti 
* [x] Utenti loggati possono rimuovere un gioco dai preferiti 
* [x] Uteni loggati possono chattare live su un gioco specifico
* [x] Context API / Global state management library
  * [x] Utenti loggati possono condividere dati all'interno dell'applicazione

## Deployment

* [x] https://gamere-hub.vercel.app/