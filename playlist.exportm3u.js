const oldLocation = _settings["Music Folder Path"];
const newLocation = _settings["New Folder Path"];
const playlists = _vars.playlistsSelected;
const allPlaylists = _vars.playlistsAll;

if (!playlists) {
  throw new Error(`No playlists selected.`);
}

for (const playlist of playlists) {
  let playlistName = playlist.name;
  // If the playlist is not a root playlist, build name from parent names.
  if (playlist.parentId !== 1) {
    playlistName = buildPlaylistName(playlist);
  }

  let playlistData = `\n###STARTM3U ${playlistName}\n`;
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

function getParentPlaylistName(playlistId) {
  const parentPlaylist = allPlaylists.find((p) => p.id === playlistId);
  if (!parentPlaylist) {
    return "";
  }
  const grandParentName = getParentPlaylistName(parentPlaylist.parentId);
  return grandParentName
    ? `${grandParentName} - ${parentPlaylist.name}`
    : parentPlaylist.name;
}

function buildPlaylistName(playlist) {
  const parentPlaylistName = getParentPlaylistName(playlist.parentId);
  return parentPlaylistName
    ? `${parentPlaylistName} - ${playlist.name}`
    : playlist.id;
}
