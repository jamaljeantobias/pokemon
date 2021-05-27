import React, { useEffect, useState } from "react";
import styles from "./project.module.css";

import { PageLink } from "../global/link/";

export interface PokemonResponse {
  name: string;
  id: string;
  base_experience: string;
  order: string;
  height: string;
  weight: string;
}

export const Project = ({ location, match }) => {
  const { id } = match.params;

  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pokemon, setPokemon] =
    useState<PokemonResponse | undefined>(undefined);
  useEffect(() => {
    fetchPokemonByslug(id);
  }, [id]);

  const fetchPokemonByslug = async (slug) => {
    try {
      setIsloading(true);
      let apiCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
      let { status } = apiCall;
      switch (status) {
        case 200:
          let response = await apiCall.json();
          setPokemon(response);
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
  if (isLoading) return <div>loading</div>;

  if (isError) return <p>An unknown Error Occured</p>;

  return (
    <div className={styles.main}>
      <PageLink className="" path="/">
        Go Back
      </PageLink>
      <div className={styles.container}>
        <div className={styles.mainImage}>
          <img
            className={styles.image}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.order}.png`}
          />
        </div>
        <div className={styles.attributes}>
          <p># {pokemon.order}</p>
          <h1 className={styles.headTitle}>{pokemon.name}</h1>
          <p>Id: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Expereience: {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};
