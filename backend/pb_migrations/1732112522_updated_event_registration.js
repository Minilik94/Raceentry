/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jz0c1ccbd3gxw1m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjjl3ukm",
    "name": "class_catagory",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 8,
      "values": [
        "RWD Over 200 Treadwear",
        "FWD Over 200 Treadwear",
        "AWD Over 200 Treadwear",
        "Other Over 200 Treadwear",
        "RWD Under 200 Treadwear",
        "FWD Under 200 Treadwear",
        "AWD Under 200 Treadwear",
        "Other Under 200 Treadwear"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jz0c1ccbd3gxw1m")

  // remove
  collection.schema.removeField("hjjl3ukm")

  return dao.saveCollection(collection)
})
