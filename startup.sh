#!/bin/bash

#install the dependencies
pip install --no-cache-dir -r requirements.txt

#start the app
python3 app.py

#python3 -m http.server 8000