function onScanSuccess(qrMessage) {
	// handle the scanned code as you like
  console.log(`QR matched = ${qrMessage}`);
  document.getElementById("result").innerHTML += "<br><a href='" + qrMessage + "' target='_blank'>" + qrMessage + "</a>";
}

function onScanFailure(error) {
	// handle scan failure, usually better to ignore and keep scanning
	console.warn(`QR error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
	"reader", { fps: 10, qrbox: 250 }, /* verbose= */ true);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);