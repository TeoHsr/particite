import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements AfterViewInit {
  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize(); // Ensures all tiles are loaded correctly
      }
    }, 500); // Delay to ensure the DOM is ready
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [43.3497, 1.3006], // Coordinates for Longages
      zoom: 13
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
