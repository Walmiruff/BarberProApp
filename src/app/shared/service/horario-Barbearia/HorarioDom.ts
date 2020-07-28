export interface HorarioDom {
    id: string;
    fk: number;
    closedDom: boolean;
    formArrayDomingo: Array<HorasDomingo>;

}

export interface HorasDomingo {
    itemPropertyOneDomingo: string;
    itemPropertyTwoDomingo: string;
}


