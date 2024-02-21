# pixabay-project-backend
server for pixabay project

1. clone the repo
2. open project in vscode (or whatever editor)
3. run "npm install" from terminal from the project folder.
3.5 Add a new file called ".env" in the "back-end"/rootDirectory folder and paste the contents from the email inside else the project can't fetch to the backend.
4. start server with "node index.js". If done right the console should say "listening on port 8000" **if running front-end already, refresh the page to fetch images.


notes:
+ if the server is terminated the cache is cleared.  Redis can be a persistant storage method for node projects.

+I left comments in when sorting for date for easy checking in the console after sortBtn.onClick()

+I noticed that the pixabay api had pagination function, but i assumed to make a cache to be more efficient.
