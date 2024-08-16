# 14Belly-button-challenge

## Usage:
1. VS Code can be used as a text editor to create and modify the HTML and JavaScript files. 
2. Belly Button Biodiversity dataset will be used to build an interactive dashboard. 
3. The "starter_code" folder contains the "index.html" and "samples.json" files. It also contains the "static" folder containing the "app.js" file. 


## Description: 

This assignment involves developing a web dashboard that incorporates user interaction, allowing users to engage with the website and obtain results without requiring any coding knowledge. The environment created enables users to interact with a dropdown menu, triggering different outcomes without any programming input. The code is structured into functions, which are attached to webpage events, allowing user actions to be translated into JavaScript operations.

The *init()* function is the starting point of the application. It makes the initial call to the JSON file hosted in the given URL, extracts the ID names from the incoming data, and populates the dropdown menu, providing users with interactive options. This is also done with the use of d3 library from JavaScript. Therefore, when a user selects an ID from the dropdown menu, the *optionChanged()* function is triggered to capture the selected ID.

Within the *optionChanged()* function, two additional functions, *buildMetadata()* and *buildCharts()*, are called. The selected ID is passed to both functions. The *buildMetadata()* function filters the "metadata" array to find the object that matches the selected ID by the user and uses a loop to display the key-value pairs of the object in the demographic information section.

Similarly, the *buildCharts()* function filters the "sample" array to find the corresponding sample object based on the selected ID by the user. It then generates and displays a bar chart and a bubble chart using the information from the object. This structured approach ensures that the application dynamically updates the demographic information and charts based on user interactions and ID selection in the dropdown menu.


## References:

- Xpert Learning Assistant
- AskBCS Learning Assistant 
- Curriculum content
- Tutoring 
