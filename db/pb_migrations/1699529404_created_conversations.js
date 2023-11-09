/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2rxz80jw9l4pwsm",
    "created": "2023-11-09 11:30:04.596Z",
    "updated": "2023-11-09 11:30:04.596Z",
    "name": "conversations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fzkgw7ab",
        "name": "participants",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("2rxz80jw9l4pwsm");

  return dao.deleteCollection(collection);
})
