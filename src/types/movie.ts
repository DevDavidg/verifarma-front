export interface MovieProps {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Category: string;
    Countries: string;
    Plot: string;
    Rating: number;
    Runtime: string;
    Director: string;
    Actors: string;
    Genre: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
}
