import useSWR from 'swr'

const fetcher = async (url: string) => await fetch(url).then((res) => res.json());

export function useRates() {

    const url = `http://192.168.102.234:8040/octopus/rates/AGILE-FLEX-22-11-25`
    const { data, error, isLoading } = useSWR(url, fetcher)

    console.log(data)

    return {
        data, isLoading, error
    }

}