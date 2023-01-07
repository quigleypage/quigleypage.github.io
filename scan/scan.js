window.addEventListener('load', function () {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader()

    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceSelect = document.getElementById('sourceSelect')
        selectedDeviceId = videoInputDevices[0].deviceId
        if (videoInputDevices.length >= 1) {
          videoInputDevices.forEach((element) => {
            const sourceOption = document.createElement('option')
            sourceOption.text = element.label
            sourceOption.value = element.deviceId
            sourceSelect.appendChild(sourceOption)
          })

          sourceSelect.onchange = () => {
            selectedDeviceId = sourceSelect.value;
          };

          const sourceSelectPanel = document.getElementById('sourceSelectPanel')
          sourceSelectPanel.style.display = 'block'
        }

        document.getElementById('startButton').addEventListener('click', () => {
          codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
            if (result) {
              console.log(result)
              document.getElementById('result').textContent = result.text
              document.getElementById('targetLink').innerHTML = "<a href='https://www.target.com/s?searchTerm=" + result.text + "' target='_blank'>Target</a>";
              document.getElementById('googleLink').innerHTML = "<a href='https://www.google.com/search?q=" + result.text + "&tbm=shop' target='_blank'>Google</a>";
              document.getElementById('walmartLink').innerHTML = "<a href='https://www.walmart.com/search?q=" + result.text + "' target='_blank'>Walmart</a>";
              document.getElementById('amazonLink').innerHTML = "<a href='https://www.amazon.com/s?k=" + result.text + "' target='_blank'>Amazon</a>";
              /*document.getElementById('hobbyLink').innerHTML = "<a href='https://www.hobbylobby.com/search/?text=" + result.text + "' target='_blank'>Hobby Lobby</a>";
              document.getElementById('michaelsLink').innerHTML = "<a href='https://www.michaels.com/search?q=" + result.text + "' target='_blank'>Michaels</a>";
              document.getElementById('costcoLink').innerHTML = "<a href='https://www.costco.com/CatalogSearch?dept=All&keyword=" + result.text + "' target='_blank'>Costco</a>";
              document.getElementById('bedLink').innerHTML = "<a href='https://www.bedbathandbeyond.com/store/s/" + result.text + "/' target='_blank'>Bed Bath & Beyond</a>";*/
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
              console.error(err)
              document.getElementById('result').textContent = err
            }
          })
          console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
        })

        document.getElementById('resetButton').addEventListener('click', () => {
          codeReader.reset()
          document.getElementById('result').textContent = '';
          console.log('Reset.')
        })

      })
      .catch((err) => {
        console.error(err)
      })
  })