export interface HorarioQui {
    id: string;
    fk: number;
    closedQui: boolean;


    formArrayQuinta: Array<HorasQuinta>;

}



export interface HorasQuinta {
    itemPropertyOneQuinta: string;
    itemPropertyTwoQuinta: string;
}



