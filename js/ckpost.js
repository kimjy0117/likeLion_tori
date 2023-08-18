let postImages = "https://api.servicetori.site/api/posts/images/";
let uploadImagesId = [];
let sessionData = sessionStorage.getItem("access");

let token = "Bearer "+ sessionData;


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
	})
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
                data.append('image', file);
                
                axios
                .post("https://api.servicetori.site/api/posts/images/", data,
                    {
                        headers: {Authorization: token}
                    },
                )
                .then((response) => {
                    uploadImagesId.push(response.data.id);
                    resolve({ default: response.data.url });
                })
    
                .catch((error) => {
                    console.error(error);
                    reject(error);
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