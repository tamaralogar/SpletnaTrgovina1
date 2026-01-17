export class Item {
    public id: number = 0;
    public naziv: string = "";
    public cena: number = 0;
    public slika: string = "";
    public opis: string = "";
    public velikost: string = "";
    public barva: string = "";
    public basket: boolean = false;


    constructor(id: number, naziv: string, cena: number, slika: string, opis: string, velikost: string, barva: string, basket: boolean) {
        this.id = id;
        this.naziv = naziv;
        this.cena = cena;
        this.slika = slika;
        this.opis = opis;
        this.velikost = velikost;
        this.barva = barva;
        this.basket = basket;
    }
}
