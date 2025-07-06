<script setup>
import FileSaver from 'file-saver';

import file1 from '@/files/example-document-1.docx?url';
import file2 from '@/files/example-document-2.docx?url';
import file3 from '@/files/example-document-3.docx?url';
import file4 from '@/files/example-document-4.docx?url';

// File downloadfunctie
function downloadFile(number = false) {
  let fileUrl = null;

  switch (number) {
    case 1:
      fileUrl = file1;
      break;
    case 2:
      fileUrl = file2;
      break;
    case 3:
      fileUrl = file3;
      break;
    case 4:
      fileUrl = file4;
      break;
    default:
      return;
  }

  fetch(fileUrl)
    .then(response => response.blob())
    .then(blob => {
      FileSaver.saveAs(blob, fileUrl.split('/').pop());
    })
    .catch(err => {
      console.error('Download mislukt:', err);
    });
}
</script>

<template>
  <main class="container">
    <router-link
  :to="{ name: 'home' }"
  class="btn btn-sm btn-danger"
  aria-label="Go Back">
  Go back
    </router-link>
    <div class="row">
      <div class="col-sm-6 mt-3">
        <div class="border rounded p-3">
          <h5>Example document 1</h5>
          <a
            @click.prevent="downloadFile(1)"
            class="btn btn-primary"
            aria-label="Download example document 1"
          >
            Download
          </a>
        </div>
      </div>
      <div class="col-sm-6 mt-3">
        <div class="border rounded p-3">
          <h5>Example document 2</h5>
          <a
            @click.prevent="downloadFile(2)"
            class="btn btn-primary"
            aria-label="Download example document 2"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
