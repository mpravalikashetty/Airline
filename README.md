Proposal for Salesforce Database Structure and UI for an Airline 
Objective: 

The objective of this assignment is to propose a structured database schema within Salesforce to facilitate the management of passenger, flight, and crew data for an airline. Additionally, the assignment aims to design a User Interface (UI), preferably using Lightning Web Components (LWC), to provide easy access to information related to passengers, flights, and crew members, including functionalities like filtering based on flights and crew members. 

Database Structure Proposal: 

1.A Passenger can book multiple Flights. 
2.A Flight can have multiple Passengers. 
3.A Crew Member can address multiple Passengers. 
4.A Crew Member can be tagged to a single Flight. 
5.A Flight can have multiple Crew Members. 

Additional Functionalities: 

1.Count of Passengers Booked on a Flight: 
A custom Apex trigger or batch process can be implemented to calculate and update a field on the Flight object, 
storing the count of booked passengers. This field can be displayed on the UI. 
2.Count of Passengers Assigned to a Crew Member: 
Similar to the previous functionality, a custom Apex trigger or batch process can calculate and update a 
field on the Crew Member object to store the count of assigned passengers. 

User Interface (LWC) Design: 

One-stop UI to display all the relevant information to the User. 
The functionality to filter records based on flights and crew members should be provided. 
Users can select a flight or crew member from a dropdown menu to filter the displayed records accordingly. 
Clicking on a particular record should open a detailed view providing more information about the selected passenger, flight, or crew member. 


