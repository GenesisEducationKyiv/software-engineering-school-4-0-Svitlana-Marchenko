import * as dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export interface Collections {
   events?: Collection
}

export const collections: Collections = {}

export async function connectToDatabase(): Promise<void> {
   const client: MongoClient = new MongoClient(process.env.DB_CONN)

   try {
      await client.connect()
      const db: Db = client.db(process.env.DB_NAME)
      const eventsCollection: Collection = db.collection(
         process.env.EVENTS_COLLECTION_NAME,
      )

      collections.events = eventsCollection

      console.log(
         `Successfully connected to database: ${db.databaseName} and collection: ${eventsCollection.collectionName}`,
      )
   } catch (error) {
      console.error('Error connecting to database:', error)
   }
}
