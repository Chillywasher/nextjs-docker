
import styles from './sensor.module.css'

type SensorProps = {
    label: string;
    unit: string;
    value: number;
    dp: number;
    redThreshold: number;
    amberThreshold: number;
    thresholdAscending: boolean;
    borderColor?: string;
}

export default function NumberSensor(props: SensorProps) {

    const color = (): string => {
        if (props.thresholdAscending) {
            if (props.value < props.redThreshold) return "red"
            if (props.value < props.amberThreshold) return "gold"
            return "lime"
        }
        if (props.value > props.redThreshold) return "red"
        if (props.value > props.amberThreshold) return "gold"
        return "lime"
    }

    const borderColor = (): string => {
        if (typeof props.borderColor !== 'undefined') {
            return props.borderColor
        } else {
            return color();
        }
    }

    return (

        <div className={styles.sensor} style={{borderColor: borderColor() }}>
            <h2><span style={{ color: color() }}>{props.value.toFixed(props.dp)}</span><small>{props.unit}</small></h2>
            <h4>{props.label}</h4>
        </div>

    )

}