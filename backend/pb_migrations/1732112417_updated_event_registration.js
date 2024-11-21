/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jz0c1ccbd3gxw1m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "betedrfs",
    "name": "expected_lap_times",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "values": [
        "1:46 - 2:00",
        "1:40 - 1:45",
        "1:35 - 1:39",
        "1:29 - 1:35",
        "1:20 - 1:29"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jz0c1ccbd3gxw1m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "betedrfs",
    "name": "expected_lap_times",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "1:46 - 2:00",
        "1:40 - 1:45",
        "1:35 - 1:39",
        "1:29 - 1:35",
        "1:20 - 1:29"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
