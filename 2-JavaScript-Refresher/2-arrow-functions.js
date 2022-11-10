class Book {
    constructor(title, author, edition){
        this.title = title;
        this.author = author;
        this.edition = edition;
        this.setFullTitle(this);
    }
    setYear(year){
        this.year = year;
    }    
    setFullTitle = () => {
        console.log(this.title + ' ' + this.edition);
    }
    getFullDescription(){
        console.log(this.format(this));
    }   
    format(){
        return `${this.title} \n
                Author: ${this.author} \n
                Edition: ${this.edition}`;
    } 
}

const garfield = new Book('Garfield: a road pizza', 'Jim', 72);
garfield.getFullDescription();