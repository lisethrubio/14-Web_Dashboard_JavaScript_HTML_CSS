// The comments with an * are provided by the assignment. 
// The rest of the comments without the * are mine.

// This assignment is mainly a web application with user interaction element (anyone can interact with the website without coding knowledge and interact and get results). 
// In this assignment an environment is created where the user can interact with the dropdown menu and see different results pop up without having to code). 
// With the user interaction element, whenever x interaction happens (whenever the user does this), some code will run. The best way to approach this is by setting up the code into functions. 
// Each function will be a block of repeatable code, and these functions can be attached to events on the webpage. These events are how we can translate the user interaction to JavaScript.
// For example, with the dropdown menu, the ID name changes. When X ID is selected, Y results come out. 
// The event would be the dropdown menu selection. 
// A specific function needs to be attached to this event. 
// When the dropdown menu function happens, the demographic information is upgraded.  


// 1. 
// Function to run on page load*

// using D3 library to read the JSON data hosted in the URL. 
// d3.json is essentially promising future data from the API. It returns a promise that resolves to the data.
// when the promise is fulfilled, everything inside .then(<data>) will run, the callback (anonymous) function.
// the data can be used for visualizations or to process it. 

function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // console.log(data.names); //the outer object is data. To isolate the names array -> data.names. 

    // In this JSON data, there are three key-value pairs: look for correlating factors from this object containing three keys
    // Metadata (153 items): array of objects containing key-value pairs
    // Id
    // Ethnicity
    // Gender
    // age
    // Names (153): array of strings. List of all the IDs.
    // Id
    // Samples (153): array of objects containing key-value pairs. Each individual sample has
    //	Id
    // out_ids
    // out_labels
    // sample_values


    // Get the names field*
    // When the page first loads, the user will select a new ID name from the dropdown menu
    // Hence, the "names" data (array of strings containing the IDs) needs to be isolated in a variable 

    const id_names = data.names

    // Use d3 to select the dropdown with id of `#selDataset` from HTML*
    // modify elements on HTML page using d3.select(<id from HTML>) function
    // To modify text on HTML: Class -> ".text"  Id -> "#text"
    // the <select> tag is used for dropdown menus (line 26 on HTML)

    const dropdown = d3.select("#selDataset");
    // console.log(dropdown);

    // Use the list of sample "names" to populate the select options. Hint: Inside a loop, you will need to use d3 to append a new*
    // option for each sample name*

    // before setting up the for loop for the 153 IDs, the following commented code is testing for the first ID to show up
    // <option> tags need to be created for the IDs in the HTML file below the <select> tag using .append(<option tag>).text(<element>)
    // whatever value is stored in the variable "first_id_names" will show up for the "option"
    // these created new <option> tags can be seen in the browser by inspecting the elements of the dropdown menu
    // this means that the original HTML is modified and hence the HTML on the browser is updated with all the new <option> tags.

    // const first_id_names = id_names[0]
    // dropdown.append("option").text(first_id_names)

    // Now, instead of creating a bunch of <option> tags individually, a FOR LOOP can do this faster:
    // when typing "for", JavaScript provides templates for these for loops. The templates have an empty square. 
    // for loop will be iterating over id_names

    for (const id of id_names) {
      dropdown.append("option").text(id)
    }

    // Get the first sample from the list*
    // "id_names" variable contains the data from the array "names" 

    const first_id_names = id_names[0]
    // console.log(first_id_names);

    // Build charts and metadata panel with the first sample*
    //"optionChanged(first_id_names)" is called to pass the "first_id_names" containing the data from "names" array of strings
    // this can get the demographic information to load on page load 

    optionChanged(first_id_names)


  });
}



