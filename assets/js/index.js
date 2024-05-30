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

  document.addEventListener('DOMContentLoaded', function() {
    let aboutBlankCloakingEnabled = localStorage.getItem('aboutBlankCloakingEnabled') === 'true';
    const toggleSwitch = document.getElementById("aboutBlankToggle");
    toggleSwitch.checked = aboutBlankCloakingEnabled;
    toggleSwitch.addEventListener("change", function() {
        localStorage.setItem('aboutBlankCloakingEnabled', this.checked);
        if (this.checked) {
            openUrlInNewTab();
        }
    });

    // Redirect to about:blank if the user is on index.html and the cloaking is enabled
    if (aboutBlankCloakingEnabled && window.location.pathname.endsWith("/index.html")) {
        window.location.href = "about:blank";
    }
});

function openUrlInNewTab() {
    var currentUrl = window.location.href;
    if (currentUrl === "/" || currentUrl.endsWith("/index.html")) {
        window.location.href = "about:blank";
    } else if (currentUrl === "about:blank") {
        return;
    } else {
        var win = window.open();
        win.document.body.style.margin = '0';
        window.location.href = 'https://google.com';
        win.document.body.style.height = '100vh';
        var iframe = win.document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.src = currentUrl;
        win.document.body.appendChild(iframe);
    }
}






function resetAllAndSetThemeDefault() {
  resetCookies();

  localStorage.setItem("theme", "main");
  applyTheme("main");
}

function resetCookiesAndStylesAndXP() {
  localStorage.removeItem("username");
  localStorage.removeItem("avatar");
  localStorage.removeItem("xp");
  localStorage.removeItem("level");
  localStorage.removeItem("selectedTheme");
  window.location.reload();

  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"; 
  }

  document.getElementById("gameLoaderSection").style.display = "none";
  document.getElementById("undoExpandBtn").style.display = "none";
  document.body.classList.remove("no-scroll");

  document.getElementById("username").innerText = "User";
  document.getElementById("avatar").src = "assets/img/icons/user.png";
}

document.getElementById("resetCookiesBtn").addEventListener("click", function() {
  // Display confirmation dialog
  var confirmReset = confirm("Are you sure you want to reset your data? (all your progress will be lost)");
  
  // Check user's choice
  if (confirmReset) {
      // If user clicks "OK" in the confirmation dialog
      resetCookiesAndStylesAndXP(); // Call the function to reset data
  } else {
      // If user clicks "Cancel" in the confirmation dialog
      console.log("Reset data canceled."); // Optionally, you can provide feedback
  }
});