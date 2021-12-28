
window.onload = init;

function init(){
    const map = new ol.Map({
        target: 'map',
        layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
        ],
        view: new ol.View({
        center: ol.proj.fromLonLat([13.159265435311333, 49.9587696519653]),
        zoom: 18
        })
    });
    
    //Layer styles
    const pStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [255, 0, 0, 1]
            }),
            stroke: new ol.style.Stroke({
                width: 2.5, 
                color: [0, 0, 0, 1]
        })
      })
    })
    // Přidána vekotorová vrstva bodů
    const body = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/trigonometrickebody.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'trigonometrickebody.geojson',
        style: pStyle
        })
    
    
    map.addLayer(body);

    // Vector Feature popup
    const overlayContainerElement = document.querySelector('.overlay-container')
    const overlayLayer = new ol.Overlay({
        element: overlayContainerElement
    })
    map.addOverlay(overlayLayer)
    const overlayFeatureBod = document.getElementById('feature-bod');
    const overlayFeatureSouradnice_x = document.getElementById('feature-souradnice_x');
    const overlayFeatureSouradnice_y = document.getElementById('feature-souradnice_y');


    map.on('click', function(e){
        overlayLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
            let clickedCoordinate = e.coordinate;
            let clickedFeatureBod = feature.get('bod');
            let clickedFeatureSouradnice_x = feature.get('souradnice_x');
            let clickedFeatureSouradnice_y = feature.get('souradnice_y');
            overlayLayer.setPosition(clickedCoordinate);
            overlayFeatureBod.innerHTML = clickedFeatureBod;
            overlayFeatureSouradnice_x.innerHTML = clickedFeatureSouradnice_x;
            overlayFeatureSouradnice_y.innerHTML = clickedFeatureSouradnice_y;
            },
        {
            layerFilter: function(layerCandidate){
                return layerCandidate.get('title') === 'trigonometrickebody.geojson'
            }
        })
            
    })
}