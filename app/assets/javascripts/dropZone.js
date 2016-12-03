Dropzone.options.coverUpload = { 
	paramName: "cover",
	method: "put",
	headers: { 'X-CSRF-Token': gon.auth_token }
}