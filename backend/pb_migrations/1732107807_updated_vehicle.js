/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "45dxqgfm",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0")

  // remove
  collection.schema.removeField("45dxqgfm")

  return dao.saveCollection(collection)
})