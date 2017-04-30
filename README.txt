A weather app created for ECS189H - Web Programming.


Some things to notice:


- On the mobile view, I implemented the carousel as well, for vertical smooth scrolling.

- The "forecast boxes", for lack of a better term, don't shrink based on window size, but rather, the number of days shown is decreased as the window size decreases
    
	- Starts with 5 days when the window size is >1200px, all the way down to 1 day when it reaches 480px
    
	- At that point, the mobile view code takes over

- Search box sends an alert message when the location being searched is invalid or too broad.
    
	- Generally, the message fires when Yahoo's weather API returns null.

- Despite setting the font-weight of the "high" temperatures to 900, its tough to see that they are bold over the rest of the text
    
	- has to do with the font being used and it's thickness.

- A special font I have was used for the font styling, called ProximaNovaLight. That file is included as well.

- Every time the window is resized, or a new location is searched, the carousel will jump back to day 1 as it redistributes the space for the number of forecast days that should be displayed.

- The folder that contains all the forecast images, arrows, etc should be named "WeatherApp 3".