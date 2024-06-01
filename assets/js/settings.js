const presets = {
    google: {
        title: 'Google',
        favicon: 'https://www.google.com/favicon.ico'
    },
    classroom: {
        title: 'Home',
        favicon: 'https://www.gstatic.com/classroom/favicon.png'
    },
    canvas: {
        title: 'Canvas',
        favicon: 'https://canvas.instructure.com/favicon.ico'
    },
    docs: {
        title: 'Google Docs',
        favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico'
    },
    clever: {
        title: 'Clever | Portal',
        favicon: 'https://www.clever.com/wp-content/uploads/2023/06/cropped-Favicon-512px-32x32.png'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    applySettings();
    displayPanicKey();
    loadThemeFromLocalStorage();
    loadBackgroundSettings();


    document.getElementById('background-url').addEventListener('input', saveBackgroundImage);
    document.getElementById('backgroundToggle').addEventListener('change', toggleBackgroundImage);
});





function saveBackgroundImage() {
    const backgroundImageURL = document.getElementById('background-url').value;
    localStorage.setItem('backgroundImageURL', backgroundImageURL); 
    applyBackgroundImage();
}

function applyBackgroundImage() {
    const backgroundImageURL = localStorage.getItem('backgroundImageURL');
    const backgroundEnabled = localStorage.getItem('backgroundEnabled') === 'true';

    if (backgroundImageURL) {
        document.body.style.backgroundImage = backgroundEnabled ? `url('${backgroundImageURL}')` : '';
        document.body.style.backgroundRepeat = backgroundEnabled ? 'repeat' : '';
        document.body.style.backgroundSize = backgroundEnabled ? '100% 100%' : '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyBackgroundImage();
});

document.addEventListener('DOMContentLoaded', () => {
    applyBackgroundImage();
});

function toggleBackgroundImage() {
    const backgroundEnabled = document.getElementById('backgroundToggle').checked;
    localStorage.setItem('backgroundEnabled', backgroundEnabled);
    applyBackgroundImage();
}

function loadBackgroundSettings() {
    const backgroundImageURL = localStorage.getItem('backgroundImageURL');
    const backgroundEnabled = localStorage.getItem('backgroundEnabled') === 'true';

    if (backgroundImageURL) {
        document.getElementById('background-url').value = backgroundImageURL;
    }
    document.getElementById('backgroundToggle').checked = backgroundEnabled;
    applyBackgroundImage();
}

document.addEventListener('DOMContentLoaded', () => {
    loadBackgroundSettings();

    document.getElementById('background-url').addEventListener('input', saveBackgroundImage);
    document.getElementById('backgroundToggle').addEventListener('change', toggleBackgroundImage);
});




function applyPreset(preset) {
    const selectedPreset = presets[preset];
    document.getElementById('title').value = selectedPreset.title;
    document.getElementById('favicon').value = selectedPreset.favicon;
    saveAndApplySettings();
}

function saveAndApplySettings() {
    const title = document.getElementById('title').value;
    const faviconURL = document.getElementById('favicon').value;

    localStorage.setItem('cloakedTitle', title);
    localStorage.setItem('cloakedFavicon', faviconURL);

    applySettings();
}
function applySettings() {
    const title = localStorage.getItem('cloakedTitle');
    const faviconURL = localStorage.getItem('cloakedFavicon');

    if (title) {
        document.title = title;
    }

    if (faviconURL) {
        let favicon = document.getElementById('dynamic-favicon');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.id = 'dynamic-favicon';
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = faviconURL;
    }
}

function loadSettings() {
    const savedTitle = localStorage.getItem('cloakedTitle');
    const savedFavicon = localStorage.getItem('cloakedFavicon');

    if (savedTitle) {
        document.title = savedTitle;
    }

    if (savedFavicon) {
        let favicon = document.getElementById('dynamic-favicon');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.id = 'dynamic-favicon';
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = savedFavicon;
    }
}


