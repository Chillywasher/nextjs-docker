
export type Rate = {

    value_inc_vat: number;
    valid_from: Date;
    scheduled: Date;
    weather: string;
    uv_index: number;

}

export type SensorData = {

    dat: Date;
    batChargePower: number;
    batDischargePower: number;
    SoC: number;
    batTemperature: number;
    feedinPower: number;
    generationPower: number;
    gridConsumptionPower: number;
    loadsPower: number;
    pv1Power: number;
    pv2Power: number;
    pv3Power: number;
    pv4Power: number;
    pvPower: number;
    chargeEnergyToTal: number;
    dischargeEnergyToTal: number;
    feedin: number;
    generation: number;
    gridConsumption: number;
    loads: number;
    input: number;

}

export type EnergyData = {
    chargeEnergyToTal: number;
    dischargeEnergyToTal: number;
    gridConsumption: number;
    input: number;
    loads: number;
    periodFrom: Date;
    periodTo: Date;
}

export enum DayEnum {
    Today,
    Tomorrow
} 

export enum RateSensorDisplayEnum {
    TimeRemaining,
    ActualTime
}

export enum DatePartEnum {
    Day,
    MonthNameLong,
    MonthNameShort,
    WeekdayNameLong,
    WeekdayNameShort,
}
