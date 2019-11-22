class Daily {
  constructor(obj) {
    (this.time = obj.time),
      (this.summary = obj.summary),
      (this.icon = obj.icon),
      (this.sunriseTime = obj.sunriseTime),
      (this.sunsetTime = obj.sunsetTime),
      (this.precipIntensity = obj.precipIntensity),
      (this.precipIntensityMax = obj.precipIntensityMax),
      (this.precipIntensityMaxTime = obj.precipIntensityMaxTime),
      (this.precipProbability = obj.precipProbability),
      (this.precipType = obj.precipType),
      (this.temperatureHigh = obj.temperatureHigh),
      (this.temperatureLow = obj.temperatureLow),
      (this.humidity = obj.humidity),
      (this.pressure = obj.pressure),
      (this.windSpeed = obj.windSpeed),
      (this.windGust = obj.windGust),
      (this.cloudCover = obj.cloudCover),
      (this.visibility = obj.visibility),
      (this.temperatureMin = obj.temperatureMin),
      (this.temperatureMax = obj.temperatureMax);
  }
}

module.exports = Daily;
