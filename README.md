# ACME Vitals #

ACME Vitals is a web-based application that demonstrates real-time tracking of patients' vital statistics.

## Prototype Architecture ##

The prototype uses a MEAN (MongoDB, Express, AngularJS, Node.js) architecture, which allows for rapid prototyping. It also uses socket.io to allow for real-time updates when new patients or vital readings are added. Due to the time constraints on the prototype, I chose to use Twitter Bootstrap as a foundation for a clean UI without much overhead.

All communication with the prototype backend is unsecured and unauthenticated.

### REST API ###

The Express-based backend provides a REST API with the following endpoints:

    GET  /api/patients               // List all patients
    POST /api/patients               // Create new patient
	GET  /api/patients/:id           // Get individual patient
	GET  /api/patients/:id/readings  // Get a list of all vital readings for a patient
	POST /api/patients/:id/readings  // Create a new vital reading for a patient

## Product Architecture ##

In order to transition the prototype to a viable product, several changes would need to be made.

Although I used MongoDB for the prototype backend, this may not be the best solution for production. The fairly static nature of the model schemas and the relationship between readings and patients would lead me to prefer a standard SQL database instead of a document-based NoSQL database like MongoDB.

I also used Node.js and Express for the REST API. Although I have deployed Node.js apps in the past without issue, it is still a young technology compared to the more established backends such as Ruby on Rails. I would be open to discussing alternatives to Node.js.

The REST API is also not documented. I would recommend using a technology such as Swagger to create interactive API documentation that could be generated automatically.

### Security ###

If the REST backend was to be deployed on a cloud instance, instead of a local, per-hospital installation, then security would be of the utmost importance. The first step would be to use SSL encryption for all endpoints. Also, authentication would be required for using the API. I'm not sure if hospitals would be interested in have to authenticate per user to access and add vital information, but the web client should at a minimum should have to send requests signed using an API key.


### Reliability ###

The prototype application does not contain any unit tests. At a minumum, the back-end should have unit tests that provide 100% coverage of all REST endpoints. Additionally, I recommend performance tests with high numbers of calls to the endpoints to test memory consumption by the backend process. Finally, a watcher process should be used in case of backend process termination.

Data reliability is also of vital importance. The cloud provider should have data backup capabilities, and using database journaling features should assist in case of server crashes.

### Speed ###

There are a number of factors involved in site speed. Of high importance is having a low page weight. There are many ways to reduce page weight, including: JavaScript concatenation and minification, using server-side gzip compression, and compressing your assets before deploying to production. I have used Grunt in the past to automate these tasks.

Also, the next major factor in speed is having the REST API calls execute quickly. This usually involves making sure your common queries are optimized. This usually involves having indices on the most used columns in your database.
