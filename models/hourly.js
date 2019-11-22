
class Hourly {
constructor(obj) {
  (this.time = obj.time),
    (this.summary = obj.summary),
    (this.icon = obj.icon),
    (this.precipIntensity = obj.precipIntensity),
    (this.precipProbability = obj.precipProbability),
    (this.temperature = obj.temperature),
    (this.humidity = obj.humidity),
    (this.pressure = obj.pressure),
    (this.windSpeed = obj.windSpeed),
    (this.windGust = obj.windGust),
    (this.windBearing = obj.windBearing),
    (this.cloudCover = obj.cloudCover),
    (this.visibility = obj.visibility);
}
}

module.exports = Hourly;
