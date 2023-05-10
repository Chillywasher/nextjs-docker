import { DayEnum } from "../../models/types"

type RatesTitleProps = {
    day: DayEnum
  }

export default function RatesTitle(props: RatesTitleProps) {

    const title = () => {
        let dt = new Date()
        switch (props.day) {
            case DayEnum.Today:
                return dt.toLocaleDateString("en-GB", { "weekday": "long", "day": "numeric", "month": "long" })
        }
        let tmrrw = new Date()
        tmrrw.setDate(tmrrw.getDate() + 1)
        return tmrrw.toLocaleDateString("en-GB", { "weekday": "long", "day": "numeric", "month": "long" })
    }

    return (
        <div style={{ "flex": "100%" }}><h2>{title()}</h2></div>
    )
}