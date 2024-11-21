/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // remove
  collection.schema.removeField("nlb1n1ic")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "llzt1pcg",
    "name": "car_year",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nlb1n1ic",
    "name": "car_year",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("llzt1pcg")

  return dao.saveCollection(collection)
})
