document.addEventListener("DOMContentLoaded", function() {
    jQuery('.toggle-password').click(function(){
        console.log('Toggle password clicked');
        $(this).children().toggleClass('mdi-eye-outline mdi-eye-off-outline');
        let input = $(this).prev();
        console.log('Input field:', input);
        input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
        console.log('Input type:', input.attr('type'));
    });

    var isAdvancedUpload = (function () {
        var div = document.createElement("div");
        return (
            ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
            "FormData" in window &&
            "FileReader" in window
        );
    })();

    let fileInput = document.querySelector(".default-file-input");
    let uploadIcon = document.querySelector(".upload-icon");
    let cannotUploadMessage = document.querySelector(".cannot-upload-message");
    let uploadedFile = document.querySelector(".file-block");
    let fileName = document.querySelector(".file-name");
    let fileSize = document.querySelector(".file-size");
    let progressBar = document.querySelector(".progress-bar");
    let uploadButton = document.querySelector(".upload-button");
    let fileFlag = 0;

    if (fileInput) {
        fileInput.addEventListener("change", function(e) {
            let file = e.target.files[0];
            if (file) {
                uploadIcon.innerHTML = "check";
                fileName.textContent = file.name;
                fileSize.textContent = (file.size / 1024).toFixed(1) + " KB";
                uploadedFile.style.display = "flex";
                progressBar.style.width = "0";
                fileFlag = 0;
            }
        });
    }

    if (uploadButton) {
        uploadButton.addEventListener("click", function() {
            if (fileInput.value && fileFlag === 0) {
                fileFlag = 1;
                let width = 0;
                let id = setInterval(function() {
                    if (width >= 390) {
                        clearInterval(id);
                        uploadButton.innerHTML = `<span class="material-icons-outlined upload-button-icon">check</span> Uploaded`;
                    } else {
                        width += 5;
                        progressBar.style.width = width + "px";
                    }
                }, 50);
            } else {
                cannotUploadMessage.style.display = "flex";
            }
        });
    }

    let cancelAlertButton = document.querySelector(".cancel-alert-button");
    if (cancelAlertButton) {
        cancelAlertButton.addEventListener("click", function() {
            cannotUploadMessage.style.display = "none";
        });
    }

    if (isAdvancedUpload) {
        let draggableFileArea = document.querySelector(".drag-file-area");

        if (draggableFileArea) {
            ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(function(evt) {
                draggableFileArea.addEventListener(evt, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ["dragover", "dragenter"].forEach(function(evt) {
                draggableFileArea.addEventListener(evt, function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    uploadIcon.innerHTML = "file_download";
                });
            });

            draggableFileArea.addEventListener("drop", function(e) {
                e.preventDefault();
                e.stopPropagation();
                uploadIcon.innerHTML = "check";
                document.querySelector(".label").innerHTML = `<span class="browse-files"><span class="successful-message">File Dropped Successfully!</span> </span>`;
                uploadButton.innerHTML = `Upload`;

                let files = e.dataTransfer.files;
                fileInput.files = files;
                fileName.innerHTML = files[0].name;
                fileSize.innerHTML = (files[0].size / 1024).toFixed(1) + " KB";
                uploadedFile.style.display = "flex";
                progressBar.style.width = "0";
                fileFlag = 0;
            });
        }
    }
});
