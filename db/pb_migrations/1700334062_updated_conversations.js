/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8dsawj8y",
    "name": "name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8dsawj8y",
    "name": "conversation_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
