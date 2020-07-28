export interface HorarioTer {
    id: string;
    fk: number;
    closedTer: boolean;

    formArrayTerca: Array<HorasTerca>;

}


export interface HorasTerca {
    itemPropertyOneTerca: string;
    itemPropertyTwoTerca: string;
}

