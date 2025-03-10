import { useState, useEffect } from 'react';
import BarChart from './components/BarChart';
import './index.css';

// InfoBoksin propsien tyyppien määritys
interface InfoBoksiProps {
  otsikko: string;
  hinta: string;
}

const InfoBoksi = ({ otsikko, hinta } : InfoBoksiProps) => {
  return (
    <div className="boksi">
      <b>
        <p>{otsikko}</p>
      </b>
      <p>{hinta}</p>
    </div>
  );
};

// Json-tiedostosta haettavan tiedon tyyppi
interface Tieto {
  timestamp: Date;
  price: number;
  deliveryArea: string;
  unit: string;
}

function App() {

  const [tiedot, setTiedot] = useState<Tieto[]>([]);

  // tietojen hakeminen tilaan spot-data.json -tiedostosta
  useEffect(() => {
    fetch('./spot-data.json')
      .then((response) => response.json())
      .then((res: Tieto[]) => {
        setTiedot(res); // Asetetaan tyypitetty data tilaan
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  console.log('haettu data: ', tiedot);

  // Hintojen laskeminen ja muuntaminen
  const hinnat: number[] = tiedot.map((tieto) =>
    parseFloat((tieto.price / 10 * 1.255).toFixed(2))
  );
  console.log(hinnat);

  // keskiarvon, halvimman sekä kalleimman hinnan sekä niiden ajankohdan selvittäminen
  let ka: number = 0;
  let halvin: number = 0;
  let kallein: number = 0;
  let halvintunti: number | null = null;
  let kalleintunti: number | null = null;

  if (hinnat.length !== 0) {
    ka = hinnat.reduce((summa, luku) => summa + luku) / hinnat.length;
    halvin = Math.min(...hinnat);
    kallein = Math.max(...hinnat);
    halvintunti = hinnat.findIndex((x) => x === halvin);
    kalleintunti = hinnat.findIndex((x) => x === kallein);
  }

  console.log(halvintunti);
  console.log(halvin, kallein, ka);

  // Tunnit kuvaajaan
  const labels = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  return (
    <div className="main">
      <h1>Akamon - Spothinta <br/> ohjelmointitehtävä</h1>

      <div className="boksiContainer">
        <InfoBoksi
          otsikko={`Halvin tunti ${labels[halvintunti ?? 0]}`}
          hinta={`${halvin} snt/kWh`}
        />
        <InfoBoksi
          otsikko={`Kallein tunti ${labels[kalleintunti ?? 0]}`}
          hinta={`${kallein} snt/kWh`}
        />
        <InfoBoksi otsikko={`Keskiarvo`} hinta={`${ka.toFixed(2)} snt/kWh`} />
      </div>

      <div className="kuvaajaContainer">
        <div className="kuvaaja">
          <BarChart data={hinnat} labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default App;
