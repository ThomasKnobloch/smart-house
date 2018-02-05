# automatic-house

## Instructions

A JavaScript application simulating house automation: pressing a button on a control panel would visually turn on a light, change the temperature or close the curtains. Some constraints:

* the application must use jQuery
* the components must have HTTP based "server" interaction (use a static file for simplicity, data persistence is not required). For example, the heating component retrieves the current temperature from the server and also sends the desired one back to the server.
* the solution has to be extensible and documented, so that we can develop our own components that react to events

The application will be executed on a plain HTTP server with no possibility to run code server side and is being viewed in 2 major browsers of your choice.

## Description

This project has been done without any rich JavaScript framework.
I thought that a simple application like this should be as light and readable as possible.

The project implements the MVC model in order to be flexible and extensible.

## Third-party libraries

* jQuery: JavaScript library used to simplify the client-side scripting of HTML.
* Material Design Lite (MDL): Icons and CSS templates that helps to build fast, modern mobile-ready web apps.

## Setup

This application can be hosted on a simple HTTP server. There is no server-side code needed.
The only external access made is to retrieve the MDL CSS lbrary and jQuery from the Google CDN.

I tested the application on Google Chrome, Mozilla Firefox and Safari for MacOS.

## Demo

A online demo is available [here](https://thomasknobloch.github.io/automatic-house/).

## Download sources

The source code can be downloaded from [here](https://github.com/ThomasKnobloch/automatic-house/archive/master.zip).
