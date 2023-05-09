"use client"

import '../models/rates'
import '../models/sensors'

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRates } from '../components/useRates'
import { postData } from '../utils/api'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Sensor from '../components/sensors/sensor'



import SensorContainer from '../components/sensors/sensorContainer'
import RatesContainer from '../components/rates/ratesContainer'
import RatesPlaceholder from '../components/rates/ratesPlaceholder'
import RatesTitle from '../components/rates/ratesTitle'
import RateBox from '../components/rates/rateBox'
import RateValue from '../components/rates/rateValue'
import RateWeather from '../components/rates/rateWeather'
import RateTime from '../components/rates/rateTime'

export default function Home() {

  const [ratesData, setRatesData] = useState(Array<Rate>)
  const [sensorsData, setSensorsData] = useState(null)

  let dt = new Date()
  dt.setHours(0, 0, 0, 0)

  let dt2 = new Date()
  dt2.setHours(0, 0, 0, 0)
  dt2.setDate(dt2.getDate() + 2)

  const fetcher = async (url: string) => await fetch(url).then((res) => res.json());
  const [refresh, setRefresh] = useState(Date.now())

  const tomorrow = () => {
    let today = new Date()
    let tmrrw = new Date(today.setDate(today.getDate() + 1))
    tmrrw.setHours(0, 0, 0, 0)
    return tmrrw
  }

  useEffect(() => {
    const dataFetch = async () => {
      // const baseUrl = `http://127.0.0.1:8000`
      const baseUrl = `http://192.168.102.234:8040`
      const url = `${baseUrl}/octopus/rates_with_battery_schedule/AGILE-FLEX-22-11-25?period_from=${dt.toISOString()}&period_to=${dt2.toISOString()}&refresh=${refresh}`
      const data = await (await fetch(url)).json();
      setRatesData(data);
    };
    dataFetch();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {

      const dataFetch = async () => {
        const baseUrl = `http://192.168.102.234:8060`
        const url = `${baseUrl}/foxcloud/sensors`
        const data = await (await fetch(url)).json();
        setSensorsData(data[0]);
      };
      dataFetch();

    }, 10000);
    return () => clearInterval(interval);
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

  function filterToday(rate: Rate) {
    let date = new Date(rate.valid_from)
    let tmrrw = tomorrow()
    return date < tmrrw
  }

  function filterTomorrow(rate: Rate) {
    let date = new Date(rate.valid_from)
    let tmrrw = tomorrow()
    return date >= tmrrw
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>HomeBot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        {sensorsData && (
          <SensorContainer>
            <Sensor label="Solar" unit="kWh" value={sensorsData.pvPower}></Sensor>
            <Sensor label="SoC" unit="%" value={sensorsData.SoC}></Sensor>
            <Sensor label="Grid" unit="kWh" value={sensorsData.gridConsumptionPower}></Sensor>
            <Sensor label="Load" unit="kWh" value={sensorsData.loadsPower}></Sensor>
            <Sensor label="Last update" unit="" value={new Date(sensorsData.dat).toLocaleTimeString()}></Sensor>
          </SensorContainer>
        )}

        {ratesData && (

          <RatesPlaceholder>

            <RatesContainer>

              <RatesTitle day="today" />

              {ratesData.filter(filterToday).map((rate: Rate, index: number) =>
                <RateBox key={index} date_on={rate.scheduled} on_click={setSchedule}>
                  <RateValue v={rate.value_inc_vat} />
                  <RateWeather description={rate.weather} uv_index={rate.uv_index} />
                  <RateTime dt={rate.valid_from} />
                </RateBox>
              )}

            </RatesContainer>

            <RatesContainer>

              <RatesTitle day="tomorrow" />

              {ratesData.filter(filterTomorrow).map((rate: Rate, index: number) =>
                <RateBox key={index} date_on={rate.date_on} on_click={setSchedule}>
                  <RateValue v={rate.value_inc_vat} />
                  <RateWeather description={rate.weather} uv_index={rate.uv_index} />
                  <RateTime dt={rate.valid_from} />
                </RateBox>
              )}
              {ratesData.filter(filterTomorrow).length == 0 && (
                <h4>Data available after 4pm</h4>
              )}

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
