export async function createUserZAK(userId, accessToken) {
  const fetchURL = `https://api.zoom.us/v2/users/${userId}/token?type=zak`;
  const userZAKResult = await fetch(fetchURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(`ZAK:${error}`));

  return userZAKResult;
}
