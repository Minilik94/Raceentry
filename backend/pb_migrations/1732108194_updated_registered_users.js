/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tu7ua1coupjxd94")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsyhdmus",
    "name": "emergency_contact",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ja2kkr6f",
    "name": "cars",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2bz97fql4sqbkg0",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tu7ua1coupjxd94")

  // remove
  collection.schema.removeField("hsyhdmus")

  // remove
  collection.schema.removeField("ja2kkr6f")

  return dao.saveCollection(collection)
})
