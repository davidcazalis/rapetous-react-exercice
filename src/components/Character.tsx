import { MarvelCharacter } from "@/lib/api-client";
import { useState } from "react";

export default function Character({character}) {
    return (
      <>
<img src={character?.image_url}></img>
      <h1>{character?.name}</h1>
      <h2>{character?.description}</h2>

      </>
    )
  }
