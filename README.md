# smart-house

## Instructions

A JavaScript application simulating house automation: pressing a button on a control panel would visually turn on a light, change the temperature or close the curtains. Some constraints:

* the application must use jQuery.
* the components must have HTTP based "server" interaction (use a static file for simplicity, data persistence is not required). For example, the heating component retrieves the current temperature from the server and also sends the desired one back to the server.
* the solution has to be extensible and documented, so that we can develop our own components that react to events.

The application will be executed on a plain HTTP server with no possibility to run code server side and is being viewed in 2 major browsers of your choice.

## Description

This project has been done without any rich JavaScript framework.
I thought that a simple application like this should be as light and readable as possible.

The project implements the MVC pattern in order to be flexible and extensible.

## Floor Plan SVG

A picture of a house floor plan is being used to show the different states of the rooms.

I chose the SVG format in order to be able to show and hide every part of the house plan.
For example, each <g> tag represents a room (identified by the room name) which gather all the room objects (light, curtains and temperature display).

## Mock Server

The server-side is replaced by a static file (mock-server/house.json) that is used on read-only for the initial state of the application.

It contains a JSON object organized as follows:

```javascript
{
    room-name1:{
        propertyA: stateA1,
        propertyB: stateB1,
        propertyC: stateC1
    },
    room-name2:{
        propertyA: stateA2,
        propertyB: stateB2,
        propertyC: stateC2
    },
    ...
}
```

## Third-party libraries

* jQuery: JavaScript library used to simplify the client-side scripting of HTML.
* Material Design Lite (MDL): Icons and CSS templates that helps to build fast, modern mobile-ready web apps.

Both libraries are retrieved from external CDNs.

## Setup

This application can be hosted on a plain HTTP server. There is no server-side code needed.

I tested the application on Google Chrome, Mozilla Firefox and Safari for MacOS.

## Demo

A online demo is available [here](https://thomasknobloch.github.io/smart-house/).

## Download source code

The source code can be downloaded from [here](https://github.com/ThomasKnobloch/smart-house/archive/master.zip).