// 2.
// Function for event listener*
// line 26 "optionChanged" in HTML is referencing the same to the function below
function optionChanged(newSample) {
  console.log(newSample);
  // Build charts and metadata panel each time a new sample is selected*

  // Build metadata
  // "newSample" is an ID number based on what the user selects
  // by passing "buildMetadata(newSample)," when "buildMetadata" runs, "newSample" becomes the "sample," which is the means by which "metadata" is filtered

  // "optionChanged(newSample)" just requires an ID.
  // It takes that ID to pass it onto "buildMetadata(newSample)" and to "buildCharts(newSample)"
  // Therefore in line 85 "optionChanged(first_id_names)" is called to pass the "first_id_names" containing the data from "names" array of strings
  // this can get the demographic information to load on page load  

  buildMetadata(newSample)

  buildCharts(newSample)

}




// 3.
// Build the metadata panel*
// This function is built to populate the demographic information  
// The function "buildMetadata" is passing the "sample" parameter coming in from the dropdown menu. 

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field*
    // The "metadata" array of objects is containing every single test subject with an ID assigned to them

    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number*
    // .filter() function is an array method that will loop over the array and test every single ID to see which ones matches "sample"
    // the array method will then return a new array that contains a single object that passed the test (meta.id == sample)
    // "meta" represents each object in the array of objects "metadata"
    // the ID of the object will be compared with the incoming ID from the "sample" of the dropdown menu

    // Example:
    // if the user selects the "ID Number = 190" coming from the array of strings "names"
    // the .filter() array method is essentially trying to find the ID from "metadata" and "samples" that matches the ID from "names"
    // the function simply takes an ID number and filters the metadata based on that ID to display the demographic information

    const result_metadata = metadata.filter(meta => meta.id == sample);

    // The single object from the array is extracted selecting index 0 of the results variable
    // "result[0]" is therefore isolating the "metadata" object 

    const sampleMetadata = result_metadata[0];


    // Use d3 to select the panel with id of `#sample-metadata`*
    // variable "PANEL" is defined create the pointer to the HTML (to point out to the HTML tag that needs to be modified)

    const PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata*
    // .html("") function is used to clear the existing content of an element before adding new data. 
    // .html("") sets the inner HTML of the selected element to an empty string 


    PANEL.html("");


    // Inside a loop, you will need to use d3 to append new tags for each key-value in the filtered metadata.*

    //APPROACH #1: using "Object.entries()" method and ".forEach" built-in looping method for arrays BOTH TOGETHER

    // to use ".forEach" built-in LOOP, "Object.entries()" method needs to be used to convert "sampleMetadata" from an object to an array
    // comments below explain the code for line 186 and 187, when using APPROACH #1.
    // object.entries(object) takes the object and returns an array where each item in the array is a smaller array with two elements: the key and the value 
    // For example:
    // array = [
    // 0: (2) ['id', 958],
    // 1: (2) ['gender', 'M']
    // ];
    // console.log(Object.entries(sampleMetadata)); 

    // This method can be used to loop through the pairs to process or display each key and value
    // Therefore because "sampleMetadata" becomes a list after "object.entries(sampleMetadata)", ".foreach" is used to extract values from the array or objects within the loop.
    // This is called "destructuring:"

    // In the ".forEach()" method, a function is passed as a callback.
    // [key, value] is the destructured form of each element in the pairs array.
    // Each pair in pairs is an array --> ["id", 958].
    // By destructuring, key gets "id" and value gets "958".
    // Inside the Callback:
    // console.log(${ key }: ${ value }); prints out each key - value pair in the format key: value.
    // In the PANEL.append("h6"), the HTML "h6" tag is modified 
    // "h6" tag is a  small header element from HTML
    // .text() is altering the text of the "h6" tag 


    // Object.entries(sampleMetadata).forEach(([key, value]) => {
    //   PANEL.append("h6").text(`${key}: ${value}`);
    // });


    console.log(Object.entries(sampleMetadata));

    //APPROACH #2: FOR-IN LOOP for objects 

    // Because "sampleMetadata" is an object, a FOR-IN LOOP can be used.
    // the for loop will iterate over each "key" as the keys of object "sampleMetadata"
    // to get the value, cont variable "value" will return the value ("key") of the object. 
    // line 205 is the same as the explanation in line 181



    for (const key in sampleMetadata) {

      const value = sampleMetadata[key];
      PANEL.append("h6").text(`${key}: ${value}`);

    }

  });
}


