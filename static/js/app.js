
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

    let samplesValue;
    let metaData;
    let samplesNames;


const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);


    d3.json(url).then(function(data){
        samplesValue = data.samples;
        metaData = data.metadata;
        samplesNames = data.names;


    let selector = d3.select("#selDataset");
        samplesNames.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });


    updateCharts(samplesNames[0]);
});


function updateCharts(IDsamples){
    const IndexSelected = samplesNames.indexOf(IDsamples);
    const selectedSample = samplesValue[IndexSelected];
    const selectedMetaData = metaData[IndexSelected];


    displayMetaData(selectedMetaData);


    hbarChart(selectedSample);
    bubbleChart(selectedSample);
}


function displayMetaData(demographicInfo){
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
        ethnicity: ${demographicInfo.ethnicity} <br>
        gender: ${demographicInfo.gender} <br>
        age: ${demographicInfo.age} <br>
        location: ${demographicInfo.location} <br>
        bbtype: ${demographicInfo.bbtype} <br>
        wfreq: ${demographicInfo.wfreq}`
    );
}


function hbarChart(SampleSelected){
    let x_axis = SampleSelected.sample_values.slice(0, 10).reverse();
    let y_axis = SampleSelected.otu_ids.slice(0, 10).reverse().map((item) => `OTU ${item}`);
    let text = SampleSelected.otu_labels.slice(0,10).reverse();
    let trace = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let data = [trace];

    let layout = {
        margin: {
            1: 80,
            r: 20,
            t: 0,
            b: 80,
        },
        height: 600,
        width: 800,
    };
    Plotly.newPlot("bar", data, layout);
}


function bubbleChart(SampleSelected){
    let x_axis = SampleSelected.otu_ids;
    let y_axis = SampleSelected.sample_values;
    let marker_size = SampleSelected.sample_values;
    let color = SampleSelected.otu_ids;
    let text = SampleSelected.otu_labels;

    let trace = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Hot",
            size: marker_size,
        },
        type: "scatter",
    };
    let data = [trace];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
        yaxis: {
            title: { text: "Sample Values" },
        }
    };
    Plotly.newPlot("bubble", data, layout);
}


function optionChanged(value){
    updateCharts(value);
}

updateCharts(sampleNames[0]);