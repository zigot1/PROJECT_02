
from flask import Flask, render_template, redirect, request, jsonify,url_for
import pymongo
import pandas as pd 
import sys
import webbrowser
import json
####
import forge

##import popMongo

##Mongo Connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
dbName = "B360_CONN"

if dbName in client.list_database_names():
    print("B360_CONN")
    db = client[dbName]
    print("B360_CONN DB Connected")
else:
    print("B360_CONN not existing -> New Created")
    db = client[dbName]
############################################################################
##### get lat and longitude pair from Projects Collection
############################################################################
def getAll (inZip):
    print ('ZIP code search_', inZip)
    mycol = db['clean_projects']
    myquery = {'postal_code': inZip}
    myLocations = mycol.find()
    List = []
    # for x in myLocation:
    #     print(x)
    for entry in myLocations:
        v = entry
        del v['_id']
        #print(v)
        List.append(v)
    #return (json.dumps(List))
    projectsCollection = json.dumps(List, indent = 4)

    with open("static/new_projects.json", "w") as outfile:
        outfile.write(projectsCollection) 

    #callmap2(json.dumps(List))
############################################################################
##### get lat and longitude pair from Projects Collection
############################################################################
def getLatLon (inZip):
    print ('ZIP code search_', inZip)
    mycol = db['clean_projects']
    myquery = {'postal_code': inZip}
    myLocation = mycol.find(myquery)
    List = []
    # for x in myLocation:
    #     print(x)
    for pair in myLocation:
        v = pair
        del v['_id']
        #print(v)
        List.append(v)
    return (json.dumps(List))
    #callmap()
    #callmap2(json.dumps(List))
#############################################################################
##### Populate Mongo Collection with Project Object
##############################################################################
def populProjects():
    print('Mongo polulating.....')
    file = "static/zip.csv"
    data = pd.read_csv('data/csv/admin_projects.csv') ## Create Project Data Frame
    ZIP_DF = pd.read_csv(file, encoding='ISO-8859-1',dtype = {'zip':'str'}) ## Create ZIP dataframe
    ### Clean project data
    cleanData = pd.DataFrame(data[['id','bim360_account_id','status','name','start_date','type','value','postal_code']])
    activeProjects = cleanData[(cleanData['status'] == 'active' )& (cleanData['value'] > 5000000)]
    usableProjects = activeProjects.dropna(how='any')
    
    temp_df = usableProjects.merge(ZIP_DF, left_on='postal_code', right_on='zip')
    combined_df = pd.DataFrame(temp_df[['bim360_account_id','id','name','postal_code','start_date','status','type','value','latitude','longitude','city','state','county','other_info']])
    print(combined_df.count())
    db = client[dbName]
    collection_name = 'clean_projects'
    db_cm = db[collection_name]
    data_json = json.loads(combined_df.to_json(orient='records'))
    db_cm.delete_many
    db_cm.insert_many(data_json)
####################################################
####################################################
def pushJson():
    collection_name = 'clean_projects'
    db_cm = db[collection_name]
    projects = db_cm.find()
    List = []

    for project in projects:
        v = project
        del v['_id']
        #print(v)
        List.append(v)
    return (json.dumps(List))
#########################################################
#########################################################


app = Flask(__name__, template_folder='templates',static_folder='static')

# Set route
@app.route("/")
def index():
    ## Route 01
    return render_template("index.html")
####################################################################################
###     ZIP TO MAP
####################################################################################
# Set route
@app.route("/ziptomap",methods = ['GET','POST'])
def ziptomap():
    if request.method == 'POST':
        print('ZIP Incoming..')
        location = {}
        message = {'greeting':'POST worked  !'}
        data = request.get_data().decode("utf-8")
        # data1 = getLatLon(data)
        data1 = getAll(data)
        return data1
    else:
        message = {'greeting':'Bummer  !'}
        return jsonify(message)  
####################################################################################
# Call Maps
####################################################################################
@app.route("/callmap/")
def callmap():
    ## Route 01
    print('CALLMAP no Argument API map call routed')
    return render_template("Site-Map.html")
####################################################################################
# Call Maps 2
####################################################################################
@app.route("/callmap2/")
def callmap2(inLocation):
    ## Route 01
    print('CALLMAP2 with Argument API map call routed')
    #return render_template("Site-Map.html")
    project2js
    #return render_template("Site-Map.html")
    return jsonify(eval(pushJson()))
#####################################################################################
####            GET DATA
#####################################################################################
###Set route get csv data
@app.route('/getdata', methods=['GET','POST'])
def push2js ():
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        return jsonify(eval(pushJson()))
    else:
        print('Outgoing..')
        return jsonify(eval(pushJson()))  # serialize and use JSON headers
#####################################################################################
####            GET Project
#####################################################################################
###Set route get csv data
@app.route('/getproject', methods=['GET','POST'])
def project2js ():
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        return jsonify(eval(pushJson()))
    else:
        print('Outgoing..')
        return jsonify(eval(pushJson()))  # serialize and use JSON headers
##################################################################
###Set route get csv data
@app.route('/pushdata', methods=['GET','POST'])
def push2mongo ():
        message = {'greeting':'Projects Populated  !'}
        populProjects()
        return jsonify(message)  # serialize and use JSON headers
##################################################################

@app.route('/token', methods=['GET', 'POST'])
def token():
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers





if __name__ == "__main__":
    app.run(debug=True)

    