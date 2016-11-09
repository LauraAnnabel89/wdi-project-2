A Cut Above the Rest ------

![Alt text](/src/images/mainsite.jpg?raw=true)

Aim

To have an authenticated multi-page website showing the best barbers in London with a great user-journey and lifestyle feel.

The brief was to use google maps, have a database with locations, which would render on this using markers and info windows. Create a fully authenticated user experience and use ES6 and a CSS framework to build.

User Journey

- Log in or register
- Home page renders with nav bar Above
- User has the options of the map, all the barbers, editorial or to log out
- Map shows pins for all barbers and an info window
- Barbers shows all the barbers in a grid, with modals showing more detailed information, a picture and link to the website
- Editorial shows an inspiration page with clickable modals and blog pieces
- User can then log out and will be taken back to the sign in/register page

I started with wire frames and used them as a template however added in the additional pages at a later stage

![Alt text](images/Laura-Tombs.png?raw=true)

Inspiration

- I spent some time researching colours, images and websites before embarking on the styling for this, which gave me a clearer focus when designing the look and feel
- This was partially why I decided at a later stage to put an editorial page in, I felt the images I had gathered were integral to the overall feel of the site so wanted a place to display them to the user

- Websites -
![Alt text](images/BarberStreisand.png?raw=true)
![Alt text](images/MrPorter.png?raw=true)

- Images -
![Alt text](images/photobooth.png?raw=true)
![Alt text](images/blackbrushes.jpg?raw=true)
![Alt text](images/chair.jpg?raw=true)

-Colours-
- I then used this as a base for my colours and used coolors to generate a board of complimentary tones
![Alt text](images/coolers.png?raw=true)

Elements and Functionality

- A google map api - acquired using ajax and rendered on the page using javascript, jQuery and html
- An authenticated api user database - using mongoose, bcrypt, validator and jsonwebtoken. Password authenticated using hash and salt.
- A seeded back-end database acquired on the client side - build with mongoose and mongod, called with ajax
- Multiple pages - built using jQuery with additional features such as nav bars, modals and hide/show animation.

Problems & Challenges

- The data testing side took longer than anticipated and several initial ideas had to be scrapped when using external APIs. Eventually I decided to create my own database.
- Due to the amount of jQuery hide/show within my multiple pages the code became repetitive
- Getting the barbers to render on the index page proved challenging initially as they had to be created in a new html element
- With the amount of sections and use of bootstrap there was a heavy reliance on divs, which when done again could be made more semantically relevant

Future Progressions/Amendments

- To use an external API for the barbers database to allow greater scalability and make it UK wide
- Make adjustments for a greater mobile and tablet journey
- Add in actual editorial features and expand the blog
- Add in social media functions and buttons
