import { createClient, Client } from "@libsql/client/web";
import { getRandomNumber } from "../utils";

import type { MarvelApiCharacter, MarvelCharacter } from "./types";

export const mappingMarvelApiToDBCharacter = (
  character?: MarvelApiCharacter
): MarvelCharacter | undefined => {
  if (!character) {
    return;
  }

  return {
    id: character.id,
    name: character.name,
    description: character.description,
    image_url: character.thumbnail
      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
      : null,
  };
};

export class ApiClient {
  private client: Client;
  private totalCharacters: number;

  constructor() {
    this.client = createClient({
      url: import.meta.env.VITE_API_URL ?? "libsql://",
      authToken: import.meta.env.VITE_API_TOKEN,
    });

    this.totalCharacters = 1563;
  }

  private async charactersIdsFromDB() {
    return await this.getCharactersFromDB().then(
      (charactersFromDB) =>
        charactersFromDB?.map((character) => character.id) ?? []
    );
  }

  private async filterCharactersCriteria(characters: MarvelApiCharacter[]) {
    const charactersIds = await this.charactersIdsFromDB();
    return characters.filter((character) => {
      return (
        !charactersIds.includes(character.id) &&
        character.comics.available > 36 &&
        character.stories.available > 72
      );
    });
  }

  public async getCharactersFromMarvelApi(options: {
    id?: number;
    limit?: number;
    offset?: number;
    unfiltered?: boolean;
  }) {
    const url = new URL(`http://gateway.marvel.com/v1/public/characters`);

    url.searchParams.append("apikey", import.meta.env.VITE_MARVEL_API_KEY!);

    if (options.id) {
      url.pathname += `/${options.id}`;
    }
    if (options.limit) {
      url.searchParams.append("limit", String(options.limit));
    }
    if (options.offset) {
      url.searchParams.append("offset", String(options.offset));
    }

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      const characters = data.data.results as MarvelApiCharacter[];

      if (options?.unfiltered || options?.id) {
        return characters;
      }

      const filteredCharacters = await this.filterCharactersCriteria(
        characters
      );
      if (filteredCharacters.length) {
        await this.addCharacters(filteredCharacters);
        return filteredCharacters;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public async getCharactersFromDB() {
    try {
      const characters = await this.client.execute(
        "SELECT * FROM marvel_characters"
      );
      return characters.rows as unknown as MarvelCharacter[];
    } catch (error) {
      console.error(error);
    }
  }

  public async getCharacterFromDB(id: MarvelApiCharacter["id"]) {
    try {
      const character = await this.client.execute({
        sql: "SELECT * FROM marvel_characters WHERE id = :id",
        args: { id },
      });
      return character.rows[0] as unknown as MarvelCharacter;
    } catch (error) {
      console.error(error);
    }
  }

  public async getRandomCharactersFromAPI(count = 1) {
    const offset = getRandomNumber(this.totalCharacters, 1);
    return await this.getCharactersFromMarvelApi({ offset, limit: count }).then(
      (characters) => characters?.map(mappingMarvelApiToDBCharacter)
    );
  }

  public async getRandomCharacterFromAPI() {
    const randomCharactersFromApi =
      (await this.getRandomCharactersFromAPI(99)) ?? [];
    if (randomCharactersFromApi.length) {
      const randomIndex = getRandomNumber(
        randomCharactersFromApi.length - 1,
        0
      );
      return randomCharactersFromApi[randomIndex];
    } else {
      this.getRandomCharacterFromAPI();
    }
  }

  public async getRandomCharacterFromDB() {
    try {
      const character = await this.client.execute(
        "SELECT * FROM marvel_characters ORDER BY RANDOM() LIMIT 1"
      );
      return character.rows[0] as unknown as MarvelCharacter;
    } catch (error) {
      console.error(error);
    }
  }

  public async getRandomCharacter(excludeIds: number[] = []) {
    const doNotSearchForCharacterWithoutVotes = Math.random() < 0.5;

    const randomCharacter = async () => {
      const characterFromDB = await this.getRandomCharacterFromDB();
      if (characterFromDB && !excludeIds.includes(characterFromDB.id)) {
        return characterFromDB;
      } else {
        return this.getRandomCharacterFromAPI();
      }
    };

    if (doNotSearchForCharacterWithoutVotes) {
      return randomCharacter();
    } else {
      const charactersWithoutVotes = await this.getCharactersWithoutVotes();
      if (charactersWithoutVotes && charactersWithoutVotes.length > 0) {
        const randomIndex = getRandomNumber(
          charactersWithoutVotes.length - 1,
          0
        );
        const character = charactersWithoutVotes[randomIndex];
        if (!excludeIds.includes(character.id)) {
          return character;
        } else {
          console.info("Random character from DB is excluded ...");
          return this.getRandomCharacterFromAPI();
        }
      } else {
        return randomCharacter();
      }
    }
  }

  public async getUniqueRandomCharacters(count: number) {
    const characters: MarvelCharacter[] = [];

    while (characters.length < count) {
      const excludeIds = characters.map((character) => character?.id ?? 0);
      const character = await this.getRandomCharacter(excludeIds);
      if (character) {
        characters.push(character);
      }
    }

    return characters;
  }

  public async addCharacters(characters: MarvelApiCharacter[]) {
    try {
      const sql = `INSERT INTO marvel_characters (id, name, description, image_url, created_at) VALUES ${characters
        .map(() => `(?, ?, ?, ?, ?)`)
        .join(", ")}`;
      const args = characters.flatMap((char) => {
        const character = mappingMarvelApiToDBCharacter(char);
        return [
          character?.id ?? 0,
          character?.name ?? "",
          character?.description ?? "",
          character?.image_url ?? "",
          new Date(),
        ];
      });
      return await this.client.execute({
        sql,
        args,
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async getCharacter(id: number) {
    const characterFromDB = await this.getCharacterFromDB(id);
    if (characterFromDB) {
      return characterFromDB as unknown as MarvelCharacter;
    }

    return await this.getCharactersFromMarvelApi({ id: id }).then(
      (characters) => characters && mappingMarvelApiToDBCharacter(characters[0])
    );
  }

  public async addVote(stronger: MarvelCharacter, weaker: MarvelCharacter) {
    console.log(stronger, weaker);
    try {
      await this.client.execute({
        sql: "INSERT INTO marvel_characters_vote VALUES (:id, :created_at, :stronger_character_id, :weaker_character_id)",
        args: {
          id: null,
          weaker_character_id: weaker.id,
          stronger_character_id: stronger.id,
          created_at: new Date(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  public async getCharactersByVotes() {
    try {
      const characters = await this.client.execute(
        "SELECT marvel_characters.*, COUNT(marvel_characters_vote.stronger_character_id) as victories FROM marvel_characters LEFT JOIN marvel_characters_vote ON marvel_characters.id = marvel_characters_vote.stronger_character_id GROUP BY marvel_characters.id ORDER BY victories DESC"
      );
      return characters.rows as unknown as MarvelCharacter[];
    } catch (error) {
      console.error(error);
    }
  }

  public async getCharactersWithoutVotes() {
    try {
      const characters = await this.client.execute(
        "SELECT * FROM marvel_characters WHERE id NOT IN (SELECT stronger_character_id FROM marvel_characters_vote) AND id NOT IN (SELECT weaker_character_id FROM marvel_characters_vote)"
      );
      return characters.rows as unknown as MarvelCharacter[];
    } catch (error) {
      console.error(error);
    }
  }

  public async getWeakerCharacters(id: number) {
    try {
      const votes = await this.client.execute({
        sql: "SELECT marvel_characters.*, marvel_characters_vote.weaker_character_id FROM marvel_characters_vote LEFT JOIN marvel_characters ON marvel_characters_vote.weaker_character_id = marvel_characters.id WHERE stronger_character_id = :id",
        args: { id },
      });
      return votes.rows as unknown as MarvelCharacter[];
    } catch (error) {
      console.error(error);
    }
  }

  public async getStrongerCharacters(id: number) {
    try {
      const votes = await this.client.execute({
        sql: "SELECT marvel_characters.*, marvel_characters_vote.stronger_character_id FROM marvel_characters_vote LEFT JOIN marvel_characters ON marvel_characters_vote.stronger_character_id = marvel_characters.id WHERE weaker_character_id = :id",
        args: { id },
      });
      return votes.rows as unknown as MarvelCharacter[];
    } catch (error) {
      console.error(error);
    }
  }
}

export default ApiClient;
