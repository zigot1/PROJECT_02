
def import_content(cName, filepath, client):
    # conn = 'mongodb://localhost:27017'
    # client = pymongo.MongoClient(conn)
    dbName = "B360_CONN"

    db = client[dbName]
     
    collection_name = cName ##// Replace mongo db collection name
    db_cm = db[collection_name]
    #cdir = os.path.dirname(__file__)
    file_res = filepath + cName
    print(file_res)
    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    db_cm.remove()
    db_cm.insert(data_json)

# if __name__ == "__main__":
#   filepath = '/path/to/csv/path' #### // pass csv file path
#   import_content(filepath)