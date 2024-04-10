export async function createHistoryEntry(
  userId: string,
  ambiance: string,
  recommendedGenre: string
) {
  const response = await fetch("/api/prisma/create-history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      ambiance: ambiance,
      genrePlayed: recommendedGenre,
    }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
}

export async function getUserHistory(userId: string) {
  const history = await fetch("/api/prisma/get-history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });

  return history;
}
