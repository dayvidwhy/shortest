# Another URL shortener
## To hopefully generate a shorter link

A URL shortener in PHP and MySQL.  I wanted to make this to get a better understanding of routing and MySQL.

## How does it work?
It accepts urls in the given input field and then outputs in that same input field your successfully shortened URL. 

The app takes an input string and inserts it into a database that keeps track of url's and associated ID's. ID's are converted to base 62 to produce the extended link.

We make use of [Apache's Rewrite Engine](https://httpd.apache.org/docs/current/mod/mod_rewrite.html) here to send all requests that do not begin with `/pub` to `index.php`.

## Installation
You need a MySQL database with config loaded into `/pub/db/db_conf.php` looking like:

```php
<?php
    const DB_HOSTNAME = 'localhost';
    const DB_USERNAME = '<insert-username>';
    const DB_PASSWORD = '<insert-password>';
    const DB_DATABASE = '<insert-database-name';
?>
```

The database is pretty simple with just one table called `links` that looks like:

| link_id | link_url        |
| --------|-----------------|
| 1       | http://cool.com |
| 2       | http://stop.com |
| 3       | http://more.com |

Where we track url's with ID's that are used to keep track of them.

If we request a url to be shortened we get the ID of it and convert it to base 64 text.

So if we navigate to `http://url-short.com/462a` a few things will happen:

* `462a` will be converted back to a base 10 number, an ID
* The ID is looked up in the database 
* The server issues a redirect

## To-do
* Better validation
* Rate limiting to prevent abuse
* Configure apache to produce 302 instead of redirecting in php.

## What does it look like?
![PHP Url Shortener](https://davidyoung.tech/im/urlshort.jpg "PHP Url Shortener")