// Ajouter OnInit pour effectuer des opérations à l'initialisation du composant.
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// Implémenter OnInit
export class AppComponent implements OnInit {

// Fonction d'initialisation du composant.
ngOnInit() {
        // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
        const map = L.map('testmap').setView([50.6311634, 3.0599573], 4);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: 'Test Map',
          maxZoom: 12
        }).addTo(map);

        var marker = new L.Marker(new L.LatLng(50.6311634, 3.0599573), {
          radius: 10
        });
        map.addLayer(marker);
  

}
}
