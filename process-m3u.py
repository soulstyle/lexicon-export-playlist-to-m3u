#!/usr/bin/env python3

import os
import argparse

# global settings
start_delimiter = '###STARTM3U'
end_delimiter = '###ENDM3U'

# parse command line arguments
parser = argparse.ArgumentParser()
parser.add_argument("-i", "--input-file", required=True, help="input filename")
parser.add_argument("-o", "--output-dir", required=True, help="output directory")

args = parser.parse_args()

# read the input file
with open(args.input_file, 'r') as input_file:
    input_data = input_file.read()

# iterate through the input data by line
input_lines = input_data.splitlines()
while input_lines:
    # discard lines until the next start delimiter
    while input_lines and not input_lines[0].startswith(start_delimiter):
        input_lines.pop(0)

    # corner case: no delimiter found and no more lines left
    if not input_lines:
        break

    # extract the output filename from the start delimiter
    output_filename = input_lines.pop(0).replace(start_delimiter, "").strip() + ".m3u8"
    output_path = os.path.join(args.output_dir, output_filename)

    # open the output file
    print("extracting file: {0}".format(output_path))
    with open(output_path, 'w') as output_file:
        # while we have lines left and they don't match the end delimiter
        while input_lines and not input_lines[0].startswith(end_delimiter):
            output_file.write("{0}\n".format(input_lines.pop(0)))

        # remove end delimiter if present
        if not input_lines:
            input_lines.pop(0)