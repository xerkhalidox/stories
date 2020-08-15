# Stories

Stories is a web application to share your stories with others, You can edit and delete and show users' stories.

Developed using [NodeJs](https://nodejs.org), [ExpressJs](https://expressjs.com/),[MongoDB](https://www.mongodb.com/) for Backend and [Materialize](https://materializecss.com/) for Frontend.

![dashboard screenshot](https://github.com/xerkhalidox/stories/blob/master/dashboard.JPG)
![public screenshot](https://github.com/xerkhalidox/stories/blob/master/public.JPG)

# Getting Started

first clone this project by running this in terminal

```git clone https://github.com/xerkhalidox/stories.git```

go to stories/config and create config.env file and create database on MongoDB Atlas more on this [here](https://docs.atlas.mongodb.com/getting-started/)

Create Google developer account and put this on config.env

```
database_url ="Database connection string"
GOOGLE_CLIENT_ID="Your google client id"
GOOGLE_CLIENT_SECRET="your google client secret"
port="3000 by default"
```

# Usage

To run the app locally
``` 
#head to project directory in terminal and run the followig commands 
npm install
npm run dev 
```
the app will start at port 3000 by default on this [link](http://localhost:3000/)
