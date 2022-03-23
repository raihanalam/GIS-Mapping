
window.onload = init;

function init(){
     const map = new ol.Map({
          view: new ol.View({
               center: [ 50125749.54368015, 2749963.341717012 ],
               zoom: 7,
               maxZoom:10,
               minZoom: 4,
               rotation:0.5
          }),
          /*layers: [
               new ol.layer.Tile({
                    source: new ol.source.OSM()
               })
          ],*/
          target: 'js-map'
     })


     //Base Maps
     const openStreetMapStandard = new ol.layer.Tile({
          source: new ol.source.OSM(),
          visible: true,
          title: 'OSMStandard'
     })

     /*
     //For checking coordinates of clicking points
     map.on('click', function(e){
          console.log(e.coordinate);
     })
     */
    const openStreetMapHumanitarian = new ol.layer.Tile({
         source: new ol.source.OSM({
              url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
         }),
         visible: false,
         title: 'OSMHumanitarian'
    })


    const stamenTerrain = new ol.layer.Tile({
         source: new ol.source.XYZ({
              url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
         }),
         visible: false,
         title: 'StamenTerrain',
    })
    //map.addLayer(stamenTerrain)
    const baseLayerGroup = new ol.layer.Group({
         layers: [
              openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain
         ]
    })

    map.addLayer(baseLayerGroup);
    const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]');

    for(let baseLayerElement of baseLayerElements){
         baseLayerElement.addEventListener('change',function(){
              let baseLayerElementValue = this.value;
              baseLayerGroup.getLayers().forEach((element,index, array) => {
                   let baseLayerTitle = element.get('title') ;
                   element.setVisible(baseLayerTitle === baseLayerElementValue);
                   //console.log(baseLayerTitle === baseLayerElementValue);
                   console.log(element.get('title'),element.get('visible'));

              });
         })
    }

    //Vector layer


    const fillStyle =new ol.style.Fill({
         color: [84,118,255,1]
    })

    const strokeStyle = new ol.style.Stroke({
         color: [46,45,45,1],
         width: 1.2
    })

    const circleStyle = new ol.style.Circle({
         fill: new ol.style.Fill({
              color: [245, 49, 6, 1]
         }),
         radius:7,
         stroke: strokeStyle

    })
    const BnagldeshGeoJSON = new ol.layer.VectorImage({
         source: new ol.source.Vector({
              url: './data/vector_data/Bengal.geojson',
              format: new ol.format.GeoJSON()
         }),
         visible: true,
         title: 'BengalGeoJSON',

         //Giving style
         style: new ol.style.Style({
               fill: fillStyle,
               stroke: strokeStyle,
               image: circleStyle
         })
    })

    map.addLayer(BnagldeshGeoJSON)

}