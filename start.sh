#!/bin/bash

export PORT=5104

cd ~/www/task_tracker_3
./bin/task_tracker_3 stop || true
./bin/task_tracker_3 start
