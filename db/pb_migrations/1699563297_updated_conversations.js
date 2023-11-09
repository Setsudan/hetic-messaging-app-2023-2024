/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rybslj9s",
    "name": "messages",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zgnut8qil7kwy8y",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  // remove
  collection.schema.removeField("rybslj9s")

  return dao.saveCollection(collection)
})
