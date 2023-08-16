let postImages = "https://api.servicetori.site/api/posts/images/";
let token = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMjE3OTE1LCJpYXQiOjE2OTIyMTA3MTUsImp0aSI6ImY5NDY0YjM4NjFiZTQyMTFhYmI0MGExYjc0YTBiZGM3IiwidXNlcl9pZCI6MX0.vUKdj24XIIOZDZz9xFZt8biLD1gZs2tMgtFrqdLttpQ"

DecoupledEditor
	.create( document.querySelector( '#editor-content' ), {
        placeholder: "내용을 입력하세요", 
        toolbar: {
            items: [
                '|', 'bold', 'italic','Underline',
                '|', 'uploadImage', 'insertTable',
                '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
            ]
        }
    })
	.then( editor => {
		window.editor=editor;
        console.log( 'Editor was initialized', editor );
		document.body.appendChild( editor.ui.view.toolbar.element );
        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            return new UploadAdapter(loader);
        };
	} )
	.catch( err => {
		console.error( err.stack );
	} );

    class UploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }
        upload() {
            return this.loader.file
            .then(file => new Promise(async(resolve, reject) => {
                const data = new FormData();
                data.append('file', file);
                
                axios
                .post("https://api.servicetori.site/api/posts/images/", data,
                    {
                        withCredentials: true,
                    },
                )
                .then((response) => {
                    console.log(response.data);
                    uploadImagesId.push(response.data.id);
                    resolve({ default: response.data.url });
                })
    
                .catch((error) => {
                    console.error(error);
                    reject(err);
                });
                
            }));
        }
    
        abort() {
            const index = uploadImagesId.indexOf(this.loader.id);
            if (index > -1) {
              uploadImagesId.splice(index, 1);
            }
        }
    }

function getImages(editor) {
    const imageElements = Array.from(editor.model.document.getRoot().getChildren()).filter(item => item.is('image'));
    const imageIds = imageElements.map(element => {
        const src = element.getAttribute('src');
        const id = src.substring(src.lastIndexOf('/') + 1);
        return Number(id);
    });

    return imageIds;
}