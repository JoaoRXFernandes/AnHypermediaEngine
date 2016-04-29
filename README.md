# An Hypermedia Engine

This case-study illustrates a few practical patterns within Hypermedia that have worked well for me in the past. 

I realised recently how much I've learnt from the developer community throughout the years, so I decided to try and give something back; Please consider this as an overdue attempt to say THANK YOU for all the great content/code published by all of you.

Also don't hesitate to comment, fork the repo, submit pull requests or just say hello. All and any feedback/help is appreciated.

Hope you enjoy and find something useful here!

## Abstract
**Integrating through interfaces is fragile...** anytime there's a new feature we have to **develop it on the server and re-deploy**; then **develop it on the client and re-deploy**; the contracts are communicated **out-of-band and hard-coded** (urls, verbs, parameters, validation, application state transitions, ...); then there's outdated clients and **breaking changes**... that lead to convoluted **versioning mechanisms**... ... ... alas it's fragile.

>"So, REST is designed to steer developers toward handling change by observing and *adapting to changes in content instead of interfaces.*" - Roy Fielding


Hypermedia **reflects business processes** at an application level (Domain Application Protocol).

The client is decoupled from the server, meaning changes to the business processes are communicated instantly by the server, promoting business reactiveness at an application level.

The server takes ownership of the Domain Application Protocol, so **the clients only need to be re-deployed for UX concerns**;
This also enables **quick prototypes** and **quick time to market** on multiple platforms at once.

The clients logic becomes User eXperience extensions over the Domain Application Protocol provided by the server.

Hypermedia can also **reduce the load on servers** making it operationally cheap (and green in the environmental sense):
* Single load of the client (html/css/js);
* Minimal transition responses (additionally leveraging HTTP etags, cache headers, ...); and
* No server side state.

Low support overhead as partners usually find it easy to integrate since the Domain Application Protocol is defined explicitly.


## Client
* Handles user experience
* Overview
    * Bootstrap
        * Gets the root response and caches it in the form of a top level menu;
        * Executes the first link in the menu; and
        * Binds the current response.
    * Transitions
    	* Link/action execution results in a new message that bubbles up through the current response object graph;
    	* The parent object may choose to react to the message and/or bubble up to the next layer; and
    	* The application is the last layer with the default behaviour of rebinding the current response.
    		* The application also handles unexpected errors as exceptions (i.e.: no state transition).
    * Extensions
    	* Customised CSS (i.e.: Books) 
	    	* BooksCollection.css
	    	* Book.css
    	* Customised HTML (i.e.: Paintings)
	    	* PaintingsCollection.cshtml
	    	* PaintingsCollectionItem.cshtml
    	* Customised HTML / Javascript (i.e.: Films)
	    	* FilmsCollection.cshtml
	    	* FilmsCollectionItem.cshtml
	    	* FilmsCollection.js
	    	* FilmsCollectionItem.js
* Patterns
    * Root menu
    	* Root state binding to a top level menu
    		* Root.js
    		* Root.cshtml
    * Load/unload authenticated extensions
    	* Client reload on authentication actions (full page reload or javascript driven)
	    	* Login: Unauthorised.js
	    	* Logout: Root.js
    * State self refresh
    	* State that self refreshes on successful write operations
    		* Entity.js
    		* CollectionEntity.js
    		* FilmsCollection.js
    		* FilmsCollectionItem.js
    * Action state
    	* State that only has links/actions so an action is selected as active by default (i.e.: Login/Register/Reset Password)
    		* ActionEntity.js
    * Sub-state capture
    	* State managing sub-states for a richer user experience (i.e.: Collections)
    		* FilmsCollection.js
    		* FilmsCollectionItem.js


## Server
* Handles the Domain Application Protocol
* Overview
	* API responses are the application states
	* API requests are the application transitions
	* Manages validation and authorisation for application transitions
* Patterns
	* API responses demand a context
		* API responses using the context to manage paging, culture/language, ...
			* BooksCollection.cs
			* BooksCollectionItem.cs
			* Book.cs
	* The API request is king
		* Using reflection to generate the Hypermedia links/actions from the API requests (url, verb, parameters, validation, authorisation)
			* ActionsFactory.cs
			* LinksFactory.cs


## To-do
* Client
    * Refresh of root response when cache expires
    * Html for remaining field types
    * Browser controls override (back/forward)
    * Partial views
* Server
    * Http cache headers
    * Collection filters
	    * Filter fields lookup (autocomplete, filtered options, ...)
    * Testing patterns


## Food for Thought
* What is the rootResponse.js? What is the currentResponse.js? What is the application.js?
* Could we implement the API as a full blown FSM using only the API requests and responses?
