
import styles from './sensor.module.css'

type SensorProps = {
    label: string;
    value: Date;
    redThreshold: CompareThreshold;
    amberThreshold: CompareThreshold;
}

type CompareThreshold = {
    date: Date;
    seconds: number;
}

export default function DateSensor(props: SensorProps) {

    const color = () => {
        if ((props.redThreshold.date.getTime() - props.value.getTime()) > props.redThreshold.seconds * 1000) return "red"
        if (props.amberThreshold.date.getTime() - props.value.getTime() > props.amberThreshold.seconds * 1000) return "gold"
        return "lime"
    }

    return (

        <div className={styles.sensor}>
            <h2><span style={{ "color": color() }}>{props.value.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span></h2>
            <h4>{props.label}</h4>
        </div>

    )

}