#!/usr/bin/env python3

import sys
import subprocess

COMMAND_HIGH = "echo 'add /home/hivepi/LIDAR/video1.mp4' | socat - UNIX-CONNECT:/tmp/vlc-control"
COMMAND_LOW = "echo 'add /home/hivepi/LIDAR/video2.mp4' | socat - UNIX-CONNECT:/tmp/vlc-control"
##comment

def run_command(cmd):
    subprocess.run(cmd, shell=True)


def main():
    last_command = None
    high_count = 0
    low_count = 0

    for line in sys.stdin:
        try:
            number = int(line.strip())

            if number > 2300:
                high_count += 1
                low_count = 0
            else:
                low_count += 1
                high_count = 0

            if high_count == 3 and last_command != COMMAND_HIGH:
                run_command(COMMAND_HIGH)
                last_command = COMMAND_HIGH
                high_count = 0

            if low_count == 3 and last_command != COMMAND_LOW:
                run_command(COMMAND_LOW)
                last_command = COMMAND_LOW
                low_count = 0

        except ValueError:
            print(f"Invalid number received: {line.strip()}")
            continue


if __name__ == "__main__":
    main()
