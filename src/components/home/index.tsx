import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { PageLink } from "../global/link";

let pokemonBaseUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`;

export const Home = () => {
  const [pokemons, setPokemons] = useState<any>();
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    getAllPokemon(pokemonBaseUrl);
  }, []);

  const nextPage = (next) => {
    if (next) {
      getAllPokemon(next);
    }
  };
  const prevPage = (prev) => {
    if (prev) {
      getAllPokemon(prev);
    }
  };
  const getAllPokemon = async (url) => {
    try {
      setIsloading(true);
      let fetchApi = await fetch(url);
      let { status } = fetchApi;
      switch (status) {
        case 200:
          let response = await fetchApi.json();
          setPokemons(response);
          setIsloading(false);
          break;
        default:
          setIsloading(false);
          setIsError(true);
      }
    } catch (e) {
      setIsloading(false);
      setIsError(true);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>An Unown error occured</p>;
  return (
    <div className={styles.main}>
      <div>
        <button onClick={() => prevPage(pokemons && pokemons.previous)}>
          Previous
        </button>
        <button onClick={() => nextPage(pokemons && pokemons.next)}>
          Next
        </button>
      </div>
      <ul className={styles.list}>
        {pokemons &&
          pokemons.results.map(({ name, url }) => {
            let orderNumber = url.split("/")[6];
            return (
              <PageLink
                path={`/project/${name}`}
                key={`pokemon-${name}`}
                className={styles.pokemonCard}
              >
                <p># {orderNumber}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${orderNumber}.png`}
                  className={styles.image}
                />

                <div className="inner content">{name}</div>
              </PageLink>
            );
          })}
      </ul>
    </div>
  );
};
