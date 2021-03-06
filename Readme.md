# Let's Endorse Task
- Task is to create a mern stack application which gives the list of ngo details

## Overview
- Design Thoughts
- System Requirements
- Usage
- Issues
- Edge Cases

### Design Thoughts
- To create a simple UI for data representation
- Filter the data in according with ngo names and other details

### System Requirements
- Docker
- Docker Compose
- ReactJS
- NodeJS
- MongoDB

## Data Dump
- I have built a dummy data file in ```backend/src/dummy.js```.
- Above is the dummy data that I am using in my web app.
- I am using Docker to dump the dummy data into mongodb instance, so docker can automatically setup the whole environment for it.

### Usage
```
git clone https://github.com/nikzayn/endorse-task.git
cp sample.env .env
sudo docker-compose build
sudo docker-compose up
```

### Issues
- Have not written the test cases for frontend and backend
- Code structuring is somewhat okay
- Could have used the  ```Context Api``` for better UI performance.

### Edge Cases
- Filter the search bar using fuse.js makes it possible to search faster in real-time
- User friendly
- Applying good styling on UI structure
- Used docker compose for project testing