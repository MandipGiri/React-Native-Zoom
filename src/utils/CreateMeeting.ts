export async function createMeeting(userId, accessToken) {
  const fetchURL = `https://api.zoom.us/v2/users/${userId}/meetings`;
  const createMeetingResult = await fetch(fetchURL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: 'New Meeting',
      type: 1,
      duration: 30,
      password: '123456', // set your own password is possible
      settings: {
        audio: 'voip',
        host_video: true,
      },
    }),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.error(`Meeting:${error}`));

  return createMeetingResult;
}
