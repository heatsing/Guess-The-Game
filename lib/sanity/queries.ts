export const DAILY_GAME_QUERY = `
*[_type == "dailyGame" && date == $date && mode == $mode][0]{
  date,
  mode,
  "game": game->{
    _id,
    title,
    acceptableAnswers,
    "images": images[].asset->url
  }
}
`;

export const ALL_TITLES_QUERY = `
*[_type == "game" && mode == $mode]{ title }
`;

