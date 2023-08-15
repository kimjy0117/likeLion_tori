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
                .post("http://3.36.100.188/api/posts/images/", data,
                    {
                        headers: {
                            'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyMDk1MjQxLCJpYXQiOjE2OTIwODgwNDEsImp0aSI6ImIzZTQ0ODBmZWM0YjQxMDRiODg1YTAyMTZlNmFmYmY2IiwidXNlcl9pZCI6MX0.SGXk-M-dnoODH27XqtsKPysf-g3vAQqfyKunMpdMpYE",
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    resolve({ default: response.data.url });
                })

                .catch((error) => {
                    console.error(error);
                    reject(err);
                });
                
            }));
    }

    abort() {}
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