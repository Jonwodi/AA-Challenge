import { reactive } from "vue";

export interface Movie {
  title: string;
  director: string;
  releaseDateUK: string | null;
  synopsis: string;
  imdbLink: string;
}

interface Store {
  movies: Movie[];
  currentMovie: string | null;
  sortByTitle(): void;
  sortByReleaseDate(): void;
  sortByDirector(): void;
}

export const store = reactive<Store>({
  movies: [
    {
      title: "Ghostbusters",
      director: "Ivan Reitman",
      releaseDateUK: "1984-12-07T00:00:00",
      synopsis:
        "Three former parapsychology professors set up shop as a unique ghost removal service.",
      imdbLink: "https://www.imdb.com/title/tt0087332/",
    },
    {
      title: "Back to the Future",
      director: "Robert Zemeckis",
      releaseDateUK: "1985-12-04T00:00:00",
      synopsis:
        "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
      imdbLink: "https://www.imdb.com/title/tt0088763/",
    },
    {
      title: "Raiders of the Lost Ark",
      director: "Steven Spielberg",
      releaseDateUK: "1981-07-30T00:00:00",
      synopsis:
        "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler\u0027s Nazis can obtain its awesome powers.",
      imdbLink: "https://www.imdb.com/title/tt0082971/",
    },
  ],
  currentMovie: null,
  sortByTitle() {
    this.movies.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));
  },
  sortByReleaseDate() {
    this.movies.sort((a: Movie, b: Movie) => {
      const dateA = a.releaseDateUK ? new Date(a.releaseDateUK).getTime() : 0;
      const dateB = b.releaseDateUK ? new Date(b.releaseDateUK).getTime() : 0;
      return dateA - dateB;
    });
  },
  sortByDirector() {
    this.movies.sort((a: Movie, b: Movie) =>
      a.director.localeCompare(b.director)
    );
  },
});
