# url-short-php
A URL shortener in PHP and MySQL.  I wanted to make this to get a better understanding of routing and MySQL.

## What does it look like?
![PHP Url Shortener](https://davidyoung.tech/im/urlshort.jpg "PHP Url Shortener")

## How does it work?
It accepts urls in the given input field and then outputs in that same input field your successfully shortened URL. It takes an input string and inserts it into a database that keeps track of url's and associated ID's. ID's are converted to base 62 to produce the extended link.

## To-do
* Better validation
* Rate limiting to prevent abuse
* Configure apache to produce 302 instead of redirecting in php.
