const loader = new THREE.FileLoader(THREE.DefaultLoadingManager)

const loadFiles = (files) => {
	const tab = []
	return files.reduce((promise, file) => {
    return promise
			.then((result) => {
				return asyncLoad(file).then((response)=> { 
					tab.push(response)
					return tab
				})
			})
			.catch(console.error)
	}, Promise.resolve())
}

function asyncLoad(file) {
  return new Promise((resolve, reject) => {
    loader.load(file, (text) => {
			resolve(text)
		})
  });
}

export default {
  loadFiles
}