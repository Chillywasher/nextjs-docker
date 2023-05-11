
import { SensorData } from '../../models/types';
import styles from './sensor.module.css'

type SensorProps = {
    label: string;
    sensorData: SensorData;
    borderColor?: string;
}

type statustype = {
    label: string;
    color: string;
}

export default function StatusSensor(props: SensorProps) {

    const get_status = (): statustype => {

        const soc = props.sensorData.SoC
        const grid = props.sensorData.gridConsumptionPower
        const load = props.sensorData.loadsPower
        const solar = props.sensorData.pvPower
        const charge = props.sensorData.batChargePower
        const discharge = props.sensorData.batDischargePower

        if (soc == 100 && solar > load) return { label: "Exporting", color: "lime" }
        if (charge > 0) {
            if (solar > load) return { label: "Sol+chrg", color: "lime" }
            return { label: "Grid+chrg", color: "red" }
        }
        if (discharge > 0) return { label: "Battery", color: "gold" }
        return { label: "Grid", color: "red" }
    }

    const status = get_status()

    const borderColor = (): string => {
        if (typeof props.borderColor !== 'undefined') {
            return props.borderColor
        } else {
            return status.color;
        }
    }

    return (
        <div className={styles.sensor} style={{ borderColor: borderColor() }}>
            <h2 style={{ color: status.color }}>{status.label}</h2>
            <h4>{props.label}</h4>
        </div>
    )
}