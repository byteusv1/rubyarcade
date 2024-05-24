function openInNewTab(url) {
    window.open(url, '_blank');
}

const setObj = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
  }
  const getObj = function (key) {
    return JSON.parse(localStorage.getItem(key))
  }
  
  window.addEventListener('DOMContentLoaded', function() {
    var settingsContainer = document.getElementById('settingsContainer');
    if (settingsContainer) {
      fetch('settings.html')
        .then(response => response.text())
        .then(data => {
          settingsContainer.innerHTML = data;
        })
        .catch(error => console.error('Error loading settings:', error));
    }
  });