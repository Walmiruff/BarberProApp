export interface HorarioSab {
    id: string;
    fk: number;
    closedSab: boolean;

    formArraySabado: Array<HorasSabado>;
}



export interface HorasSabado {
    itemPropertyOneSabado: string;
    itemPropertyTwoSabado: string;
}
