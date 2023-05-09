
import styles from './sensor.module.css'

type SensorContainerProps = {
    children?: React.ReactNode;
}

export default function SensorContainer(props: SensorContainerProps) {

    return (

        <div className={styles.sensor_container}>
            {props.children}
        </div>

    )

}