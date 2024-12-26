// Function to toggle between Light and Dark mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
  const modeButton = document.querySelector(".mode-toggle");

  // Toggle the emoji between Sun and Moon
  if (document.body.classList.contains("dark-mode")) {
      modeButton.textContent = "🌞"; // Sun emoji for light mode
  } else {
      modeButton.textContent = "🌙"; // Moon emoji for dark mode
  }

  // Update the text color and backgrounds based on mode
  updateTextColor();
}

// Function to generate QR code based on input text
function generateQRCode() {
  const qrText = document.getElementById("qr-text").value;
  const qrCodeContainer = document.getElementById("qr-code-container");
  const downloadLink = document.getElementById("download-link");
  const downloadButton = document.getElementById("download-button");

  if (qrText.trim() === "") {
      qrCodeContainer.innerHTML = "Please enter URL to generate QR code";
      downloadLink.style.display = "none"; // Hide download button if QR code isn't generated
      return;
  }

  QRCode.toDataURL(qrText, { errorCorrectionLevel: 'H' }, function (err, url) {
      if (err) {
          qrCodeContainer.innerHTML = "Failed to generate QR code.";
          downloadLink.style.display = "none";
      } else {
          qrCodeContainer.innerHTML = `<img src="${url}" alt="QR Code">`;
          downloadLink.style.display = "block"; // Show download button when QR code is generated
          downloadButton.onclick = function () {
              const a = document.createElement('a');
              a.href = url;
              a.download = 'qr-code.png'; // Name for downloaded file
              a.click();
          };
      }
  });
}

// Function to update text color and background for dark/light modes
function updateTextColor() {
  const allTextElements = document.querySelectorAll("h1, p, input[type='text'], button, .mode-toggle");

  if (document.body.classList.contains("dark-mode")) {
      // Dark Mode
      allTextElements.forEach(element => {
          element.style.color = "#fff"; // White text for dark mode
      });
  } else {
      // Light Mode
      allTextElements.forEach(element => {
          element.style.color = "#333"; // Dark text for light mode
      });
  }
}

// Call the function once to set the correct text color on page load
updateTextColor();
