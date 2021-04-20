export async function getUserID(userEmail, accessToken) {
  const fetchURL = `https://api.zoom.us/v2/users/${userEmail}?status=active`;
  const userResult = await fetch(fetchURL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(`ID:${error}`));

  return userResult;
}
