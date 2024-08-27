<a name="readme-top"></a>

<!-- -------------------------------------------------------------------------- -->
<!-- HEADING STUFF  -->
<div align="center">
    <h2>Movieland Take-Home Assessment</h2>
    <h4>React + Redux + RTK + Bootstrap application that fetches movies from <h4>
    <h3> 
      <a href='https://movie-land-v2-git-main-mutaremalcolms-projects.vercel.app/', target='_blank'>
        <h5>live demo ↗</h5>
      <a/>
    </h3>
  <!-- <p align="center">
    <a href="https://github.com/mutaremalcolm/movie_land_v2/'">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/mutaremalcolm/movie_land_v2/'">Request Feature</a>
  </p> -->
</div>

<!-- -------------------------------------------------------------------------- -->

### 👋 Introduction:

---

This project is part of a time-constrained frontend technical assessment for Leo Vegas. The application makes an API call to a source, renders movies on the screen, and provides users with the ability to play back movies as well as add and remove movies from their favorites.

Below is a code review of the original code before changes and improvements were made. I’ve included these review notes to give both users and developers a clear context of the application.

### 🔑 Code Review:

---

After cloning the repository and having it running in my local environment, i started going through to codebase to get a better understanding of the data flow through the project and how all the components and data were tied together. The first thing i noted was that the movies were not being displayed on the landing page as expected. My first instict was to the investigate the api call. I then went to the endpoint and went through their docs to see how their API call worked. I checked if the API_KEY and all END_POINTS were set as expected and that seemed to be the case. 

My next step was to check in the console in developer tools for any error messages. On inspecting the console messages in both the console and the Network tab.I found that there was a 404 not found error that was showing anytime an attempt was made to connect with the API endpoint. I inspected the code related to the API call and saw that there wasn't sufficient error handling in place. I then proceeded to wrap the API call within a try catch block. I then recieved back a more refined error message, and saw that i need to take a closer look at the url for the API contained in the constants folder. I then found some extra forward slashes in the url and after removing them the API call was getting a 200 OK in the console and the movies were being displayed as expected.

The next step was to meet the first requirement which was to display the movies in a grid format as oppossed to the current column display. I identified that the component that controlled how movies were rendered was the Movies.jsx working together with the movies.scss. I then proceeded to add a className to the div controlling the movies and named it "movies-grid" and proceed to add appropriate grid styling to render the movies in line with the requirements. The implementation worked. 



<!-- -------------------------------------------------------------------------- -->

<!-- DEMO IMAGE 
<div align=center>
    <img src="/src/assets/github/Mobile-Demo-iphone.png" alt="Demo-Mobile" title="DemoImage-login" width="150" height="250">    
    <img src="/src/assets/github/Desktop-Demo-macbook.png" alt="Demo-Desktop" title="DemoImage-home" width="400" height="250"> 
</div>
<br> -->

<!-- -------------------------------------------------------------------------- -->

### 🔑 Assessment Requirements:

---

##### REQUIRED FEATURES:

#### React-based solution to render the movies in a browser:

✅ As a User, I can search for movies and view a list of results

✅ As a User, I can add and remove movies from a “my favourites” list

✅ Movies in this list should have some sort of visual representation on any list to show they are favorited.

✅ As a User, I can add and remove movies I want to watch, like the “watch later” functionality on YouTube.

<br/>

##### Understanding of Flipdish Menu Data Structure:

✅ Successful retrieval and handling of data from API endpoint.

✅ Standalone rendering of products with `isMasterOptionSet` set to true.

✅ Implementation ignores `MenuSectionItem` when `isMasterOptionSet` is true.

</br>

##### BONUS FEATURES:

✅ Polished UI design, resembling the Glovo food delivery mobile application.

✅ Implementation of simple unit and integration testing using Vitest and RTL.

✅ Integration of server-side rendering and data fetching.

</br>

<!-- -------------------------------------------------------------------------- -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

</br>
</br>