
export interface Rate {

    value_inc_vat: number;
    valid_from: Date;
    scheduled: Date;
    weather: string; å
    uv_index: number;

}

export interface SensorData {

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
