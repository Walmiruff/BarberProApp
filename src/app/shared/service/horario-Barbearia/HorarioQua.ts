export interface HorarioQua {
    id: string;
    fk: number;
    closedQua: boolean;

    formArrayQuarta: Array<HorasQuarta>;

}



export interface HorasQuarta {
    itemPropertyOneQuarta: string;
    itemPropertyTwoQuarta: string;
}


