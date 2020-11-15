import React, { useEffect, useState } from 'react';
import './ExploreContainer.css';
import axios from 'axios';

interface ContainerProps {
  name: string;
}

interface IWeather {
  date: Date;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const [weathers, setWathers] = useState<IWeather[]>([]);

  useEffect(() => {
    const loadData = async() => {
      const { data } = await axios.get<IWeather[]>('https://localhost:5001/')
      setWathers(data);
    }
    loadData()
  }, []);

  return (
    <div className="container">
      <h1>{name}</h1>
      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>Date</th>
            <th>TemperatureC</th>
            <th>TemperatureF</th>
          </tr>
        </thead>
        <tbody>
          {
            weathers.map((weather, index) => (
              <tr key={index}>
                <td>{weather.summary}</td>
                <td>{new Date(weather.date).toLocaleDateString('pt-BR')}</td>
                <td>{weather.temperatureC}</td>
                <td>{weather.temperatureF}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default ExploreContainer;
