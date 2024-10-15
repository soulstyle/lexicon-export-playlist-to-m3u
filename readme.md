# Export Playlist to M3U - Lexicon Plugin

This plugin generates a m3u format playlist from one or more selected playlists and writes it to the plugin's log file. (Currently the only way to write files from a plugin in Lexicon)
An option to replace file paths in the generated m3u data is provided.

A Python 3 script that can split and convert the logfile to separate m3u8 files is also included, but, it needs to be run externally from Lexicon.
I use the Automator in MacOS to Watch the plugin log folder and run the script as soon as a new log file gets created.
I've included a workflow as well as a image of the workflow for reference. Something similar should be possible in Windows and Linux.

## Installation

1. Add the plugin ZIP file to the plugins folder and restart Lexicon. (`Documents/Lexicon/Plugins`)

(Optional) To use the Python script to split and convert the log file to separate m3u8 files:

1. Copy the Python script to a folder of your choice.
2. Create a file watch in your OS to run the script when a new log file is created in the plugin log folder `Documents/Lexicon/Plugins/Logs/export-playlist-to-m3u` (See the included Automator workflow for MacOS)

Please note that the Python script is provided as is and may need to be modified to work in your environment.

## Usage

1. Select one or more playlists in the playlist sidebar.
2. Go to the `Plugins` menu and select `run` under `Export Playlist to m3u`.

The plugin will generate a log file in the plugin log folder `Documents/Lexicon/Plugins/Logs/export-playlist-to-m3u` with all the playlists in m3u8 format.
