// FETCH AND LOG DATA
// 1. Use D3 library to read in JSON data from the URL 
// a constant variable "url" is created to grab JSON data from URL where the JSON data is hosted.
// define the URL

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// a constant variable "dataPromise" is created to save the d3.json while inputting the URL 
// fetch JSON data from URL using d3.js
// d3.json is essentially promising future data from the API. It returns a promise that resolves to the data.

const dataPromise = d3.json(url);

// log the promise to the console. This will show the promise object, not the actual data yet, but a placeholder for future data.  

console.log("Data Promise: ", dataPromise);

// using .then() to handle the resolved data when the promise is fulfilled
// the function runs once the data has been fetched completely. 
// log actual data to the console to inspect its structure and contents. 
// d3.json(url) returns the promise (other lines can run while the promise is fulfilled)
// onCe the promise is fulfilled, everything inside .then() will run, callback (anonymous) function.
// once the promise is fulfilled, the promise returns a data object that is passed onto the parameter in the callback function.

d3.json(url).then(function(data) {
    console.log(data);
});
 
// the data can be used for visualizations or to process it. 

//BAR CHART CREATION USING D3.js
// 2. Create horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual 
// use sample_values array as the values for the bar char -> x-axis
// use otu_ids as the labels for the bar chart -> y-axis
// use otu_labels as the hovertext for the chart 


// before chart, extracting data from the fetched JSON 
// assuming 'data' is an array of object where each object represents a sample. 

const samples = data.samples;
const sample = samples[0];

// extracting the top 10 OTUs and their values using .slice() function

const otu_ids = sample.otu_ids.slice(0, 10);
const sample_values = sample.sample_values.slice(0, 10);
const otu_labels = sample.otu_labels.slice(0, 10);

// bar chart creation 
// 'otu_ids', 'sample_values', 'otu_labels' are arrays containing the data. 

const trace1 = {
    x: sample_values, //values for the bar chart 
    y: otu_ids, // labels for the bar chart
    type: 'bar', //type of chart
    orientation: 'h', // horizontal bar chart
    text: otu_labels, // labels for hovertext  
    marker: {color: 'rgb(158,202,225)', opacity: 0.6}

};

let data1 = [trace1]

const layout = {
    title: 'Top 10 Bacteria Cultures Found',
    xaxis: {title: 'Number of Bacteria'},
    yaxis: {title: 'OTU IDs'},

};

// Render plot to the div tag with id "plot"
// Plot bar chart using Plotly library 

Plotly.newPlot("bar", data1, layout)

// creating a dropdown menu to select different samples










// 3. Create a bubble chart that displays each sample

const trace2 = {
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

const data2 = [trace2];

const layout2 = {
    title: 'Bacteria Cultures Per Sample',
    xaxis: { title: 'OTU IDs' },
    yaxis: { title: 'Number of Bacteria' },
    showlegend: false
};

// Render plot to the div tag with id "plot"
Plotly.newPlot('plot', data, layout);



// 4. Display the sample's metadata 

// 5. Update all the plots 


// 6. Deploy the app to a free static page hosting service 

