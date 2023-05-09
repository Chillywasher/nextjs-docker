import useSWR from 'swr'

type useRatesProps = {
    period_from: Date,
    period_to: Date,
    refresh: Date
}

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export function useRates(props: useRatesProps) {

    const tfrom = props.period_from.toISOString()
    const tto = props.period_to.toISOString()

    const baseUrl = `http://127.0.0.1:8000`
    // const baseUrl = `http://192.168.102.234:8040`

    const url = `${baseUrl}/octopus/rates_with_battery_schedule/AGILE-FLEX-22-11-25?period_from=${tfrom}&period_to=${tto}&refresh=${props.refresh}`    

    const { data, error, isLoading } = useSWR(url, fetcher)

    return {
        ratesData: data, 
        ratesLoading: isLoading, 
        ratesError: error
    }

}