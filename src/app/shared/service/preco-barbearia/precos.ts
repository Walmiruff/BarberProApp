export interface IArray {
    array: Array<IPrecos>;
}

export interface IPrecos {
    id: string | number;
    fk: string | number;
    txt_NomeSalao: string;
    userIdOneSignalSalao: string;
    formArrayPrecos: Array<Precos>;

}

export interface Precos {
    itemPropertyServico: string;
    itemPropertyPreco: string;
}
