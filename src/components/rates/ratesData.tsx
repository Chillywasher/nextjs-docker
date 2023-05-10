import { Rate } from "../../models/types"
import RateBox from "./rateBox"
import { DayEnum } from "../../models/types"

type RatesDataProps = {
    ratesData: Rate[];
    on_click: Function;
    day: DayEnum;
}



export default function RatesData(props: RatesDataProps) {

    const tomorrow = () => {
        let today = new Date()
        let tmrrw = new Date(today.setDate(today.getDate() + 1))
        tmrrw.setHours(0, 0, 0, 0)
        return tmrrw
    }

    function applyFilter(rate: Rate) {
        let date = new Date(rate.valid_from)
        let tmrrw = tomorrow()
        if (props.day == DayEnum.Today) {
            let now = Date.now() - 1800000
            return date < tmrrw && date.getTime() > now
        } else {
            return date >= tmrrw
        }
    }

    return (
        <>
            {
                props.ratesData.filter(applyFilter).map((rate: Rate, index: number) =>
                    <RateBox
                        key={index}
                        on_click={props.on_click}
                        rate={rate}
                    />
                )
            }
            {
                props.ratesData.filter(applyFilter).length == 0 && props.day == DayEnum.Tomorrow && (
                    <h4>Data available after 4pm</h4>
                )
            }
        </>
    )

}