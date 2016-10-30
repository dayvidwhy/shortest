# url-short-php
A URL shortener in PHP and MySQL.  I wanted to make this to get a better understanding of routing and MySQL.

## What does it look like?
![PHP Url Shortener](https://davidyoung.tech/im/urlshort.jpg "PHP Url Shortener")

## How does it work?
It accepts urls in the given input field and then outputs in that same input field your successfully shortened URL. It takes an input string and inserts it into a database that keeps track of url's and associated ID's. ID's are converted to base 62 to produce the extended link.

We make use of apache's rewrite engine here to send all requests, that aren't `/pub` to `index.php`.
If we request a url to be shortened we get the ID of it and convert it to base 64 text.

So if we navigate to `http://url-short.com/index.php/462a`

`462a` will be converted back to a base 10 ID, and the URL is looked up in the database, and a redirect occurs.

## To-do
* Better validation
* Rate limiting to prevent abuse
* Configure apache to produce 302 instead of redirecting in php.