// 4.
// function to build both charts*
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field*
    // get the metadata field
    const samples = data.samples;

    // Filter the metadata for the object with the desired sample number*

    // .filter() function is an array method that will loop over the array and test every single ID to see which ones matches "sample"
    // the array method will then return a new array that contains a single object that passed the test (sampleObject.id == sample)
    // "samples" represents each object in the array of objects "samples" from "sample_values" array of objects
    // the ID of the object will be compared with the incoming ID from the "sample" of the dropdown menu


    const result_samples = samples.filter(sampleObject => sampleObject.id == sample);
    const sampleObjects = result_samples[0];


    // Get the otu_ids, otu_labels, and sample_values*
    let otu_ids = sampleObjects.otu_ids;
    let sample_values = sampleObjects.sample_values;
    let otu_labels = sampleObjects.otu_labels;

    // Build a Bubble Chart*
    const bubble_chart = {
      x: otu_ids, // X values
      y: sample_values, // Y values
      mode: 'markers',
      marker: {
        size: sample_values, // Marker size
        color: otu_ids, // Marker colors
        colorscale: 'Viridis', // Color scale
        opacity: 0.6
      },
      text: otu_labels // Text values
    };


    const data_bubble_chart = [bubble_chart];

    const layout_bubble_chart = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Number of Bacteria' },
      showlegend: false
    };

    // Render the Bubble Chart*
    Plotly.newPlot('bubble', data_bubble_chart, layout_bubble_chart);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks*
    // Build a Bar Chart*
    // Don't forget to slice and reverse the input data appropriately*

    // extracting the top 10 OTUs (IDs, labels, and sample_values) from the first ID of "names" array using .slice() function

    otu_ids = sampleObjects.otu_ids.slice(0, 10);
    sample_values = sampleObjects.sample_values.slice(0, 10);
    otu_labels = sampleObjects.otu_labels.slice(0, 10);

    // Bar chart creation 
    // ".map()" LOOP function will loop over the array to be able to alter the items of the array
    // the loop will iterate over the array of numbers and insert each number into the template 
    // `` to create template -> `OTU ${id}`
    // a new array is created, whatever is returned from the function is what gets added to the new array (for this cleaner arrow function, the return is implied)
    // ".reverse()" -> descending order 

    const bar_chart = {
      x: sample_values.reverse(), //values for the bar chart 
      y: otu_ids.map(id => `OTU ${id}`).reverse(), // (.map arrow function method) labels for the bar chart
      type: 'bar', //type of chart
      orientation: 'h', // horizontal bar chart
      text: otu_labels.reverse(), // labels for hovertext  
      marker: { color: 'rgb(158,202,225)', opacity: 0.6 }

    };

    let data_bar_chart = [bar_chart]

    const layout_bar_chart = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      yaxis: { title: 'OTU IDs' },
    }


    // Render the Bar Chart*

    Plotly.newPlot("bar", data_bar_chart, layout_bar_chart)

  });
}



// Initialize the dashboard*
init();


// CONLUSION:

// 1. In init() function, the fucntion makes the first call to the JSON file 
// 1.1 when the data comes in, the ID names will be extracted and use them to populate the dropdown menu so the user has something to interact with 
// 1.2 once the user interacts with the dropdown menu, the optionChaged() function is called as it is triggered to capture whatever ID number the user selects

// 2. In optionChange() function, buildMetadata() and buildCharts() functions are called. The selected ID is passed along to both of these fucntions. 

// 3. In buildMetadata() function, the function takes the sample ID that was passed along.
// 3.1 the function then uses .filter() function to filter the "metadata" array of objects to find the object that matches the ID that was selected
// 3.2 once the object is selected, a FOR LOOP is used to loop over and print out the key-value pairs of that object in the demographic information 

// 4. In buildCharts() function, the function also takes the sample ID that was passed along. 
// 4.1 the function then uses .filter() fucntion to filter the "sample" array of objects to find the sample object that matches the ID that was selected
// 4.2 the bar chart and bubble are coded and displayed off of the information that is inside of the object

