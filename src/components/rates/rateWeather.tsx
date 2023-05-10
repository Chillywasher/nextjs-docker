
import styles from './rates.module.css'

type RateWeatherProps = {
    description: string;
    uv_index: number;
  }

export default function RateWeather(props: RateWeatherProps) {
    return (
        <div className={styles.rate_weather}>
            {props.description}
            <div className={styles.uv_emblem}>{props.uv_index}</div>
        </div>
    )
}