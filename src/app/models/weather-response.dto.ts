export interface WeatherResponseDTO {
  location: {
    name: string;
    localtime: string;
    lat: number;
    lan: number;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
  };
}
