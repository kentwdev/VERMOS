# VERMOS: simplifying web development

This is a JavaScript based framework with improvements for developing and running both interactive web applications and REST APIs. Vermos can run as either a monolithic back-end or as a set of MicroServices.

Vermos framework architecture prevents CPU-intensive or long-running APIs bringing a Node.js system to its knees, and utilizes MongoDB database, to uniquely present your data as persistent JavaScript Objects.

## Architechtural Overview

    --------------------------------------------
    |                                          |
    |           REST CLIENT               </>  |
    |                                          |
    ----------------------------|---------------
                                |
                                |
                                |
    ----------------------------|---------------
    |                           |              |
    |           EXPRESS     (HTTPS)Interface   |
    |                           |              |
    | (Queue processor)      (Queue)           |
    --------------------------------------------
 
    ------------------------- 
    |           Redis/ GT.M |          
    |                       |              
    | (GLOBAL Strorage) <---|-------------------> [Node.js Worker]
    |                       |
    -------------------------






Interactive web applications can be developed using any client-side JavaScript framework

A single instance of VERMOS can simultaneously support multiple browser-based applications and Web/REST services.

## VERMOS is a work in progress

## Below are the components that are in the build:

Dockerized modes, Dockerised MicroServices, Definining APIs, Defining API handlers, Defining MicroService API Handlers, API Handler Module Arguments, JSON Web Tokens, Configuring .json files, JWT Inspection, Node.js Modules integration, setting up docker containers.
