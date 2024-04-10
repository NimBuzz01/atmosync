export const getRecommendedGenre = (ambiance: string) => {
  let genre;
  switch (ambiance) {
    case "Quiet and Calm":
      genre = ["classical", "jazz", "ambient"];
      break;
    case "Cozy and Intimate":
      genre = ["acoustic", "folk", "light jazz"];
      break;
    case "Lively and Energetic":
      genre = ["pop", "indie", "light rock"];
      break;
    case "Busy and Bustling":
      genre = ["pop", "dance", "upbeat jazz"];
      break;
    default:
      genre = ["unknown"];
      break;
  }

  // Get a random index within the range of the genre array
  const randomIndex = Math.floor(Math.random() * genre.length);

  // Return the genre at the randomly selected index
  console.log(genre[randomIndex]);
  return genre[randomIndex];
};
