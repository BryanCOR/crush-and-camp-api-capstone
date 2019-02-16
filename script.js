function pg2HTML() {
    return `<main>
    <div class="locationDiv">
      <h4>Where do you want to climb then camp?</h4>
      <button id="useMyLocation">USE MY LOCATION</button>
      
      <form class="locationInputForm">  
      
        <div class="locationInputDiv">
          
          <label>Location Entry </label><input type="text" id="locationTextInput" placeholder="City, State or Zip Code">
          <button type="submit" id="locationInputSubmitButton">Submit</button>
        
        </div>

        <div class="radiusInputDiv">
          <label>Select Search Radius </label><select>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </select><label>miles</label>
        </div>
      </form>
     </div>   

      

  <div class="mapRenderDiv">
    <image class="mapImageStyle" src="https://images.pexels.com/photos/1165676/pexels-photo-1165676.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">

    <div class="routeDetailRender">
      
      <p>This is where the route information will render in radio button form</p>
        <input type="radio" value="route1"><label>Route #1</label>
        <input type="radio" value="route2"><label>Route #2</label>
        <input type="radio" value="route3"><label>Route #3</label>
      
    </div>


      <div class="cmpgrdDetailRender">
        <p>This is where the campground information will render in radio button form</p>
        <form class="cmpgrdSelectRadio">
        
          <input type="radio" name="cmpgroundSelector" value="cmpgrd1"><label>CmpGrd1</label>

          <input type="radio" name="cmpgroundSelector" value="cmpgrd2"><label>CmpGrd2</label>

          <input type="radio" name="cmpgroundSelector" value="cmpgrd3"><label>CmpGrd3</label>


          </form>

      </div>

  </div>

  <div class="campGenerateDiv">
    <p>Map your selections with a click of a button:</p>

    <button id="selectionMappingButton">Mix your Camp & Crash Cocktail</button>


  </div>

</main>`
};

function pg3HTML() {
    return `<main>
      
    <div class="mapRenderDiv">
      <image class="mapImageStyle" src="https://images.pexels.com/photos/1165676/pexels-photo-1165676.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500">

      <div class="cmpgrdDetailRender">
        <p>This is where the campground information will render in radio button form</p>
        <form class="cmpgrdSelectRadio">
          
          <input type="radio" name="cmpgroundSelector" value="cmpgrd1"><label>CmpGrd1</label>

          <input type="radio" name="cmpgroundSelector" value="cmpgrd2"><label>CmpGrd2</label>

          <input type="radio" name="cmpgroundSelector" value="cmpgrd3"><label>CmpGrd3</label>


        </form>
        

      </div>

    </div>

    <div class="campGenerateDiv">
      <p>Map your selections with a click of a button:</p>

      <button id="selectionMappingButton">Mix your Camp & Crash Cocktail</button>

    </div>
  </main>`
};

const MTP_API_URL = 'https://www.mountainproject.com/data/get-routes-for-lat-lon?';


//successfully tested the following until next comment in Replit. It works!
function getMTPAPI(latitude, longitude) {
    const query = {
        url: MTP_API_URL,
        type: 'GET',
        datatype: 'JSON',
        data: {
            lat: 45,
            lon: -120,
            maxDistance: 100,
            maxResults: 10,
            minDiff: 5.10,
            maxDiff: 5.12,
            key: '110813283-0c931da562d47906fd27625cd113513c'
        },
        success:function(data) {
          return receiveAndPrint(data);
        }
    }

    $.ajax(query);
}

function receiveAndPrint(data) {
  console.log("your object is:" + JSON.stringify(data, null, 4));
}


$(getMTPAPI);
//end MTPAPI test here.

//start cmpgrdAPI test here.
function getCmpGrdAPI() {
  console.log('testingTwo');
  const settings = {
    url: 'https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?',
    data: {
      landmarkLat: '45.345',
      landmarkLong: '-120.123',
      landmarkName: 'true',
      api_key: 'm9vs7bkgcfgmkheuqcrxjmxh'
    },
    dataType: 'xml',
    method: 'GET',
    success: function(xml) {
      console.log('test three');
      let results = xml.getElementsByTagName('result');
      for(let i = 0; i < 10; i++) {
        let cmpLocation = {};
        let cmpGrdNme = results[i].getAttribute('facilityName');
        let cmpLat = results[i].getAttribute('latitude');
        let cmpLong = results[i].getAttribute('longitude');
        
        cmpLocation.name = cmpGrdNme;
        cmpLocation.latitude = cmpLat;
        cmpLocation.longitude = cmpLong;

        console.log(cmpLocation); //prints name, lat, long in object form.
      };
      
    },
    error: function(){console.log('error')}
  };

 
  
  $.ajax(settings);
};