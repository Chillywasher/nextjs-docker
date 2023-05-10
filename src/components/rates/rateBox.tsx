import styles from './rates.module.css'
import {Rate} from '../../models/types'

type RateBoxProps = {
    children?: React.ReactNode;
    // value_inc_vat: number;
    on_click: Function;
    rate: Rate;
    // weather: string;
    // uv_index: number;
    // valid_from: Date;

}

// scheduled={rate.scheduled}
// uv_index={rate.uv_index}
// valid_from={rate.valid_from}
// value_inc_vat={rate.value_inc_vat}
// weather={rate.weather}

export default function RateBox(props: RateBoxProps) {

    const WEATHER_TYPE = {
        "NA": "Not available",
        "0": "Clear night",
        "1": "Sunny day",
        "2": "Partly cloudy (night)",
        "3": "Partly cloudy (day)",
        "4": "Not used",
        "5": "Mist",
        "6": "Fog",
        "7": "Cloudy",
        "8": "Overcast",
        "9": "Light rain shower (night)",
        "10": "Light rain shower (day)",
        "11": "Drizzle",
        "12": "Light rain",
        "13": "Heavy rain shower (night)",
        "14": "Heavy rain shower (day)",
        "15": "Heavy rain",
        "16": "Sleet shower (night)",
        "17": "Sleet shower (day)",
        "18": "Sleet",
        "19": "Hail shower (night)",
        "20": "Hail shower (day)",
        "21": "Hail",
        "22": "Light snow shower (night)",
        "23": "Light snow shower (day)",
        "24": "Light snow",
        "25": "Heavy snow shower (night)",
        "26": "Heavy snow shower (day)",
        "27": "Heavy snow",
        "28": "Thunder shower (night)",
        "29": "Thunder shower (day)",
        "30": "Thunder"
    }

    const getColorFromValue = (value: number) => {
        if (value <= 12) return "green"
        if (value <= 20) return "#FF00FF"
        if (value <= 25) return "#000099"
        if (value <= 30) return "#666"
        return "#333"
    }

    const getBorderColor = (rate_date: Date, scheduled: Date, value: number) => {
        if (scheduled != null) return "lime"
        let rDate = new Date(rate_date)
        let dt2 = new Date(rDate.getTime() + 1800000)

        let now = new Date()
        if (now >= rDate && now < dt2) return "yellow"
        return getColorFromValue(value)
    }

    const icon_url = () => {
        let icon = Object.keys(WEATHER_TYPE).find(key => WEATHER_TYPE[key] === props.rate.weather)
        return `/icons/${icon}.svg`
    }

    const localTime = new Date(props.rate.valid_from)

    return (
        <div
            className={styles.rate_box}
            onClick={e => props.on_click(props.rate.valid_from, e)}
            title={props.rate.weather}
            aria-label={props.rate.weather}
            style={{
                "backgroundColor": getColorFromValue(props.rate.value_inc_vat),
                "borderColor": getBorderColor(
                    props.rate.valid_from, 
                    props.rate.scheduled, 
                    props.rate.value_inc_vat),
            }}>


            <div className={styles.rate_time}>
                {localTime.getHours().toString().padStart(2, '0')}:
                {localTime.getMinutes().toString().padStart(2, '0')}
            </div>
            <div className={styles.rate_weather}>
                <div className={styles.weather_cell}>
                    <img 
                        src={icon_url()} 
                        aria-label={props.rate.weather} 
                        className={styles.weather_icon} />
                </div>
                <div className={styles.weather_cell}>
                    <span className={styles.uv_index}>{props.rate.uv_index}</span>
                </div>
            </div>
            <div className={styles.rate_value}>
                {props.rate.value_inc_vat.toFixed(2)}<br /><small> p/kWh</small>
            </div>


        </div>
    )
}