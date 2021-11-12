# tech-blog
This project is an interactive full stack application named The Tech Blog. The tech blog allows people to create profiles from which they can post, comment and view other blog posts. The application uses 
MYSQL2 and Sequelize to connect to the database and the dotenv package to use environment variables to store sensitive data, like a user’s MySQL username, password, and database name. The application is also deployed to heroku so it can be visited from the link found in the references.


# Features
* Once in the application you can create a profile by clicking login at the top of the page and filling out the signup form in the login page

![image](https://user-images.githubusercontent.com/87290877/140673324-3340b766-4018-4675-9edc-16d8c077ffea.png)

* Once you are logged in you are directed to the dashboard page, from here you can create a post by filling out the title and body textareas and clicking the create button. A list of posts belonging to your user will also show up underneath the new post section.

![image](https://user-images.githubusercontent.com/87290877/140673675-3b460968-79ca-46aa-8a24-d3a19919d76f.png)

* Underneath each post there is an "Edit post" link, if you click on that link you are taken to the edit screen where you can edit the title, body, make a comment, and delete the post.

![image](https://user-images.githubusercontent.com/87290877/140673847-f17da3e6-d716-409f-b73b-71cf7bc044f3.png)

* The homepage will show a list of the posts that have been posted to the blog from any users. If you click on any part of those posts you will be taken to the individual view of it. 

![image](https://user-images.githubusercontent.com/87290877/140674311-6396248d-3a1a-4aba-8321-ea39220fe8fb.png)



# Installation 
Once you clone the repostiory, install the required packages with npm install. Make a .env to store the database name, user, and password. Set up the database by starting up a mysql shell and running source db/schema.sql. Exit the mysql shell, Then enter npm start and the server will start up and you can use the application locally. 

# References
Link to repository: https://github.com/Jaron15/tech-blog.git

link to deployed application: https://stormy-sands-18757.herokuapp.com/
