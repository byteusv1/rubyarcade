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
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    applySettings();
    displayPanicKey();
    updateAboutBlankButton();
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
        const favicon = document.getElementById('dynamic-favicon');
        favicon.href = faviconURL;
    }
}

function loadSettings() {
    const savedTitle = localStorage.getItem('cloakedTitle');
    const savedFavicon = localStorage.getItem('cloakedFavicon');

    if (savedTitle) {
        document.getElementById('title').value = savedTitle;
    }

    if (savedFavicon) {
        document.getElementById('favicon').value = savedFavicon;
    }
}

function setPanicKey() {
    let panicKey = localStorage.getItem('panicKey');
    if (!panicKey) {
        panicKey = '['; // Set default panic key to '['
        localStorage.setItem('panicKey', panicKey);
    } else {
        panicKey = prompt("Enter the panic key (e.g., '['):").toLowerCase();
        if (!panicKey || panicKey.length !== 1) {
            alert("Please enter a single character as the panic key.");
            return;
        }
        localStorage.setItem('panicKey', panicKey);
    }
    displayPanicKey();
}

function displayPanicKey() {
    const panicKey = localStorage.getItem('panicKey');
    if (panicKey) {
        document.getElementById('current-panic-key').innerText = `Current Panic Key: ${panicKey}`;
    } else {
        document.getElementById('current-panic-key').innerText = "No Panic Key Set";
    }
}

document.addEventListener('keydown', (event) => {
    panic(event);
});

function panic(event) {
    const panicURL = 'https://www.classroom.google.com/';
    const panicKey = localStorage.getItem('panicKey');
    const keyPressed = event.key.toLowerCase(); // Get the pressed key and convert to lowercase

    // Check if the pressed key matches the panic key
    if (keyPressed === panicKey) {
        window.location.href = panicURL;
    }
}

let aboutBlankCloakingEnabled = localStorage.getItem('aboutBlankCloakingEnabled') === 'true';

function openUrlInNewTab() {
    var currentUrl = window.location.href;
    if (currentUrl === "http://yourdomain.com/") {
        window.location.href = "about:blank";
    } else if (currentUrl === "about:blank") {
        // Do nothing
        return;
    } else {
        var win = window.open();
        win.document.body.style.margin = '0';
        win.document.body.style.height = '100vh';
        var iframe = win.document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.src = currentUrl;
        win.document.body.appendChild(iframe);
        document.querySelector('button').style.background = 'grey';
        document.querySelector('button').innerHTML = "Already Open";
    }
}

function toggleAboutBlankCloaking() {
    aboutBlankCloakingEnabled = !aboutBlankCloakingEnabled;
    localStorage.setItem('aboutBlankCloakingEnabled', aboutBlankCloakingEnabled);
    updateAboutBlankButton();
}

function updateAboutBlankButton() {
    const aboutBlankButton = document.getElementById('about-blank-button');
    aboutBlankButton.innerText = aboutBlankCloakingEnabled ? 'Disable Cloaking' : 'Enable Cloaking';
}

// Restore the toggle state when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateAboutBlankButton();
});
