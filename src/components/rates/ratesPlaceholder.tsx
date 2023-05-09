
import styles from './rates.module.css'

type RatesContainerProps = {
    children?: React.ReactNode;
}

export default function RatesPlaceholder(props: RatesContainerProps) {

    return (

        <div className={styles.rates_placeholder}>
            {props.children}
        </div>

    )

}