/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  collection.listRule = "@collection.conversations.participants.id ~ @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm")

  collection.listRule = "@request.auth.verified = true"

  return dao.saveCollection(collection)
})
