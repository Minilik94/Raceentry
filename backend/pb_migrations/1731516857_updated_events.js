/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pvdawgvqmodag9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jjow88ut",
    "name": "avatar",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/jpeg",
        "image/webp",
        "image/vnd.mozilla.apng",
        "image/gif",
        "image/png"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "swyroqvj",
    "name": "description",
    "type": "editor",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szs2985p",
    "name": "location",
    "type": "text",
    "required": true,
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
    "id": "2ohnshbb",
    "name": "layout",
    "type": "text",
    "required": true,
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
    "id": "phrco0rj",
    "name": "date",
    "type": "text",
    "required": true,
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
    "id": "aoh6hlp0",
    "name": "cost",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yaxnor8p",
    "name": "approx_number_of_cars",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hucvo3bp",
    "name": "format",
    "type": "text",
    "required": true,
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
    "id": "hktaztvm",
    "name": "natsoft_timing",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tuxswn0h",
    "name": "sessions",
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
    "id": "zzafeivl",
    "name": "eligible_cars",
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
    "id": "uewcme32",
    "name": "second_driver_policy",
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
    "id": "imx9uajy",
    "name": "passenger_policy",
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
    "id": "nffa7eog",
    "name": "aasa_license",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jgetenzr",
    "name": "engine_requirement",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jmpbglrz",
    "name": "additional_infos",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2pvdawgvqmodag9")

  // remove
  collection.schema.removeField("jjow88ut")

  // remove
  collection.schema.removeField("swyroqvj")

  // remove
  collection.schema.removeField("szs2985p")

  // remove
  collection.schema.removeField("2ohnshbb")

  // remove
  collection.schema.removeField("phrco0rj")

  // remove
  collection.schema.removeField("aoh6hlp0")

  // remove
  collection.schema.removeField("yaxnor8p")

  // remove
  collection.schema.removeField("hucvo3bp")

  // remove
  collection.schema.removeField("hktaztvm")

  // remove
  collection.schema.removeField("tuxswn0h")

  // remove
  collection.schema.removeField("zzafeivl")

  // remove
  collection.schema.removeField("uewcme32")

  // remove
  collection.schema.removeField("imx9uajy")

  // remove
  collection.schema.removeField("nffa7eog")

  // remove
  collection.schema.removeField("jgetenzr")

  // remove
  collection.schema.removeField("jmpbglrz")

  return dao.saveCollection(collection)
})
