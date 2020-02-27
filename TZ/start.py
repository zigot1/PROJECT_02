#####################################################################
## Copyright (c) Autodesk, Inc. All rights reserved
## Written by Forge Partner Development
##
## Permission to use, copy, modify, and distribute this software in
## object code form for any purpose and without fee is hereby granted,
## provided that the above copyright notice appears in all copies and
## that both that copyright notice and the limited warranty and
## restricted rights notice below appear in all supporting
## documentation.
##
## AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
## AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
## MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
## DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
## UNINTERRUPTED OR ERROR FREE.
#####################################################################

#!/usr/bin/env python2.7
import argparse
import config.state as state
import config.env as env
import urllib
import simple_http_server as SimpleHTTPServer
from urlparse import urljoin

from flask import Flask, render_template, redirect
import pymongo

app = Flask(__name__)

@app.route("/")
def index():
    parser = argparse.ArgumentParser(
        description='Run Forge authentication script.')
    parser.add_argument('CA9W5KNEWI5YW6MAyYIXVSHBaSs3iA4L', required=True)
    parser.add_argument('AnmVcWf29x82odX5', required=True)
    parser.add_argument('http://localhost:8000', required=True)
    state.args = parser.parse_args()
    authorization_url = urljoin(
        env.authorize_url,
        '?response_type=code&client_id=' +
        state.args.FORGE_CLIENT_ID +
        '&redirect_uri=' +
        urllib.quote_plus(
            state.args.FORGE_CALLBACK_URL) +
        '&scope=data:read%20data:write')
    try:
        #import webbrowser
        #webbrowser.open(authorization_url, new=0, autoraise=True)
        return render_template("index.html")#, Articles=Articles , DayImage=DayImage, Weather=Weather, Data=Data, Hemi=Hemi)

    except ImportError:
        print ("Can not import webbrowser")
        print ("Go to the following link in your browser if the redirection hasn't started: ")
        print (authorization_url)
        SimpleHTTPServer.startHttpServer()

# @app.route("/")
# def index():
#     # scrape.Mars_scrape(db)
#     # Articles = list(db.Mars_Articles.find())
#     # DayImage = list(db.Mars_Image.find())
#     # Weather = list(db.Mars_Weather.find())
#     # Hemi = list(db.Mars_Hemispheres.find())
#     # Data = list(db.Mars_Data.find())
#     return render_template("index.html")#, Articles=Articles , DayImage=DayImage, Weather=Weather, Data=Data, Hemi=Hemi)

if __name__ == "__main__":
    start()