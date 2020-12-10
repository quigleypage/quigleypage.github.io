feather.replace();

const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;
let whichCamera = "environment";

const [play, pause, screenshot] = buttons;
//const [play, pause, screenshot, switchCamera] = buttons;

const constraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },    
    facingMode: { 
      exact: whichCamera,
    },
  }
};

const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
};

play.onclick = () => {
  if (streamStarted) {
    video.play();
    play.classList.add('d-none');
    pause.classList.remove('d-none');
    return;
  }
  if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
    const updatedConstraints = {
      ...constraints,
      deviceId: {
        exact: cameraOptions.value
      }
    };
    startStream(updatedConstraints);
  }
};

const startStream = async (constraints) => {
  document.getElementById("cameraDeviceSelectDropdown").style.display = "none";
  
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

const handleStream = (stream) => {
  video.srcObject = stream;
  play.classList.add('d-none');
  pause.classList.remove('d-none');
  screenshot.classList.remove('d-none');
  //switchCamera.classList.remove('d-none');
  streamStarted = true;
};

getCameraSelection();

cameraOptions.onchange = () => {
  
  if(whichCamera == "environment"){
    whichCamera = "user";
  }
  else{
    whichCamera = "environment";
  }

  const updatedConstraints = {
    ...constraints,
    deviceId: {
      exact: cameraOptions.value
    },
    facingMode: {
      exact: whichCamera,
    },
  };
  startStream(updatedConstraints);
};

const pauseStream = () => {
  video.pause();
  play.classList.remove('d-none');
  pause.classList.add('d-none');
};

/*const switchCam = () => {
  if(whichCamera == "rear"){
    constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },    
        facingMode: { 
          ideal: "user",
        },
      }
    };
    whichCamera = "selfie";
  }
  else{
    constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440
        },    
        facingMode: { 
          ideal: "environment",
        },
      }
    };
    whichCamera = "rear";
  }
};*/

const doScreenshot = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  screenshotImage.src = canvas.toDataURL('image/webp');
  screenshotImage.classList.remove('d-none');
  classifyScreenshot();
};

function classifyScreenshot(){
    const img = document.getElementById('img');

    // Load the model.
    mobilenet.load().then(model => {
        // Classify the image.
        model.classify(img).then(predictions => {
        console.log('Predictions: ');
        console.log(predictions);
        //document.getElementById("Predictions").innerHTML = '<h1>Classifications</h1><p>1: ' + predictions[0].className + '</p><p>2: ' + predictions[1].className + '</p><p>3: ' + predictions[2].className + '</p>';
        document.getElementById("Classif1").innerHTML = "<a href='https://www.google.com/search?q=" +  predictions[0].className + "'>" + predictions[0].className + "</a>";
        document.getElementById("Classif2").innerHTML = predictions[1].className;
        document.getElementById("Classif3").innerHTML = predictions[2].className;
        document.getElementById("classifTable").style.visibility = "visible";
        });
    });
}

pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;
//switchCamera.onclick = switchCam;