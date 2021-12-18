import Marker from '../components/marker.vue'
import Vue from 'vue'

const createHTMLMapMarker = ({ OverlayView = google.maps.OverlayView,  ...args }) => {
    class HTMLMapMarker extends google.maps.OverlayView {
        constructor() {
            super();
            this.latlng = args.latlng;
            this.img = args.img
            this.setMap(args.map);
        }
        

        createDiv() {
            this.div = document.createElement('div');
            this.div.style.position = 'absolute';
            this.div.innerHTML = `
                <div class="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-accent w-full h-full rounded-full opacity-20"></div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-accent w-5/6 h-5/6 rounded-full opacity-80"></div>
                    <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/6 h-4/6 rounded-full" src="${this.img}" alt="profile_picture">
                </div>
            `;
            google.maps.event.addDomListener(this.div, 'click', event => {
                google.maps.event.trigger(this, 'click');
            });
        }

        appendDivToOverlay() {
            const panes = this.getPanes();
            panes.overlayImage.appendChild(this.div);
        }

        positionDiv() {
            const point = this.getProjection().fromLatLngToDivPixel(this.latlng);
            if (point) {
                this.div.style.left = `${point.x}px`;
                this.div.style.top = `${point.y}px`;
            }
        }

        draw() {
            if (!this.div) {
                this.createDiv();
                this.appendDivToOverlay();
            }
            this.positionDiv();
            this.rotate();
        }

        remove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        }
        
        getPosition() {
            return this.latlng;
        }

        setMarkerPosition(newPosition: any) {
            this.latlng = newPosition;
            this.positionDiv();
        }

        getDraggable() {
        return false;
        }

        rotate() {
            if (this.div) {
                this.div.style.transform = `translate(30deg)`;
            }
            this.div.style.transform = `translate(30deg)`;
        }

    }
  
    return new HTMLMapMarker();
  };
  
  export default createHTMLMapMarker;