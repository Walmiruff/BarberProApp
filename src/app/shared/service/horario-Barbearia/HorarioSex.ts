export interface HorarioSex {
    id: string;
    fk: number;
    closedSex: boolean;


    formArraySexta: Array<HorasSexta>;

}



export interface HorasSexta {
    itemPropertyOneSexta: string;
    itemPropertyTwoSexta: string;
}

