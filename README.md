# HTTP-Schemas Webserver Demo

This repository serves as a demonstration of the [http-schemas](https://github.com/yortus/http-schemas) library in a production-like web application.

It demonstrates:
* Creating a pseudo-monorepo containing client, server, and shared schema
* Defining a well typed API schema with input and output types.
* Well separated route logic from domain logic
* How good type definition flows down to robustly typed persistence layers and back.
* Build and development processes
* Well typed client code and logic utilising the types provided from the API schema

## Getting started

First clone the repo:

```bash
git clone https://github.com/Antman261/http-schemas-webserver-demo.git
```

then run the bootstrap script to install all dependencies:

```bash
cd http-schemas-webserver-demo
npm run bootstrap
```

To start all repos in watch mode:
```bash
npm run start
```

This will start the local client on port 3000 and the API on port 8080. This lets you use create-react-app's hot-reloading development server while working on the client.

To serve the client from the webserver, run `npm run build` inside the `client` directory. This will place a production build of the *client* in `server/build/client` for the webserver to serve.

## Understanding http-schemas

[http-schemas](https://github.com/yortus/http-schemas) provides a shared definition for a well-typed API. By providing strong typing and run time validation at the most crucial boundary of any web service, http-schemas makes your applications much more robust. 

Your entire application code becomes much easier to type and reason about when your API boundary is typed.

For more information, read the readme in:
1. [`shared/http`](https://github.com/Antman261/http-schemas-webserver-demo/tree/main/shared/http)
1. [`server`](https://github.com/Antman261/http-schemas-webserver-demo/tree/main/server)
1. [`client`](https://github.com/Antman261/http-schemas-webserver-demo/tree/main/client)
  
for the best introduction to http-schemas.
