# **CapstoneProject-GGDB**

## **Author:** Reeve Jarvis

<br/>

### INITIAL TEST DEPLOYMENT: https://ggdb-goodgamedatabase.herokuapp.com/

*To run and test this code on a local machine, please switch to the local-test branch and follow the readme instructions.*


### **Current Version:** MVP - Minimum Viable Product

---

I have created a fully functional node/express web application that populates and/or generates real video game data from two sepearate API sources:

-   https://api.rawg.io/docs/ - For all video game related details and imagery
-   https://www.gamespot.com/api/documentation - For video game reviews linked to their source material.

I was able to replicate most of my intended User Interface based on my AdobeXD prototype here:

https://xd.adobe.com/view/1a534ba8-25fd-4917-840f-22a292466d72-4f00/?fullscreen

<br/>

### **Fixes and Updates required:**

<br/>

> **Responsive design** - Current version only properly displayed on Desktop. I have used grid/flex displays so it should only require a few style-rule changes to prepare mobile/tablet displays. This will be a main priority for the Complete Product.

> **Aesthetic Fixes** - More styling required including: adding more brand-colours, standardizing image sizes, improving visual separation

> **Code Reduction/Refactoring** - Code is in need of general reduction and refactoring to meet my expecations for modularity and "clean" code. There may be some redundant code present. Additionally, I will be re-organizing my JavaScript code into modules to create a better separation of concerns.

<br/>

### **Features not included for this iteration:**

<br/>

> **In-depth search filtering** - I have created the UI required, but removed it until functional for complete product

> **Search-result view changes (Grid vs. List)** - I have removed these UI elements until I complete the programming required to change presentation properly

> **Carousel-scrolling for curated game lists** - I need to create the required code/programming to change and animate the carousel lists (Currently presenting top 4 for each category)

> **Database implementation** - I plan to add more database usage to reduce API reliance and add more features to complete product

> **User Profile Management** - If time allows, I will be exploring User-Profile implementation and adding game-list management and game suggestions based on interests

<br/>

## **Project Summary/Explanation**

### **Description:**

---

GGDB - Good Game Database, is a responsive web-app created by Reeve Jarvis for his Capstone Project in the Web and Mobile App Development Program at NIC

### **The general idea of the project is to …**

---

Create a video game review database application where you can find current and reliable game reviews and details, stay up to date on release schedules, and get game suggestions based on your interests.

### **Context**

---

Game-journalism is a widespread industry with various sources. It can be hard to find reliable reviews for games, not to mention ones that you agree with. It is also very time-consuming to search through multiple locations to find reviews for the game you are interested in. Wouldn’t it be great if there was one singular location where you could find reviews from multiple sources, stay up to date on game releases, and perhaps even find something new to play? GGDB is here to help.

### **What is GGDB?**

---

GGDB is a gamer-focussed web-application created to assist today’s gamer. It is our mission to help indecisive gamers get the information they need, and find their new favorite game in the process. Our focus is on providing a valuable service to the fastest growing entertainment industry in the world. This application serves a user-focussed need that has become present in the industry (i.e. finding reliable game reviews quickly and easily). Additionally, in a world where new games are released at a blistering pace, it can be hard to stay on top of game release schedules. GGDB leverages APIs to provide current information regarding game details (including release dates). Users can create a profile in order to stay up to date, and track games they are interested in. Based on games they have tracked in their profile, GGDB will also provide suggestions and assist players in finding their new favorite game.

### **Who is GGDB For?**

---

Gaming is currently the fastest growing, and largest entertainment industry in the world. Particularly during the current COVID pandemic, the gaming industry has seen an exponential increase in value and holds market-value greater than both film and music combined. Younger generations use gaming as their primary form of entertainment, which means there is a huge market for this style of application. Our primary user/target audience will be gamers. The application will serve gamers from varying degrees of interest, whether that be the casual gamer who wants some assistance in finding new games or the die-hard gamer who wants to see how their most-anticipated game is reviewed before making a purchase with their hard earned money. It may also provide a service to those working in the games industry, helping them to track trends and interest in the games they create or are currently covering as journalists.

### **Alternatives to GGDB?**

---

While there are certainly similar products on the market, there is no shortage of interest to be shared in such a large industry. Additionally, some of these products do not fully match the intended goals of GGDB. They have either committed to just supplying reviews, or tracking user interest and providing game suggestions. There are not many products that combine these functionalities into one package.

Some competitors to GGDB include:

-   https://ggapp.io/ - Game suggestions and social network between friends
-   https://rawg.io/ - Game details and reviews (Most similar)
-   https://www.mobygames.com/ - One of the Oldest Game Databases
-   https://www.igdb.com/ - Game Database (IMDB but for games)

While some of these serve as competitors, a few of them are also open-source and provide free API usage to assist others in getting game information and review sources. These can be leveraged in-order to gather the data we need for our application. In the development of this application, we will explore our options in collaborating with like-minded products and provide attribution as needed. Our end goal will be to provide a product that stands out amongst competitors and has a distinct identity.

### Why use GGDB?

---

GGDB is intended as a discovery service, and informative tool for those interested in gaming or who are currently involved in the industry. Typical use cases include:

-   Find quality reviews for a game you are interested in
-   Keep track of recent releases (notifications)
-   See the most anticipated upcoming games
-   Find specific details regarding a game (including platforms, number of players, genre etc.)
-   Keep track of your favorite games in one place regardless of platform
-   Get help finding a new game based on personal preference
-   Compare games you like with your friends
