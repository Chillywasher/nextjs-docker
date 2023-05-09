import useSWR from 'swr'

type useBatteryScheduleProps = {
    date: Date,
}

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export function useBatterySchedule(props: useBatteryScheduleProps) {

    const url = `http://192.168.102.234:8060/foxcloud/battery_schedule_get/${props.date}`

    const { data, error, isLoading } = useSWR(url, fetcher)

    return {
        scheduleData: data, 
        scheduleLoading: isLoading, 
        scheduleError: error
    }

}