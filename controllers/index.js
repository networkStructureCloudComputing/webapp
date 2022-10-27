const createUser = require("./createUser");
const updateUser = require("./updateUser");
const viewUser = require("./viewUser");
const uploadDoc = require("./uploadDoc");
const getDocumentData = require("./getDoc");
const getAllData = require("./getAllData");
const deleteDoc = require("./deleteDoc")

module.exports = {
    createUser,
    updateUser,
    viewUser,
    uploadDoc,
    getDocumentData,
    getAllData,
    deleteDoc
};