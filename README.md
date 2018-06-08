# Shortest
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7184c3b60e04490c8133bdf8e2a33231)](https://www.codacy.com/app/dayvidwhy/shortest?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dayvidwhy/shortest&amp;utm_campaign=Badge_Grade)  
A URL shortener using node and sqlite3.

## Installation
1. `git clone https://github.com/dayvidwhy/shortest.git`
2. `cd shortest`
3. `npm install`
4. `npm start`

## How does it work?
It accepts urls in the given input field and then outputs in that same input field your successfully shortened URL. 

The app takes an input string and inserts it into a database that keeps track of url's and associated ID's. ID's are converted to base 62 to produce the extended link.  

The database is pretty simple with just one table called `links` that looks like:

| rowID | url             |
| ------|-----------------|
| 1     | http://cool.com |
| 2     | http://stop.com |
| 3     | http://more.com |

Where we track url's with rowID's.

If we request a url to be shortened we store it in the database and return the rowID of the entry encoded as base 62.

So if we navigate to `http://shorturl.com/462a` a few things will happen:

* `462a` will be converted back to a base 10 number, a rowID.
* The rowID is looked up in the database.
* The server issues a redirect to the associated url.

## To-do
* Better validation.
* Rate limiting to prevent abuse.
