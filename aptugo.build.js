const deploy = (parameters) => {
  return [{
    folders: ['build'],
    url: parameters.settings.url.substring(8).toLowerCase(),
    uploadURL: 'https://appuploader.aptugo.app:8500/upload?type=fe'
  },{
    folders: ['back-end'],
    url: parameters.settings.apiURL.substring(8).toLowerCase(),
    uploadURL: 'https://appuploader.aptugo.app:8500/upload?type=be'
  }]
}

export default deploy