# Drinkbook

The drinkbook site allows users to easily find what mixed drinks they can make, based on the recipes in the database, with their current ingredients. The user will also be able to add/edit/review recipes. 

## How to use this repo

1. Clone this repo.
2. Clone the database for this repo, found <a href="https://github.com/noahtaggart/drinkapi">here</a>
3. In the project directory on your computer, navigate to the api folder `cd api`.
4. Start the json-server, run `json-server database.json -p 8088 -w`
5. In a second terminal window, navigate to the drinkbook client folder `cd {directory_path}`.
6. On first launch, run `npm install`. 
7. To then launch the client, run `npm start`. The browser should automatically open and take you to the page. If it does not, open a browser and navigate to localhost:3000 (default). 


See a deployed version of the app <a href="https://drinkbook-fkwck.ondigitalocean.app/recipes" target="_blank" rel="noopener no referrer">here</a>
