export interface HorarioSeg {
    id: string;
    fk: number;
    closedSeg: boolean;


    formArraySegunda: Array<HorasSegunda>;

}



export interface HorasSegunda {
    itemPropertyOneSegunda: string;
    itemPropertyTwoSegunda: string;
}
