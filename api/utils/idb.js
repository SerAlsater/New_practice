import { MongoClient, ObjectId } from "mongodb";

class db {
    static connection_uri = process.env.DB_CONNECTION_URI || 'mongodb://127.0.0.1:27017/test';
    static collection;
    static limit = 100;
    
    static client = new MongoClient(db.connection_uri);

    /**
     * Configuration methods
     */
    static set_collection(collection) {
        this.collection = collection;
    }

    static set_connection_uri(db_name) {
        this.connection_uri = 'mongodb://localhost:27017/' + db_name;
        this.client = new MongoClient(db.connection_uri);
    }

    static set_limit(limit) {
        this.limit = limit;
    }

    /**
     * Start / close connection
     */
    
    static async start_connection() {
        try {
            await this.client.connect();
        }
        catch (e) {
            console.log('[DB]: ' + e);
        }
    }

    static async close_connection() {
        try {
            await this.client.close();
        }
        catch (e) {
            console.log('[DB]: ' + e);
        }
    }

    static async save(data, collection_name) {
        try {
            // await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            const id = (await collection.insertOne(data)).insertedId;
            return { Ok: id };
        }
        catch (e) {
            console.log(e);
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async find(filter, collection_name){
        try {
            //await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);

            const data = await collection.findOne(filter);

            return {Ok: data};
        }
        catch (e) {
            console.log(e);
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async find_all(filter, collection_name, limit, skip) {
        try {
            //await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);

            const cursor = collection.find(filter ? filter : {}).skip(skip ? skip : 0).limit(limit ? limit : db.limit);;
            const all_values = await cursor.toArray();

            return {Ok: all_values};
        }
        catch (e) {
            console.log(e)
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async update(filter, data, collection_name) {
        try {
            //await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            const test = await collection.updateOne(filter, data);

            return {Ok: test};
        }
        catch (e) {
            console.log(e);
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async delete(id, collection_name){
        try {
            //await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            await collection.deleteOne({_id: new ObjectId(id)});
            return {Ok: true};
        }
        catch (e) {
            console.log(e);
            return {Ok: false, Err: new Error("err:" + e)}
        }
    }

    /**
     * Complex funcitons
    */

    // Funciton makes sure that object in this collection is unique. If Object exists, update it, if doesnt, create it.
    static async save_unique(filter, new_object, collection_name) {
        try {
            const collection = collection_name ? collection_name : db.collection;

            const exists = await db.find(filter, collection);
            if (exists.Ok != null) {
                await db.delete(exists.Ok._id.toString(), collection);
            }

            const document = await db.save(new_object, collection);
            if (!document.Ok)
                return { Ok: null, Err: new Error("err:") };
            
            return { Ok: document.Ok };
        }
        catch (e) {
            console.log(e);
            throw new Error('DB error');
        }
    }
}

export default db