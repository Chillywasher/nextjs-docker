


export default function RateTime(props: RateTimeProps) {
    let local = new Date(props.dt)
    return (
        <h3>
            {local.getHours().toString().padStart(2, '0')}:
            {local.getMinutes().toString().padStart(2, '0')}
        </h3>
    )
}