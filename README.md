# Shortest

A URL shortener using node and sqlite.

## How does it work?
It accepts urls in the given input field and then outputs in that same input field your successfully shortened URL. 

The app takes an input string and inserts it into a database that keeps track of url's and associated ID's. ID's are converted to base 62 to produce the extended link.

## Installation
`npm install`

The database is pretty simple with just one table called `links` that looks like:

| rowID | url             |
| ------|-----------------|
| 1     | http://cool.com |
| 2     | http://stop.com |
| 3     | http://more.com |

Where we track url's with rowID's.

If we request a url to be shortened we get the rowID of it and convert it to base 64 text.

So if we navigate to `http://shorturl.com/462a` a few things will happen:

* `462a` will be converted back to a base 10 number, an ID.
* The ID is looked up in the database .
* The server issues a redirect to the associated url.

## To-do
* Better validation.
* Rate limiting to prevent abuse.
