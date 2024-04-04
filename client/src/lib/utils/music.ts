export const getRecommendedGenre = (ambiance: string) => {
  let genre;
  switch (ambiance) {
    case "Quiet and Calm":
      // genre = ["classical", "jazz", "ambient"];
      genre = ["classical"];
      break;
    case "Cozy and Intimate":
      // genre = ["acoustic", "folk", "light jazz"];
      genre = ["acoustic"];
      break;
    case "Lively and Energetic":
      // genre = ["pop", "indie", "light rock"];
      genre = ["pop"];
      break;
    case "Busy and Bustling":
      // genre = ["pop", "dance", "upbeat jazz"];
      genre = ["jazz"];
      break;
    default:
      genre = ["unknown"];
      break;
  }
  return genre;
};
