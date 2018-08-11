import Media from './media.class';

export default class EcoplanObject extends Media {

    constructor(naam, straat, nummer, postcode, bus, gemeente, webadres, telefoon, categorie, opmerkingen){
         super();

         this.naam = naam;
         this.straat = straat;
         this.nummer = nummer;
         this.postcode = postcode;
         this.bus = bus;
         this.gemeente = gemeente;
         this.webadres = webadres;
         this.telefoon = telefoon;
         this.categorie = categorie;
         this.opmerkingen = opmerkingen;
    }

}