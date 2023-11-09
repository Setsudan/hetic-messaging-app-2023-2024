/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zgnut8qil7kwy8y")

  // remove
  collection.schema.removeField("bgqyedhm")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zgnut8qil7kwy8y")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgqyedhm",
    "name": "conversation",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "2rxz80jw9l4pwsm",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
