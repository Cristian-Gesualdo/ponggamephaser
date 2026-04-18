const setDeletedInCollection = async (modelName) => {
  const Model = mongoose.models[modelName]
  if (!Model) {
    throw new Error(`The model ${modelName} doesn't exist`)
  }
  return await Model.updateMany({ isDeleted: { $exists: false } }, { $set: { isDeleted: false } })
}

module.exports = {
  setDeletedInCollection,
}
