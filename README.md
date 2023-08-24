# Movie App to view, and search for information about movies and TV shows


__Description__
This app aims to provide user an simple way to view and search for a movie or a tv show which they are interested in.

![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/1.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/2.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/3.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/4.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/5.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/6.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/7.png)
![Image](https://github.com/baonguyen2002/MyMovieApp/blob/master/app%20images/8.png)


__Features__
+ The app is built in a simple, easy to use way.
+ User can view movies and shows by types or by genres.
+ Intergrated search function so user can easily find information about their favorite shows/movies.


__Tools__
+ Written using Ionic Framework:
  * Ionic Framework: https://ionicframework.com/
+ Utilizing The Movie Database's Developer API to display information about movies and TV Shows:
  * The Movie Database Site: https://www.themoviedb.org/
  * Developer API: https://developer.themoviedb.org/docs

__Prerequisite__
<pre>To run this project, you need to install:</pre>
- [NodeJS](https://nodejs.org/en)
- After that please open your terminal and install Cordova and Ionic:
```terminal
npm install -g cordova
```

```terminal
npm install -g ionic
```
- Clone this project to your local repository
- Open the local directory with the IDE editor of your choice, open a new terminal inside your IDE and type:

```terminal
ionic serve
```


__Known bugs__
There is still a specific bug I that I haven't figured out.
1. Go to the Browse section, pick a genre
2. Pick a movie, then press Back at top left of page
3. Now to go Movies section, the movie now reappears, but the Back button is broken
4. Pressing the Movies section again seems to reset and resolve the issue
5. The same bug can be produced with TV Shows