let recordingPanicKey = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    applySettings();
    displayPanicKey();
    loadThemeFromLocalStorage();
    setAvatar();

    document.getElementById('set-panic-key-button').addEventListener('click', setPanicKey);
});

function setPanicKey() {
    recordingPanicKey = true;
    const button = document.getElementById('set-panic-key-button');
    button.innerText = 'Recording...';
}

document.addEventListener('keydown', (event) => {
    if (recordingPanicKey) {
        const panicKey = event.key.toLowerCase();
        localStorage.setItem('panicKey', panicKey);
        displayPanicKey();
        recordingPanicKey = false;
        const button = document.getElementById('set-panic-key-button');
        button.innerText = 'Set Panic Key';
    } else {
        panic(event);
    }
});

function displayPanicKey() {
    const panicKey = localStorage.getItem('panicKey');
    if (panicKey) {
        document.getElementById('current-panic-key').innerText = `${panicKey}`;
    } else {
        document.getElementById('current-panic-key').innerText = "No Panic Key Set";
    }
}

function panic(event) {
    const panicURL = 'https://www.classroom.google.com/';
    const panicKey = localStorage.getItem('panicKey');
    const keyPressed = event.key.toLowerCase();

    if (keyPressed === panicKey) {
        window.location.href = panicURL;
    }
}





function saveThemeToLocalStorage(theme) {
    localStorage.setItem('selectedTheme', theme);
}


function applySelectedTheme(theme) {
    document.body.setAttribute('theme', theme);
}


const themeSelect = document.getElementById('theme-select');
if (themeSelect) {
    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        applySelectedTheme(selectedTheme);
        saveThemeToLocalStorage(selectedTheme);
    });
}

function loadThemeFromLocalStorage() {
    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme) {
        applySelectedTheme(selectedTheme);
        if (themeSelect) {
            themeSelect.value = selectedTheme;
        }
    }
}


document.addEventListener('DOMContentLoaded', loadThemeFromLocalStorage);


function saveChanges() {
    var newUsername = document.getElementById("username").innerText.trim();
    var newAvatar = document.getElementById("avatar-upload").files[0];  
    var formData = new FormData();
    formData.append('username', newUsername);
    formData.append('avatar', newAvatar); 
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_profile.php", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("Profile saved successfully.");
      }
    };
    xhr.send(formData); 
  }
  
  if (localStorage.getItem("username")) {
    document.getElementById("username").innerText = localStorage.getItem("username");
  }

  var isMaxLimitReached = false;

  document.getElementById("username").addEventListener("input", function(event) {
      var username = this.innerText.trim();
      if (isMaxLimitReached) {
      
          event.preventDefault();
          return;
      }
      if (username.length >= 18) {
         
          isMaxLimitReached = true;
         
          this.innerText = username.slice(0, 18);
         
          this.blur();
      } else {
          localStorage.setItem("username", username);
      }
  });
  
  document.getElementById("username").addEventListener("blur", function() {
      isMaxLimitReached = false;
  });
  
  
  document.getElementById("avatar-upload").addEventListener("change", function() {
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var imgSrc = event.target.result; 
        document.getElementById("avatar").src = imgSrc;
        localStorage.setItem("avatar", imgSrc); 
    };

    reader.readAsDataURL(file);
});


function setAvatar() {
    var avatarSrc = localStorage.getItem("avatar");
    if (avatarSrc) {
        document.getElementById("avatar").src = avatarSrc;
    }
}

window.addEventListener("load", setAvatar);

document.getElementById("avatar-upload").addEventListener("change", function() {
    var file = this.files[0]; 
    var reader = new FileReader();

    reader.onload = function(event) {
        var imgSrc = event.target.result; 
        document.getElementById("avatar").src = imgSrc; 
        localStorage.setItem("avatar", imgSrc);
    };

    reader.readAsDataURL(file);
});
