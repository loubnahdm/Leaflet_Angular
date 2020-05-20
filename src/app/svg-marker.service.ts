import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'rb-leaflet-dvf';
import 'leaflet-arrowheads';
import 'leaflet-polylinedecorator';
import $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class SvgMarkerService {
  stationsData: string = '/assets/data/stationImportant.json';

  constructor(private http: HttpClient) { }

  makesvgMarkers(map: L.map): void {
     //==========   Color Functions   ========
     var HSLHue =new L.HSLHueFunction(new L.Point(0, 120), new L.Point(100, 20));
     var Green =new L.RGBBlueFunction(new L.Point(0, 120), new L.Point(100, 20));
     var Blue =new L.RGBGreenFunction(new L.Point(0, 120), new L.Point(100, 20));
     var Blend =new L.RGBColorBlendFunction(new L.Point(0, 120), new L.Point(100, 20));
     var uminosity =new L.HSLLuminosityFunction(new L.Point(0, 120), new L.Point(100, 20));
     var Red =new L.RGBRedFunction(new L.Point(0, 120), new L.Point(100, 20));
     var Saturation =new L.HSLSaturationFunction(new L.Point(0, 120), new L.Point(100, 20));
    //  ==========================================================================
    this.http.get(this.stationsData).subscribe((res: any) => {
      for (const station of res.stations) {
        var marker = new L.MapMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), {
          radius: 10,
      
        }).bindTooltip(station.properties.NAME+ station.coordinates);
        // map.addLayer(marker);
        var myVector =  L.polyline([[51.39202,10.32477],[(51+station.coordinates[1])/2,(11+station.coordinates[0])/2],new L.LatLng(station.coordinates[1], station.coordinates[0])],{color:Green.evaluate(10),weight: 2, opacity: 1}).arrowheads( {yawn: 40,fill: true,frequency: 'endonly', size: '13%'} );
        myVector.addTo(map);
        myVector.deleteArrowheads();

        
        var decorator = L.polylineDecorator(myVector, {
            patterns: [
                // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                {endOffset:1,offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 5})}
                // {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({pixelSize: 10,pathOptions: { color: Blue.evaluate(10) }})}
                // {offset: 0, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
            ]
    
        });
        decorator.addTo(map);
        var options = {
          data: {
            'dataPoint1': Math.random() * 20,
            'dataPoint2': Math.random() * 20,
            'dataPoint3': Math.random() * 20,
            'dataPoint4': Math.random() * 20
          },
          chartOptions: {
            'dataPoint1': {
              fillColor: Saturation.evaluate(10),
              minValue: 0,
              maxValue: 20,
              maxHeight: 20,
              displayText: function (value) {
                return value.toFixed(2);
              }
            },
            'dataPoint2': {
              fillColor: Green.evaluate(10),
              minValue: 0,
              maxValue: 20,
              maxHeight: 20,
              displayText: function (value) {
                return value.toFixed(2);
              }
            },
            'dataPoint3': {
              fillColor: Red.evaluate(10),
              minValue: 0,
              maxValue: 20,
              maxHeight: 20,
              displayText: function (value) {
                return value.toFixed(2);
              }
            },
            'dataPoint4': {
              fillColor: HSLHue.evaluate(10),
              minValue: 0,
              maxValue: 20,
              maxHeight: 20,
              displayText: function (value) {
                return value.toFixed(2);
              }
            }
          },
          weight: 1,
          color: Saturation.evaluate(10) ,
          opacity: 1
          
    }

    if (station.coordinates[1] !== 51.39202 && station.coordinates[0] !== 10.32477 && station.coordinates[1] !== 52.85203 && station.coordinates[0] !== 13.6906) {
      var PieChartMarker = new L.PieChartMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options); 
      // map.addLayer(PieChartMarker);
      var RadialBarChartMarker = new L.RadialBarChartMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options);
      // map.addLayer(RadialBarChartMarker);
      var RadialMeterMarker = new L.RadialMeterMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options);
      // map.addLayer(RadialMeterMarker);



      var marker = new L.SVGMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), {
        svg: '/assets/SVG/f1.svg',
        setStyle: function (svg) {
           // Do something with the SVG element here
           $(svg).find('path').attr('fill', station.transformation.color);
           $(svg).find('path').attr('transform', 'translate('+station.transformation.X+','+station.transformation.Y+') rotate('+station.transformation.ANGLE+')');
           
        }
       
      }).bindTooltip(station.properties.NAME + ': '+ station.properties.DESCRIPTION).addTo(map);
    }
    else{
      var RegularPolygonMarker = new L.RegularPolygonMarker(new L.LatLng(51.39202, 10.32477), {
            numberOfSides: 4,
            color: '#FFE702',
            opacity: 1,
            rotation: 0,
            radius: 10
      });

      map.addLayer(RegularPolygonMarker);
      RegularPolygonMarker.bindTooltip("GasPool", {permanent: true, direction:"center"}).openTooltip();
     
     
      var marker = new L.SVGMarker(new L.LatLng(52.85203, 13.6906), {
        svg: '/assets/SVG/station.svg', 
      }).bindTooltip(station.properties.NAME + ': '+ station.properties.DESCRIPTION).addTo(map);
     
    }

      }
    });
  }
}
