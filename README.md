# Hidden Treasure

A website project for CIS454  
The website is currently live [here](http://hidden-treasure.online/)  

------  

### Frontend  

For the frontend, we use [Vue.js](https://vuejs.org/)  

### Backend  

For the backend, we use [Firebase.js](https://firebase.google.com/)  

### Search Engine  

We use [algolia](https://www.algolia.com/) for the search function  

------  

Install the project:  
```
npm install
```

Host the project locally (vue.js):  
```
npm run serve
```
Host the project locally (Firebase.js) (Need firebase-tools installed):  
```
firebase serve
```
Build the project:  
```
npm run build
```  

------

### Additional Note  
To run the project, you will need a firebase project setting.  
Also, a database should be uploaded to your firestore, using `upload.js` in functions folder.  
Additionally, you will need an algolia account to link your database with a search engine.  
In order to link it, you will need to setup and deploy the firebase function in functions.  
For more information, please post an issue.  