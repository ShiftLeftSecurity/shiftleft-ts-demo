import { MongoClient, MongoCallback } from 'mongodb';

export class MongoDBClient {
  url:string;
  db:undefined | MongoClient;
  constructor(host = 'tarpit_mongo_1', port = '27017') {
    this.url = `mongodb://${host}:${port}`;
    this.db = undefined;
  }
  connect(callback: MongoCallback<MongoClient>) {
    MongoClient.connect(
      this.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: { user: 'admin', password: 'password' }
      },
      (err, db) => {
        if (!err) {
          console.log('MongoDB Connected');
          this.db = db;
        }
        callback(err, db);
      }
    );
  }
  close() {
    if (this.db) {
      this.db.close();
    }
  }
}
