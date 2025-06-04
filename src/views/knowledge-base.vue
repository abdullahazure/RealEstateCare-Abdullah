<template>
    <main class="container">
        <div class="row">
            <div class="col-sm-6 mt-3">
                <div class="border rounded p-3">
                    <h5>Example document 1</h5>
                    <!-- download file 1 -->
                    <a @click="file(1)" download class="btn btn-primary" aria-label="Download example document 1">Download</a>
                </div>
            </div>
            <div class="col-sm-6 mt-3">
                <div class="border rounded p-3">
                    <h5>Example document 2</h5>
                    <!-- download file 2 -->
                    <a @click="file(2)" download class="btn btn-primary" aria-label="Download example document 2">Download</a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import FileSaver from 'file-saver';

    import file1 from '@/files/example-document-1.docx?url'
    import file2 from '@/files/example-document-2.docx?url'
    import file3 from '@/files/example-document-3.docx?url'
    import file4 from '@/files/example-document-4.docx?url'

    export default {
        methods: {
            file(number = false) {
                switch(number) {
                    case 1:
                        fetch(file1)
                        // convert the file to a blob
                        .then(response => response.blob())
                        // use the FileSaver library to save the file
                        .then(blob => {
                            FileSaver.saveAs(blob, file1.split('/').pop());
                        });
                        break;
                    case 2:
                        fetch(file2)
                        // convert the file to a blob
                        .then(response => response.blob())
                        // use the FileSaver library to save the file
                        .then(blob => {
                            FileSaver.saveAs(blob, file2.split('/').pop());
                        });
                        break;
                    case 3:
                        fetch(file3)
                        // convert the file to a blob
                        .then(response => response.blob())
                        // use the FileSaver library to save the file
                        .then(blob => {
                            FileSaver.saveAs(blob, file3.split('/').pop());
                        });
                        break;
                    case 4:
                        fetch(file4)
                        // convert the file to a blob
                        .then(response => response.blob())
                        // use the FileSaver library to save the file
                        .then(blob => {
                            FileSaver.saveAs(blob, file4.split('/').pop());
                        });
                        break;
                    default:
                }
            },
            downloadFile(fileUrl) {
                // fetch the file from the provided url
                fetch(fileUrl)
                // convert the file to a blob
                .then(response => response.blob())
                // use the FileSaver library to save the file
                .then(blob => {
                    FileSaver.saveAs(blob, fileUrl.split('/').pop());
                });
            },
        },
    }
</script>