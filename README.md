# Development

### Link to Deployed Website
https://moscowmule1776.github.io/development/

### Goal and Value of the Application
The goal and value of my application is to serve as a viewing page for drag racing results from various types of cars with different engine configurations. The cars are either forced induction (supercharged/turbocharged) or naturally aspirated (these concepts are referring to the method of air being sent into the engine for combustion ). It also displays and allows sorting based on results of the drag races: 1/4 mile elapsed time; the time it takes for the car to start from a stop and drive 1/4 of a mile, and trap speed; the speed the car is traveling when it reaches the 1/4 mile point. These are common metrics used when comparing cars speed/performance. My page will allow you to see trends in performance depending on engine type/configuration. Some of these vehicles are also modified and may be outfitted with different engine configurations than they came with from the factory.

### Usability Principles Considered
I considered different usability principles to ensure the user doesn't have any issues viewing different combinations of filters. I made sure that there is a possibility to combine different filters even if there aren't any vehicles currently with that configuration, as there is a potential to have pretty much any type of engine configuration in the automobile world today. I also ensured that there can only one type of engine/induction method being selected for filtering, as it is not possible for a vehicle to have multiple of these (only one engine, and it also makes more sense to compare similar engines when racing). For the aggregator component, I added a favorites button to each card that allows you to add cars to your favorite list, where it will calculate the average 1/4 mile elapsed time, and trap speed. This button changes to a remove from favorites button after it is clicked, so you can just toggle it to add/remove easily. I also included a button to reset/clear all filters so the user can restart without refreshing the page.

### Organization of Components
I decided to use flexbox to organize the sorting/filtering menu on the left hand side, and used the right hand side for the content (cards) of the different cars and details. I put sorting at the top, then the filters below, starting with the reset filters button, view favorites, the aggregated values of the favorites, then the two remaining filter categories. The buttons are white by default, but turn red when selected to indicate that is currently what you are filtering by. For the sort options, the default is sort by fastest 1/4 mile time, but any of the other 3 can be selected and while remain persistent regardless of other filters you add!

### How Data is Passed Down Through Components
I use a Data.jsx component where I read all the cars/details about each car and populate the UI with cards of them. This componenent is a json object which I operate on in my Filter.jsx component, filtering and sorting the data depending on what the user selects. I am using state for this, setting the data to comply the currently selected filters then rerendering the display. I also use state for favorites

### How the User Triggers State Changes
The user triggers state changes by pressing the different buttons for sorting/filtering. I am using the React useState hook for both setting data after filtering/sorting, and adding to/removing from favorites. This results in React rerendering the UI when the data is changed due to it being filtered/sorted in any way, so the user will see the page automatically update in front of them!
