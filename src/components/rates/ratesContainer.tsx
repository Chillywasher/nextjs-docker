
import styles from './rates.module.css'

type RatesContainerProps = {
    children?: React.ReactNode;
}

export default function RatesContainer(props: RatesContainerProps) {

    return (

        <div className={styles.rates_container}>
            {props.children}
        </div>

    )

}