import worker from './locations-worker.js';

export default class LocationsService {
  constructor() {
    this.watcherId = '';
    const code = worker.toString();
    const blob = new Blob([`(${code})()`]);
    this.locationsWorker = new window.Worker(URL.createObjectURL(blob));
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onSuccess = (latlng) => {

  }

  _successCallBack = (position) => {
    this.onSuccess(this.buildLatLng(position))
  }

  _errorCallBack = (err) => { }

  getCurrentPosition() {
    return navigator.geolocation.getCurrentPosition(this._successCallBack, this._errorCallBack, { enableHighAccuracy: true, maximumAge: 10000 })
  }

  watchPosition() {
    console.log(this.locationsWorker)
    this.locationsWorker.onmessage = (canTrigger) => {
      navigator.geolocation.getCurrentPosition(this._successCallBack,
        this._errorCallBack,
        { enableHighAccuracy: true, maximumAge: 10000 }
      )
    }
  }

  buildLatLng(pos) {
    var crd = pos.coords;
    return { lat: crd.latitude, lng: crd.longitude }
  }
}