import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRates } from '../components/useRates'
import { postData } from '../utils/api'
import { useState } from 'react'
import useSWR from 'swr'

type Rate = {
  value_inc_vat: number,
  valid_from: Date,
  date_on: Date,
  weather: string,
  uv_index: number,
}

type RateBoxProps = {
  children?: React.ReactNode,
  date_on: Date
}

type RateValueProps = {
  v: number
}

type RateTimeProps = {
  dt: Date
}

type RateWeatherProps = {
  description: string,
  uv_index: number
}

type useRatesProps = {
  period_from: Date,
  period_to: Date
}



export default function Home() {


  let dt = new Date()
  dt.setHours(0, 0, 0, 0)

  let dt2 = new Date()
  dt2.setHours(0, 0, 0, 0)
  dt2.setDate(dt2.getDate() + 2)

  console.log(dt, dt2)

  const fetcher = async (url: string) => await fetch(url).then((res) => res.json());
  const [refresh, setRefresh] = useState(new Date())
  const baseUrl = `http://127.0.0.1:8000`
  // const baseUrl = `http://192.168.102.234:8040`
  const url = `${baseUrl}/octopus/rates_with_battery_schedule/AGILE-FLEX-22-11-25?period_from=${dt.toISOString()}&period_to=${dt2.toISOString()}&refresh=${refresh}`    
  const { data, error, isLoading } = useSWR(url, fetcher)


  const printToday = () => {
    return dt.toLocaleDateString("en-GB", { "weekday": "long", "day": "numeric", "month": "long" })
  }

  const printTomorrow = () => {
    let tmrrw = tomorrow()
    return tmrrw.toLocaleDateString("en-GB", { "weekday": "long", "day": "numeric", "month": "long" })
  }

  const tomorrow = () => {
    let today = new Date()
    let tmrrw = new Date(today.setDate(today.getDate() + 1))
    tmrrw.setHours(0, 0, 0, 0)
    return tmrrw
  }

  const setSchedule = (rate_date: Date, e: React.MouseEvent<HTMLElement>) => {

    let url = "http://192.168.102.234:8060/foxcloud/battery_schedule/set"
    //let url = "http://127.0.0.1:8050/foxcloud/battery_schedule/set"  

    postData(url, { "dt": rate_date }).then(
      (data) => {
        try {
          if (data == "OK") {
            console.log("Success")
            setRefresh(new Date())

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

  function getColorFromValue(value: number) {
    if (value <= 12) return "green"
    if (value <= 20) return "#FF00FF"
    if (value <= 25) return "#000066"
    if (value <= 30) return "#333333"
    return "#000000"
  }

  function getBorderColor(rate_date: Date, date_on: Date, value: number) {
    if (date_on != null) return "lime"
    let now = new Date()
    let dt2 = new Date(rate_date.getTime() + 1800000)
    if (now >= rate_date && now < dt2) return "yellow"
    return getColorFromValue(value)
  }

  function RateBox(props: RateBoxProps) {

    let rate_date = props.children[2].props.dt
    let value = props.children[0].props.v

    let bg = getColorFromValue(value)
    let bc = getBorderColor(rate_date, props.date_on, value)

    return (
      <div
        className={styles.rate_box}
        onClick={e => setSchedule(rate_date, e)}
        style={{ "backgroundColor": bg, "borderColor": bc }}>
        {props.children}
      </div>
    )
  }

  function RateValue(props: RateValueProps) {
    return (
      <h2>{props.v.toFixed(2)}</h2>
    )
  }

  function RateTime(props: RateTimeProps) {
    let local = new Date(props.dt)
    return (
      <h3>
        {local.getHours().toString().padStart(2, '0')}:
        {local.getMinutes().toString().padStart(2, '0')}
      </h3>
    )
  }

  function RateWeather(props: RateWeatherProps) {
    return (
      <div className={styles.rate_weather}>
        {props.description}
        <div className={styles.uv_emblem}>{props.uv_index}</div>
      </div>
    )
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
        <h1>Octopus Agile</h1>



        {!isLoading && (


          <div style={{ "display": "flex" }}>


            <div className={styles.rates}>

              <div style={{ "flex": "100%" }}><h2>{printToday()}</h2></div>

              {data.filter(filterToday).map((rate: Rate, index: number) =>
                <RateBox key={index} date_on={rate.date_on}>
                  <RateValue v={rate.value_inc_vat} />
                  <RateWeather description={rate.weather} uv_index={rate.uv_index} />
                  <RateTime dt={new Date(rate.valid_from)} />
                </RateBox>
              )}

            </div>


            <div className={styles.rates}>

              <div style={{ "flex": "100%" }}><h2>{printTomorrow()}</h2></div>

              {data.filter(filterTomorrow).map((rate: Rate, index: number) =>
                <RateBox key={index} date_on={rate.date_on}>
                  <RateValue v={rate.value_inc_vat} />
                  <RateWeather description={rate.weather} uv_index={rate.uv_index} />
                  <RateTime dt={new Date(rate.valid_from)} />
                </RateBox>
              )}

            </div>

          </div>

        )}

      </main>

      <footer className={styles.footer}>
        &copy; Chillywasher Productions 2023
      </footer>

    </div>
  )
}
