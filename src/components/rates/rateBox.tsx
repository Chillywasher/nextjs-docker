import styles from './ratebox.module.css'

type RateBoxProps = {
    children?: React.ReactNode;
    scheduled: Date;
    on_click: Function;
  }

function getColorFromValue(value: number) {
    if (value <= 12) return "green"
    if (value <= 20) return "#FF00FF"
    if (value <= 25) return "#000066"
    if (value <= 30) return "#333333"
    return "#000000"
}

function getBorderColor(rate_date: Date, scheduled: Date, value: number) {
    if (scheduled != null) return "lime"
    let rDate = new Date(rate_date)
    let dt2 = new Date(rDate.getTime() + 1800000)

    let now = new Date()
    if (now >= rDate && now < dt2) return "yellow"
    return getColorFromValue(value)
}

export default function RateBox(props: RateBoxProps) {

    let rate_date = props.children[2].props.dt
    let value = props.children[0].props.v

    let bg = getColorFromValue(value)
    let bc = getBorderColor(rate_date, props.scheduled, value)

    return (
        <div
            className={styles.rate_box}
            onClick={e => props.on_click(rate_date, e)}
            style={{ "backgroundColor": bg, "borderColor": bc }}>
            {props.children}
        </div>
    )
}