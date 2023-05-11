import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { postData } from '../utils/api'
import { useState, useEffect } from 'react'
import NumberSensor from '../components/sensors/NumberSensor'
import DateSensor from '../components/sensors/DateSensor'
import RatesContainer from '../components/rates/ratesContainer'
import RatesPlaceholder from '../components/rates/ratesPlaceholder'
import RatesTitle from '../components/rates/ratesTitle'
import { Rate, SensorData, EnergyData, DayEnum, RateSensorDisplayEnum } from '../models/types'
import RatesData from '../components/rates/ratesData'
import SensorContainer from '../components/sensors/sensorContainer'
import StatusSensor from '../components/sensors/StatusSensor'
import RateSensor from '../components/sensors/RateSensor'

export default function Home() {

  let sd: SensorData 
  let ed: EnergyData

  const [ratesData, setRatesData] = useState(Array<Rate>)
  const [sensorData, setSensorData] = useState(sd)
  const [energyData, setEnergyData] = useState(ed)  
  const [refresh, setRefresh] = useState(Date.now())

  const sensorDataFetch = async () => {
    try {
      const baseUrl = `http://192.168.102.234:8060`
      const url = `${baseUrl}/foxcloud/sensors`
      const data = await (await fetch(url)).json();
      setSensorData(data[0]);
    } catch (error) {
      console.log(error)
    }
  };

  const energyDataFetch = async () => {
    try {
      const baseUrl = `http://192.168.102.234:8060`
      const url = `${baseUrl}/foxcloud/sensors/energy_last_hour`
      const data = await (await fetch(url)).json();
      setEnergyData(data[0]);
    } catch (error) {
      console.log(error)
    }
  };

  const ratesDataFetch = async () => {
    try {
      let dt = new Date()
      dt.setHours(0, 0, 0, 0)
      let dt2 = new Date()
      dt2.setHours(0, 0, 0, 0)
      dt2.setDate(dt2.getDate() + 2)
      // const baseUrl = `http://127.0.0.1:8000`
      const baseUrl = `http://192.168.102.234:8040`
      const url = `${baseUrl}/octopus/rates_with_battery_schedule/AGILE-FLEX-22-11-25?
      period_from=${dt.toISOString()}&period_to=${dt2.toISOString()}&refresh=${refresh}`
      const data = await (await fetch(url)).json()
      setRatesData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    sensorDataFetch()
    energyDataFetch()
    const interval = setInterval(() => {
      sensorDataFetch()
      energyDataFetch()
    }, 1 * 10 * 1000);
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    ratesDataFetch()
    const interval = setInterval(() => {
      ratesDataFetch()
    }, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, []);

  const setSchedule = (rate_date: Date, e: React.MouseEvent<HTMLElement>) => {

    let url = "http://192.168.102.234:8060/foxcloud/battery_schedule/set"
    //let url = "http://127.0.0.1:8050/foxcloud/battery_schedule/set"  

    let tzAwareDate = new Date(rate_date)

    postData(url, { "dt": tzAwareDate }).then(
      (resp) => {
        try {
          if (resp == "OK") {
            console.log("Success")

            let index = ratesData.findIndex(i => i.valid_from.toString() == rate_date.toString())
            let rd = ratesData

            if (ratesData[index].scheduled == null) {
              rd[index].scheduled = rate_date
            } else {
              rd[index].scheduled = null
            }

            setRatesData(rd)
            setRefresh(Date.now())

            return true
          } else {
            console.log("Fail")
            return false
          }
        } catch (error) {
          console.log(error)
          return false
        }
      })
    return false
  }
  
  if(energyData) console.log(energyData)

  return (
    <div className={styles.container}>

      <Head>
        <title>HomeBot</title>
      </Head>

      <main className={styles.main}>

        {sensorData && energyData && (
          <SensorContainer>
            <NumberSensor
              label="Solar Power"
              unit="kW"
              dp={3}
              redThreshold={0}
              amberThreshold={.700}
              thresholdAscending={true}
              value={sensorData.pvPower}
            />
            <NumberSensor
              label="Solar Energy"
              unit="kWh"
              dp={3}
              redThreshold={0}
              amberThreshold={.700}
              thresholdAscending={true}
              value={energyData.input}
            />            
            <NumberSensor
              label="Grid Power"
              unit="kW"
              dp={3}
              value={sensorData.gridConsumptionPower}
              redThreshold={0.70}
              amberThreshold={1}
              thresholdAscending={false}
            />
            <NumberSensor
              label="Grid Energy"
              unit="kWh"
              dp={3}
              value={energyData.gridConsumption}
              redThreshold={0.70}
              amberThreshold={1}
              thresholdAscending={false}
            />            
            <NumberSensor
              label="Load Power"
              unit="kW"
              dp={3}
              value={sensorData.loadsPower}
              redThreshold={2.4}
              amberThreshold={1.2}
              thresholdAscending={false}
            />
            <NumberSensor
              label="Load Energy"
              unit="kWh"
              dp={3}
              value={energyData.loads}
              redThreshold={2.4}
              amberThreshold={1.2}
              thresholdAscending={false}
            />            
            <NumberSensor
              label="Charge Power"
              unit="kW"
              dp={3}
              value={sensorData.batChargePower}
              redThreshold={0}
              amberThreshold={.5}
              thresholdAscending={true}
            /> 
            <NumberSensor
              label="Charge Energy"
              unit="kWh"
              dp={3}
              value={energyData.chargeEnergyToTal}
              redThreshold={0}
              amberThreshold={.5}
              thresholdAscending={true}
            />             
            <RateSensor
              label="Battery Full"
              dp={3}
              display={RateSensorDisplayEnum.ActualTime}
              currentValue={sensorData.SoC * .125}
              rateValue={energyData.chargeEnergyToTal}
              ascending={true}
              targetValue={12.5}
            />                   
            <NumberSensor
              label="Discharge Power"
              unit="kW"
              dp={3}
              value={sensorData.batDischargePower}
              redThreshold={2}
              amberThreshold={1}
              thresholdAscending={false}
            />
            <NumberSensor
              label="Discharge Energy"
              unit="kWh"
              dp={3}
              value={energyData.dischargeEnergyToTal}
              redThreshold={2}
              amberThreshold={1}
              thresholdAscending={false}
            />            
            <RateSensor
              label="Time Empty"
              dp={3}
              display={RateSensorDisplayEnum.ActualTime}
              currentValue={sensorData.SoC * .125}
              rateValue={energyData.dischargeEnergyToTal}
              ascending={false}              
              targetValue={1.25}
            />              
            <NumberSensor
              label="SoC"
              unit="%"
              dp={0}
              value={sensorData.SoC}
              redThreshold={30}
              amberThreshold={60}
              thresholdAscending={true}
            />                                
            <StatusSensor
              label="Status"
              sensorData={sensorData}
            />
            <DateSensor
              label="Last update"
              value={new Date(sensorData.dat)}
              redThreshold={{ date: new Date(), seconds: 360 }}
              amberThreshold={{ date: new Date(), seconds: 240 }}
            />
          </SensorContainer>
        )}

        {ratesData && (
          <RatesPlaceholder>
            <RatesContainer>
              <RatesTitle day={DayEnum.Today} />
              <RatesData day={DayEnum.Today} ratesData={ratesData} on_click={setSchedule} />
            </RatesContainer>
            <RatesContainer>
              <RatesTitle day={DayEnum.Tomorrow} />
              <RatesData day={DayEnum.Tomorrow} ratesData={ratesData} on_click={setSchedule} />
            </RatesContainer>
          </RatesPlaceholder>
        )}

      </main>

      <footer className={styles.footer}>
        &copy; Chillywasher Productions 2023
      </footer>

    </div>
  )
}
