
from flask import Flask, render_template, redirect, request, jsonify
import pymongo
import pandas as pd 
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

def populProjects():
    print('Mongo polulating.....')
    data = pd.read_csv('data/csv/admin_projects.csv')
    #data_json = json.loads(data.to_json(orient='records'))
    cleanData = pd.DataFrame(data[['id','bim360_account_id','status','name','start_date','type','value','postal_code']])
    activeProjects = cleanData[(cleanData['status'] == 'active' )& (cleanData['value'] > 5000000)]
    usableProjects = activeProjects.dropna(how='any')
    print(usableProjects.count())
    #conn = 'mongodb://localhost:27017'
    #client = pymongo.MongoClient(conn)
    #dbName = "B360_CONN"
    db = client[dbName]
    collection_name = 'clean_projects'
    db_cm = db[collection_name]
    #data = pd.read_csv('data/csv/admin_projects.csv')
    data_json = json.loads(usableProjects.to_json(orient='records'))
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
        print(v)
        List.append(v)
    return (json.dumps(List))
####Call Scrapping Function
##scrape.Mars_scrape(db)
#### Scrapping completed


app = Flask(__name__)

# Set route
@app.route("/")
def index():
    ## Route 01
    return render_template("index.html")
####################################################################################
# Gall Maps
####################################################################################
@app.route("/callmap")
def callmap():
    ## Route 01
    return render_template("Website_02/mapTest.html")

#####################################################################################
####            GET DATA
#####################################################################################
###Set route get csv data
@app.route('/getdata', methods=['GET','POST'])
def push2js ():
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        #print(request.get_json())  # parse as JSON
        #return 'OK-message received', 200
        return jsonify(eval(pushJson()))
    # GET request
    else:
        message = {'greeting':'GET-DATA Hello from Flask!'}
        #populProjects()
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

#@app.route('/postmethod', methods = ['POST'])
# def post_javascript_data():
#     jsdata = request.form['canvas_data']
#     unique_id = create_csv(jsdata)
#     params = { 'uuid' : unique_id }
#     return jsonify(params)




if __name__ == "__main__":
    app.run(debug=True)

    