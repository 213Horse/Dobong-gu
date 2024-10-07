/*****************communication-wishes-to-the-mayor-writing*****************/
let allFiles = [];

document.getElementById('file').addEventListener('change', function(event) {
    const files = Array.from(event.target.files);

    let totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);

    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
        const fileSizeMB = files[i].size / (1024 * 1024);

        if (fileSizeMB > 5) {
            alert(`File "${files[i].name}" 5MB를 초과하면 추가되지 않습니다.`);
            continue;
        }

        if ((totalSize + files[i].size) / (1024 * 1024) > 5) {
            alert(`파일 추가 "${files[i].name}" 총 용량이 5MB를 초과하게 됩니다. 파일이 추가되지 않습니다.`);
            continue;
        }

        validFiles.push(files[i]);
        totalSize += files[i].size;
    }

    if (validFiles.length > 0) {
        allFiles = allFiles.concat(validFiles);
        updateFileListDisplay();
    }
    event.target.value = '';
});

function updateFileListDisplay() {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';

    allFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        // Checkbox cho mỗi file
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('file-checkbox');
        checkbox.dataset.index = index;

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        const fileSize = document.createElement('span');
        fileSize.classList.add('file-size');
        fileSize.textContent = `(${(file.size / 1024 / 1024).toFixed(1)} MB)`;


        fileItem.appendChild(checkbox);
        fileItem.appendChild(fileName);
        fileItem.appendChild(fileSize);

        fileList.appendChild(fileItem);
    });

    if (fileList.children.length > 0) {
        fileList.style.display = 'block';
        document.querySelector('.file-upload-message').style.display = 'none';
    } else {
        fileList.style.display = 'none';
        document.querySelector('.file-upload-message').style.display = '';
    }

    updateTotalFileSize();
}

function updateTotalFileSize() {
    const totalSize = allFiles.reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(1);
    document.querySelector('.file-info').textContent = `${totalSizeMB}MB / 5MB`;
}

document.querySelector('.button-up-rm-file').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    const filesToRemove = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            filesToRemove.push(parseInt(checkbox.dataset.index));
        }
    });

    allFiles = allFiles.filter((_, index) => !filesToRemove.includes(index));

    updateFileListDisplay();
});

/*****************communication-requests-to-the-district-mayor******************/
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function() {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(tab => {
          tab.classList.remove('active');
      });
      
      // Add active class to the clicked tab
      this.classList.add('active');

      // Redirect to a different page based on data-tab attribute
      const tabId = this.getAttribute('data-tab');
      
      // Define URLs for each tab
      let url = '';
      if (tabId === '1') {
          url = '/RequeststotheDistrictMayor.html';
      } else if (tabId === '2') {
          url = '/main.html';
      } else if (tabId === '3') {
          url = 'page3.html';
      }
      
      // Redirect to the corresponding page
      if (url) {
          window.location.href = url;
      }
  });
});
/*******active tab header********/
window.addEventListener("DOMContentLoaded", (event) => {
  const defaultActiveItem = document.querySelector(".menu-item:nth-child(4)");
  defaultActiveItem.classList.add("active");
});

const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});


/********************scroll to top button********************/
// Function to scroll to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Show button when the user scrolls down 100px
window.onscroll = function () {
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

/************************/

/*****************communication-resident-jury-system*****************/

document.getElementById('apply-button').addEventListener('click', function() {
  const selectedYear = document.getElementById('year-select').value;
  alert('Year selected: ' + selectedYear);
});




