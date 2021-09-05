# Shortest
URL Shortener built using React in Typescript, that runs a back-end system with node and sqlite3 for storage.

## Installation
```bash
git clone https://github.com/dayvidwhy/shortest.git
cd shortest
npm install
```

## Running the application
There are two ways to run the application currently.

You can start the application like you would if you were serving it in development.
```bash
npm run start
```

Or you can run webpack in development mode and also start the back-end server. When running webpack in development mode the server is reached using a proxy and traffic to `/api` is redirected to the local back-end server using `webpack-dev-server`'s proxy feature.
```bash
npm run dev
npm run server # in another terminal
```

## How it works
The application accepts URL's in the given input field and then outputs a short URL that redirects to that same place, in the input field. You are then able to copy this and start using it as a shorter version of the URL.

In the back-end the application takes an input string and inserts it into a database that keeps track of URL's and associated ID's. The ID of the database row is then converted to base62 to keep the URL short as usage of the application increases.

The database has one table called `links` that looks like:

| rowID | url             |
| ------|-----------------|
| 1     | url1            |
| 2     | url2            |
| 3     | url3            |

Where we track URL's with rowID's.

For example if are running the application in development mode using webpack and we navigate to `http://localhost:8080/api/462a` a few things will happen:

* `462a` will be converted back to a base 10 number, a rowID.
* The rowID is looked up in the database.
* The express server issues a redirect to the associated url.

## To-do
* Better validation.
* Rate limiting.
