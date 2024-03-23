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
    case "Quiet but Moderate":
      genre = ["classical", "soft pop", "instrumental"];
      break;
    case "Quiet but Lively":
      genre = ["jazz", "blues", "acoustic"];
      break;
    case "Moderately Quiet":
      genre = ["ambient", "soft rock", "acoustic"];
      break;
    case "Moderately Cozy":
      genre = ["folk", "country", "soft pop"];
      break;
    case "Moderately Energetic":
      genre = ["pop", "rock", "indie"];
      break;
    case "Busy but Calm":
      genre = ["instrumental", "classical", "ambient"];
      break;
    case "Busy but Cozy":
      genre = ["jazz", "blues", "soul"];
      break;
    default:
      genre = ["unknown"];
      break;
  }
  return genre;
};
