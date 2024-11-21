/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2bz97fql4sqbkg0",
    "created": "2024-11-20 13:01:32.101Z",
    "updated": "2024-11-20 13:01:32.101Z",
    "name": "vehicle",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "toq7ytpt",
        "name": "car_make",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "196vw9dr",
        "name": "car_model",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "h5bn72er",
        "name": "car_colour",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2bz97fql4sqbkg0");

  return dao.deleteCollection(collection);
})
