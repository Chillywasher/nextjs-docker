
import styles from './sensor.module.css'
import { RateSensorDisplayEnum } from '../../models/types'


type SensorProps = {
    ascending: boolean;
    currentValue: number;
    display: RateSensorDisplayEnum,
    dp: number;
    label: string;
    rateValue: number;
    targetValue: number;
    unit: string;
}


export default function RateSensor(props: SensorProps) {

    const hoursDiff = () => {
        if (props.ascending == true) return props.targetValue - props.currentValue
        return props.currentValue - props.targetValue
    }

    const estTime = () => {

        if (props.rateValue == 0) return "--:--:--"

        const totalSeconds = (hoursDiff() / props.rateValue) * 60 * 60

        let hours = 0
        let minutes = 0
        let seconds = 0

        if (props.display == RateSensorDisplayEnum.TimeRemaining) {
            const totalMinutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;
            hours = Math.floor(totalMinutes / 60);
            minutes = totalMinutes % 60;
        } else {
            let now = new Date()
            now.setSeconds(now.getSeconds() + totalSeconds)
            hours = now.getHours()
            minutes = now.getMinutes()
            seconds = now.getSeconds()
        }

        return hours.toFixed(0).padStart(2, '0') +
            ':' + minutes.toFixed(0).padStart(2, '0') +
            ':' + seconds.toFixed(0).padStart(2, '0')

    }

    return (
        <div className={styles.sensor}>
            <h2>{estTime()}</h2>
            <h4>{props.label}</h4>
        </div>
    )
}