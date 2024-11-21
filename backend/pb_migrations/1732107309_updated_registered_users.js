/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tu7ua1coupjxd94")

  // remove
  collection.schema.removeField("if0rjnnl")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tu7ua1coupjxd94")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "if0rjnnl",
    "name": "event_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2pvdawgvqmodag9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
