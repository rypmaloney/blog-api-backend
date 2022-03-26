# Blog API

This is a basic API I made in order to display blog posts on my portfolio. I feel my skill for writing has been atrophying (I haven't written much since I graduated college in 2016 with a degree in English Lit), so hopefully this will give me the means and motive to use that part of my brain. 

This project is broken in to three parts.
1. The API -  There are two main routes dealt with here. /admin/ which coveres requests sent from the CMS I've made, and /api/ which covers requests from the blog front end. 
2. The CMS - [repository](https://github.com/rypmaloney/blog-cms) / [live preview](https://rypmaloney.github.io/blog-cms/) - sends requests to the /admin/ routes of the API. All POST/DELETE/UPDATE routes are protected with a JWT.
3. The Portfolio - [repository](https://github.com/rypmaloney/portfolio) -  Once completed, this project will send GET requests to the /api/ routes.