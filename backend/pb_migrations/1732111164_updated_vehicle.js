/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // remove
  collection.schema.removeField("rw2a6ill")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jl9wdfcw",
    "name": "induction",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "NA",
        "TURBO",
        "SC"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ekfbqwan",
    "name": "tyre_treadwear",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "over200",
        "above200"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrsqfabw",
    "name": "drivetrain_layout",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "RWD",
        "FWD",
        "AWD"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rw2a6ill",
    "name": "induction",
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

  // remove
  collection.schema.removeField("jl9wdfcw")

  // remove
  collection.schema.removeField("ekfbqwan")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wrsqfabw",
    "name": "drivetrain_layout",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "rear",
        "front",
        "all"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
