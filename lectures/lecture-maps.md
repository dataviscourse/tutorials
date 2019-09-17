---
layout: code-lecture
title:  Maps
permalink: /lectures/lecture-maps/
nomenu: true
---


Before we start talking about how to draw maps, a word of caution: maps are heavily over-used. A lot of information that is printed on top of maps would be better shown in another type of chart. If we compare data of the five largest cities in the US, we don't need to do that on a map, everyone knows where New York, Los Angeles, Chicago, Houston, and Philadelphia are, but if we plot this on a map we give up our most important visual channel: position. We're no longer free to place things where we want!

There are, however, cases, when the spatial position is paramount, and in this case you should definitely use a map. 

But let's get to how we can visualize data on top of maps with D3. Generally, there are two approaches:


 1. **Data Maps**: If you want to present data on an abstract map, e.g., only showing counties or state borders, D3 is the way to go! Data maps are mostly used for when you want to communicate trends and let users compare between different areas. In these maps you have full control over how the map is colored, and how to encode information onto the map. Typically, you can't zoom in to show more detail.
 2. **Street Map with Data**: If you want to show something in the context of a real street map, your best bet is to use something like the [Google Maps API](https://developers.google.com/maps/?hl=en) - [here's an example of how it's used with D3](http://bl.ocks.org/mbostock/899711), or the [OpenStreetMap API](http://wiki.openstreetmap.org/wiki/API). You can use D3 to draw things on top of those, but you'll mainly work with the API provided by the vendor. This is great if you need multiple levels of zoom, and if you really care about the position of an item, for example, if you visualize the ratings of a restaurant, it is convenient to also show it's exact location. 

We'll be taking about both street maps and data maps, giving examples of how to go about using each one.
 
## Data Maps

Let's start off talking about creating maps using purely D3. These maps are usually made with the intent of showing the distribution of data that has a meaningful geographic component. Examples include : 

 * [How the Flu Spread](https://fivethirtyeight.com/features/america-should-have-stayed-home-this-flu-season/)
 * [How Far Do You Live From Mom](https://www.nytimes.com/interactive/2015/12/24/upshot/24up-family.html)
* [Maps Showing the Impact of Hurricane Florence](https://www.nytimes.com/interactive/2018/09/13/us/hurricane-florence-impact-damage-map.html),
 * [A Map of Netflix Queues by Region](http://www.nytimes.com/interactive/2010/01/10/nyregion/20100110-netflix-map.html), 
 * [Reprojected Distruction](http://hanshack.com/aleppo/#berlin)
 * [What Music Americans Like to Listen To](https://www.nytimes.com/interactive/2017/08/07/upshot/music-fandom-maps.html?mcubz=1&_r=0#future),
  * [Every Possible way of Making an Election Map](https://www.nytimes.com/interactive/2016/11/01/upshot/many-ways-to-map-election-results.html), and last but not least, 
  * [Bars vs Grocery Stores](https://flowingdata.com/2014/05/29/bars-versus-grocery-stores-around-the-world/). 
  
In all these maps, the specific data and trends are the focus of the visualization. 

###  Geospatial Data Formats

Before we jump into rendering the map itself, let's take a look at the format in which geographic data is usually handled on the web: GeoJSON and TopoJSON. 

#### GeoJSON

The [GeoJSON format](http://geojson.org/) describes the contained geography as a combination of longitude and latitude coordinates, so that each entry forms a polygon.  The official definition, from [the spec](https://tools.ietf.org/html/rfc7946) is: 

*GeoJSON is a geospatial data interchange format based on JavaScript
   Object Notation (JSON).  It defines several types of JSON objects and
   the manner in which they are combined to represent data about
   geographic features, their properties, and their spatial extents.
   GeoJSON uses a geographic coordinate reference system, World Geodetic
   System 1984, and units of decimal degrees.*
   
   
  The valid types of GeoJSON objects are: 
  
  1. **Point** - a single position.

```json
{
  "type": "Point",
  "coordinates": [
    -105.01621,
    39.57422
  ]
}
```

2. **MultiPoint** - an array of positions.

```json
{
  "type": "MultiPoint",
  "coordinates": [
    [
      -105.01621,
      39.57422
    ],
    [
      -80.6665134,
      35.0539943
    ]
  ]
}
```

3. **LineString** - an array of positions forming a continuous line.

```json
{
  "type": "LineString",
  "coordinates": [
    [
      -101.744384765625,
      39.32155002466662
    ],
    [
      -101.5521240234375,
      39.330048552942415
    ],
    [
      -101.40380859375,
      39.330048552942415
    ],
    [
      -101.33239746093749,
      39.364032338047984
    ],
    [
      -101.041259765625,
      39.36827914916011
    ]
  ]
}
```

4. **MultiLineString** - an array of arrays of positions forming several lines.

```json
{
  "type": "MultiLineString",
  "coordinates": [
    [
      [
        -105.0214433670044,
        39.57805759162015
      ],
      [
        -105.02150774002075,
        39.57780951131517
      ],
      [
        -105.02157211303711,
        39.57749527498758
      ]
    ],
    [
      [
        -105.0142765045166,
        39.57397242286402
      ],
      [
        -105.01412630081175,
        39.57403858136094
      ]
    ]
  ]
}
```

5. **Polygon** - an array of arrays of positions forming a polygon (possibly with holes).

```json
{
  "type": "Polygon",
  "coordinates": [...]
}
```

6. **MultiPolygon** - a multidimensional array of positions forming multiple polygons.

```json
{
  "type": "MultiPolygon",
  "coordinates": [
    [
      [
        [
          -84.32281494140625,
          34.9895035675793
        ],...
      ]
    ]        
  ]
}      
```


7. **GeometryCollection** - an array of geometry objects.

```json
{
  "type": "GeometryCollection",
  "geometries": [
    {
      "type": "Point",
      "coordinates": [
        -80.66080570220947,
        35.04939206472683
      ]
    },
    {
      "type": "Polygon",
      "coordinates": [...]
    }
  ]
}
```

8. **Feature** - a feature containing one of the above geometry objects.

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -80.72487831115721,
          35.26545403190955
        ],...
       ]
      ]
  },
  "properties": {
    "name": "Plaza Road Park"
  }
}
```

9. **FeatureCollection** - an array of feature objects.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          -80.87088507656375,
          35.21515162500578
        ]
      },
      "properties": {
        "name": "ABBOTT NEIGHBORHOOD PARK",
        "address": "1300  SPRUCE ST"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -80.72487831115721,
              35.26545403190955
            ],
            [
              -80.72135925292969,
              35.26727607954368
            ]
          ]
        ]
      },
      "properties": {
        "name": "Plaza Road Park"
      }
    }
  ]
}
```

### TopoJSON

[TopoJSON](https://github.com/mbostock/topojson/wiki) is a topological geospatial data interchange format based on GeoJSON. Rather than representing geometries discretely, **geometries in TopoJSON files are stitched together from shared line segments** called arcs.

TopoJSON hence eliminates redundancy, offering much more compact representations of geometry than with GeoJSON; typical TopoJSON files are 80% smaller than their GeoJSON equivalents.

<!-- If we console.log what a topoJSON file looks like, this is an example of what we would see. 

![Alt Image Text](./images/topoJSON.png)  -->


If we open a topoJSON file in an editor, this is an example of what we would see. 


![Alt Image Text](./images/topoJSON_pretty.png) 


Because D3 only handles data in the GeoJSON format, there is a d3 library that does the job of converting TopoJSON to GeoJSON. 

```html
<script src="https://d3js.org/topojson.v3.js"></script>
```

The TopoJSON client API supports converting TopoJSON objects into GeoJSON for use in a web browser. From the documentation: 

Returns the GeoJSON Feature or FeatureCollection for the specified object in the given topology. If the specified object is a GeometryCollection, a FeatureCollection is returned, and each geometry in the collection is mapped to a Feature. Otherwise, a Feature is returned. The returned feature is a shallow copy of the source object: they may share identifiers, bounding boxes, properties and coordinates.

Some examples:

A point is mapped to a feature with a geometry object of type “Point”.
Likewise for line strings, polygons, and other simple geometries.
A null geometry object (of type null in TopoJSON) is mapped to a feature with a null geometry object.
A geometry collection of points is mapped to a feature collection of features, each with a point geometry.
A geometry collection of geometry collections is mapped to a feature collection of features, each with a geometry collection.


The usage is as follows:

```javascript
topojson.feature(topology, object-to-be-converted);

console.log(topojson.feature(topoJSON, topoJSON.objects.usStates))
```
![Alt Image Text](./images/topo2geo.png)

After converting topoJSON to geoJSON, remember that what you will want to feed into the .data() portion of your d3 code, is the geoJSON.features array. 

```javascript
let geoJSON = topojson.feature(topoJSON,topoJSON.objects.countries);
   
...
.data(geoJSON.features) 
```

### Using Projections 

Let's take a closer look at a GeoJSON file that contains data for the US States. Here is a [data file containing US states](us-states.json).

```json
{
   "type":  "FeatureCollection",
   "features":
   [
     {
       "type": "Feature",
       "id": "01",
       "properties": {"name": "Alabama"},
       "geometry": {
        "type": "Polygon",
        "coordinates": [[[-87.359296, 35.00118], [-85.606675, 34.984749], [-85.431413,34.124869],[-85.184951,32.859696], ...
 }
```

You can see that the coordinates are within the geometry object, and that the properties tell us that this is the shape representing Alabama.

You might be able to tell that the coordinates above use latitude and longitude - which are spherical coordinates! Mapping these onto a 2D surface like your screen in a sensible way requires a projection. There are many projections, with various advantages and disadvantages - we'll talk about them in class.
  
Here is an example of how to use projections to transform lat/lon values into screen coordinate pixel values: 
 
{% include code.html id="d3_projection" file="d3_projection.html" code="" js="false" preview="false" %}

 
 D3 supports a long list of projections, including: 
 
* d3.geoAlbers - the Albers equal-area conic projection.
* d3.geoAlbersUsa - a composite Albers projection for the United States.
* d3.geoAzimuthalEqualArea - the azimuthal equal-area projection.
* d3.geoAzimuthalEquidistant - the azimuthal equidistant projection.
* d3.geoConicConformal - the conic conformal projection.
* d3.geoConicEqualArea - the conic equal-area (Albers) projection.
* d3.geoConicEquidistant - the conic equidistant projection.
* conic.parallels - set the two standard parallels.
* d3.geoEquirectangular - the equirectangular (plate carreé) projection.
* d3.geoGnomonic - the gnomonic projection.
* d3.geoMercator - the spherical Mercator projection.

You can look at the projections in more detail:
*[Here is a showreel of all the projections supported by D3](http://bl.ocks.org/mbostock/3711652).
*[Here is an observable comparing overlap of d3 projections](https://observablehq.com/@d3/projection-comparison)

Once projected to screen coordinates, the polygons can be easily converted into an SVG path with [`d3.geoPath()`](https://github.com/d3/d3-geo/blob/master/README.md#geoPath). The `geoPath()` function is an SVG path generator that takes in any GeoJSON feature or geometry object, and returns a formatted SVG path. 
 

Here is a simple example of rendering the US states: 

{% include code.html id="d3_us_map" file="d3_us_map.html" code="" js="false" preview="true" %}

### Adding markers on top of D3 Map

Now that we have the base map, we can draw marks on top of maps, in this case the size of the [50 largest cities]({{site.baseurl}}/lectures/lecture-maps/us-cities.csv) in the US. Here are the first couple of lines of this file: 

```csv
rank,place,population,lat,lon
1,New York city,8175133,40.71455,-74.007124
2,Los Angeles city,3792621,34.05349,-118.245323
3,Chicago city,2695598,45.37399,-92.888759
4,Houston city,2099451,41.337462,-75.733627
```

{% include code.html id="d3_cities" file="d3_cities.html" code="" js="false" preview="true" %}

Here is an example for a choropleth map, coloring [each state by its agricultural output]({{site.baseurl}}/lectures/lecture-maps/us-ag-productivity-2004.csv). Here are the first couple of lines of this file: 

```csv
state,value
Alabama,1.1791
Arkansas,1.3705
Arizona,1.3847
California,1.7979
```
 
 The trick here is to join the data about the ouptut to the geography information:

{% include code.html id="d3_choropleth" file="d3_choropleth.html" code="" js="false" preview="true" %}



## Street Maps 
***

Now that we've seen how to create data maps purely with D3, let's take a look at street maps. These are used when the spatial context of your data is very import. That is, you care about the ability to navigate to a specific geographic location. You also get out of the box features such as zooming and panning. Examples of visualizations that use street maps include: 

* [Cities Replaced By Famous People](https://pudding.cool/2019/05/people-map),
* [White Collar Crime](https://whitecollar.thenewinquiry.com/#dr5rukp)
* [Where the Pies Are](http://www.nytimes.com/interactive/2009/07/07/dining/20090708-pizza-map.html)

 The most common street map used is the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial). 

 The key steps in getting a simple google map up and running on your web page are as follows: 

1. **[Get an API Key for use with Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key)** 

2. **Load the Google Map Javascript API using the ``<script>`` tag and using the newly created API key.** 

3. **Create a div element with an id that will be hold the map**

4. **Call the google.maps.Map endpoint to create a map inside our newly created div.**

Let's see this in action: 

{% include code.html id="google_map" file="google_map.html" code="" js="false" preview="true" %}


###  The Map Object

```javascript
map = new google.maps.Map(document.getElementById("map"), {...});
```

The map object defines a single map on the page. You must create a new object for each new instance of a map that you want on the page.  The parameters for the map constructor are as follows: 

```Map(mapDiv:Node, opts?:MapOptions )```
where mapDiv is the DIV element where you want the map to live and MapOptions are the parameters that are used for creating this map. Of these parameters, only two are required: **center, and zoom**. 

```javascript
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8,
  mapTypeId: 'terrain' // Optional
});
```

### Zoom Levels 

When you're setting the zoom levels programatically, it can be helpful to know how the numeric zoom level translates to the amount of detail your user can see in the map. Here is a helpful conversion table. 

Zoom Level  | Level of Detail       
------|------------------
1  	| World   
5  | Landmass/Continent   
10 | City  
15 | Streets 
20 | Buildings 

### Map Types 

The following map types are available in the API:

1. `roadmap` displays the default road map view. This is the default map type.
2. `satellite` displays Google Earth satellite images
3. `hybrid` displays a mixture of normal and satellite views
4. `terrain` displays a physical map based on terrain information.

You can also set the mapTypeID programatically (say as a result of a user action) with : 

```javascript
map.setMapTypeId('terrain');
```

### Styled Maps

Other than these basic customizations, you can go the extra mile and really change the look and feel of your google map with [Styled Maps](https://developers.google.com/maps/documentation/javascript/styling). 

A 'map styler' is provided [here](https://mapstyle.withgoogle.com/). 


![Alt Image Text](./images/styledMaps.png)

## Overlays - Adding D3 Visualizations to Google Maps

Once you have a google map set up, you might want to add a layer with your d3 visualization of geographic elements. This is where ***Overlays*** come in. 

Overlays are objects on the map that are tied to latitude/longitude coordinates, so they move when you drag or zoom the map. The Google Maps JavaScript API provides an OverlayView class for creating your own custom overlays.

![Alt Image Text](./images/overlayView_highlighted.png)


![Alt Image Text](./images/mapPanes_highlighted.png)


![Alt Image Text](./images/mapCanvas_highlighted.png)


The steps to create a custom overlay are: 

1. Create a new instance of google.maps.OverlayView(). 
2. Implement an onAdd() method on your instance of OverlayView. OverlayView.onAdd() will be called when the map is ready for the overlay to be attached. In the onAdd() method, you should create DOM objects and append them as children of the panes.
3. Implement a draw() method on your instance of OverlayView() which handles the visual display of your object. OverlayView.draw() will be called when the object is first displayed.
4. Attach the overlay to the map with OverlayView.setMap(map).

You must call setMap() with a valid Map object to trigger the call to the onAdd() method. The setMap() method can be called at the time of construction or at any point afterward when the overlay should be re-shown after removing. The draw() method will then be called whenever a map property changes that could change the position of the element, such as zoom, center, or map type.


<!--### A quick note on d3.entries()

When dealing with javascript objects (such as json data) we often want to extract the key/value pairs and use them for positioning and labeling our markers in our svg. 

We can use d3.entries() which returns an array containing the property keys and values of the specified object (an associative array). Each entry is an object with a key and value attribute, such as {key: "foo", value: 42}. The order of the returned array is undefined.
-->

Let's step through an example of the steps above as we look at Recorded UFO Sightings from 1965 - 2013. 

We've retrieved the sighting data from [kaggle](https://www.kaggle.com/NUFORC/ufo-sightings). Here is what the data looks like: 

```
datetime,city,state,country,shape,duration,duration (hours/min),comments,date posted,latitude,longitude
10/7/1965 10:00,reseda,ca,us,disk,180,3 minutes,"Formation of disks decending behind trees w/multiple witnesses",9/24/2012,34.2011111,-118.5355556
10/7/1967 22:00,lantana,fl,us,other,180,3minutes,"UFO report and theory of motion.",11/28/2007,26.5863889,-80.0522222
10/7/1971 01:00,kitchener (canada),on,ca,disk,2700,45 min,"A very bright &#44 horizontal elliptical disk aprox. the length of a yardstick held at arms length&#44 hovered one hundred feet  away.",7/13/2005,43.45,-80.5
10/7/1973 21:00,beruit (lebanon),,,unknown,900,15 minutes,"Iwas serving aboard the U.S.S. Mount Whitney&#44 during the October War between Israel&#44 Egypt&#44 and Seria. I was a radarman&#44 and I reported",4/16/2005,33.888629,35.495479
10/7/1974 19:50,yakima,wa,us,cone,2400,40 minutes,"Huge search light beam from 4 miles high in the sky illuminating a one mile diameter circle on the ground.",5/12/2009,46.6022222,-120.5047222
10/7/1982 23:00,new haven,ct,us,triangle,600,10 minutes,"I&#44 and another individual&#44 observed a triangular-shaped&#44 multi-colored&#44 silent object slowly traverse the night sky of New Haven&#44 Conn.",5/11/2005,41.3080556,-72.9286111
10/7/1984 19:00,chigwell essex (uk/england),,,other,15,15 seconds,"High Altitude RED fast moving (later violently manouvering) oval/ bean shaped object Essex UK",10/27/2004,51.626281,0.080647
10/7/1987 22:00,liverpool (uk/england),,gb,light,10,10 seconds,"Orange&#44 gliding ball of light shone into my bedroom window.",6/12/2008,53.416667,-3
```


{% include code.html id="d3_google_map_ufo" file="d3_google_map_ufo.html" code="" js="false" preview="true" %}


