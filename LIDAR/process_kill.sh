#!/bin/bash
process_kill() {
	local process_name=$1
	pids=$(pgrep $process_name)

	if [ -z "$pids" ]; then
		echo "No process named $process_name found."
	else
		for pid in $pids; do
			kill -9 $pid
			echo "Killed $process_name with PID $pid."
		done
	fi
}

process_kill "init"

process_kill "vlc"

#sleep 2s

lxterminal -e /home/hivepi/LIDAR/init
