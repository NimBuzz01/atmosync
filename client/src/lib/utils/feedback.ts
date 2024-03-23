export async function createHistoryEntry(
  userId: string,
  ambiance: string,
  humanCount: string,
  soundLevel: string
) {
  const response = await fetch("/api/prisma/create-history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      ambiance: ambiance,
      humanCount: humanCount,
      soundLevel: soundLevel,
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
