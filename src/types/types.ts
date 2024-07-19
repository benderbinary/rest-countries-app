export interface Country {
    name: string;
    population: number;
    region: string;
    capital: string;
    flags: {
        png: string;
        svg: string;
    };
    alpha3Code: string;
}