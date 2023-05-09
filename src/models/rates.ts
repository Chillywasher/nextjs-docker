type Rate = {
  value_inc_vat: number;
  valid_from: Date;
  scheduled: Date;
  weather: string;
  uv_index: number;
}

type RateBoxProps = {
  children?: React.ReactNode;
  date_on: Date;
  on_click: Function;
}

type RateValueProps = {
  v: number;
}

type RateTimeProps = {
  dt: Date;
}

type RateWeatherProps = {
  description: string;
  uv_index: number;
}

type useRatesProps = {
  period_from: Date;
  period_to: Date;
}

type RatesTitleProps = {
  day: string
}