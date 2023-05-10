import { DayEnum, DatePartEnum } from "../../models/types"

type RatesTitleProps = {
    day: DayEnum
  }


export default function RatesTitle(props: RatesTitleProps) {

    function getDatePart(date:Date, datepart:DatePartEnum){
        switch(datepart){
            case DatePartEnum.Day:
                return date.toLocaleString("en-GB", {day: 'numeric'})        
            case DatePartEnum.MonthNameLong:
                return date.toLocaleString("en-GB", {month: 'long'})
            case DatePartEnum.MonthNameShort:
                return date.toLocaleString("en-GB", {month: 'short'})
            case DatePartEnum.WeekdayNameLong:
                return date.toLocaleString("en-GB", {weekday: 'long'})
            case DatePartEnum.WeekdayNameShort:
                return date.toLocaleString("en-GB", {weekday: 'short'})
        }
        return "Unknown"
    }

    const title = () => {

        let dt = new Date()
        if(props.day==DayEnum.Tomorrow){
            dt.setDate(dt.getDate() + 1)
        }
        let wkday = getDatePart(dt, DatePartEnum.WeekdayNameLong)
        let mnth = getDatePart(dt, DatePartEnum.MonthNameLong)
        let day = getDatePart(dt, DatePartEnum.Day)
        return wkday.concat(" ", day, " ", mnth)
    }

    return (
        <div style={{ "flex": "100%" }}><h2>{title()}</h2></div>
    )
}