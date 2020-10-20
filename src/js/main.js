
//A json object to contain the relationship of counties and what city they are in.
let countyToCity = {}

//Austin Counties
countyToCity['Williamson'] = 'Austin';
countyToCity['Hays'] = 'Austin';
countyToCity['Bastrop'] = 'Austin';
countyToCity['Travis'] = 'Austin';

//Houston Counties
countyToCity['Harris'] = 'Houston';
countyToCity['Fort Bend'] = 'Houston';
countyToCity['Montgomery'] = 'Houston';

//Dallas Counties
countyToCity['Collin'] = 'Dallas';
countyToCity['Dallas'] = 'Dallas';
countyToCity['Denton'] = 'Dallas';
countyToCity['Tarrant'] = 'Dallas';
countyToCity['Rockwall'] = 'Dallas';

//San Antonio Counties
countyToCity['Bexar'] = 'San Antonio';
countyToCity['Medina'] = 'San Antonio';
countyToCity['Comal'] = 'San Antonio';

let covidDataset = [];

let dataPoints = {};

dataPoints['Austin'] = {};
dataPoints['Dallas'] = {};
dataPoints['Houston'] = {};
dataPoints['San Antonio'] = {};

//fetchData : fetch the covid data from the dataset.
//The data set is from the NYT, they post the data they use in their public github.
//https://github.com/nytimes/covid-19-data
async function fetchData(){

    //d3 is the imported library used to handle the csv data format. It is imported in the head element of the html document.
    covidDataset = await d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv");
}


//organizeData : organize the data in that was fetched in such a way that we can graph it!
function organizeData(){
    //Loop through each data entry we received from the data set and filter out the entries we don't care about.
    let previousMap = {};
    covidDataset.forEach(function(data){
        if (data['state'] !== 'Texas'){
            return; //Skip this data entry, we only care about Texas!
        }       
        let county = data['county'];
        if (!(county in countyToCity)){
            return;//The county is not in one of the states we care about!
        }
        let previous = 0;
        if (county in previousMap){
            previous = parseInt(previousMap[county]);
        }
        
        let city = countyToCity[county];
        if (data['date'] in dataPoints[city]){
            dataPoints[city][data['date']] += Math.max(0,(parseInt(data['cases'])-previous));
        }else{            
            dataPoints[city][data['date']] = Math.max(0,(parseInt(data['cases'])-previous));
        }
        previousMap[county] = data['cases'];
    });
}

//graphData : graph the data onto the web page using the chart.js library!
function graphData(){
    console.log(dataPoints);
}

async function a(){
    await fetchData();//Go gather the covid data.
    organizeData();//organize it so we are ready to graph it.
    graphData();//graph the data on the site!
}

a();