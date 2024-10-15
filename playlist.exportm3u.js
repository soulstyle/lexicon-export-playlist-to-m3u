const oldLocation = _settings["Music Folder Path"];
const newLocation = _settings["New Folder Path"];
const playlists = _vars.playlistsSelected;

if (!playlists) {
  throw new Error(`No playlists selected.`);
}

for (const playlist of playlists) {
  let playlistData = `\n###STARTM3U ${playlist.name}\n`;
  playlistData += `#EXTM3U\n\n`;
  playlist.tracks = await playlist.getTracks();

  // Loop through each track and prepare m3u data.
  for (const track of playlist.tracks) {
    let trackLocation = track.location;
    const trackDuration = Math.round(track.duration);

    // Replace music folder path with new folder path.
    if (oldLocation && newLocation) {
      trackLocation = trackLocation.replace(oldLocation, newLocation);
    }

    playlistData += `#EXTINF:${trackDuration},${track.artist} - ${track.title}\n${trackLocation}\n\n`;
  }
  playlistData += `###ENDM3U\n\n`;

  // Write m3u data to log.
  _helpers.Log(`${playlistData}`);
}
