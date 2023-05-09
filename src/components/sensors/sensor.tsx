
import styles from './sensor.module.css'

type SensorProps = {
    label: string;
    unit: string;
    value: number | Date | string;
}

export default function Sensor(props: SensorProps) {

    return (

        <div className={styles.sensor}>
            <h2>{props.value.toString()}{props.unit}</h2>
            <h4>{props.label}</h4>
        </div>

    )

}