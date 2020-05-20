// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SvgMarkerService } from './svg-marker.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// Implémenter OnInit
export class AppComponent implements OnInit {
  constructor(private svgmarkerService: SvgMarkerService) {
  }
  private map;
// Fonction d'initialisation du composant.
ngOnInit() {
        // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
        this.map = L.map('testmap').setView([51.39202,10.32477],6);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Test Map',
          maxZoom: 6,
          minZoom: 6
        }).addTo(this.map);

        var marker = new L.Marker(new L.LatLng(50.6311634, 3.0599573), {
          radius: 10
        });
        // this.map.addLayer(marker);
  
        this.svgmarkerService.makesvgMarkers(this.map);
}

}
