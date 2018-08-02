 
let trainDescriptorsByClass = []

 function runFaceRecognition() {
     
       
// const imgBuf = new Promise(fetchImage(getFaceImageUri(classes[currClassIdx], currImageIdx))
 		const imgBuf1 = https://media.boingboing.net/wp-content/uploads/2016/11/trump.jpg

 		const imgBuf2 = https://biznology.com/wp-content/uploads/2017/02/88160170_trump-promo.jpg
		//const input = Promise.all(faceapi.bufferToImage(imgBuf))
        //const imgEl = $('#face').get(0)
        //imgEl.src = input.src

        //const ts = Date.now()
        //const descriptor = Promise.all(faceapi.computeFaceDescriptor(input))
        //displayTimeStats(Date.now() - ts)
        const descriptor1 = Promise.all(faceapi.computeFaceDescriptor(imgBuf1))
		const descriptor2 = Promise.all(faceapi.computeFaceDescriptor(imgBuf2))

	
        //const bestMatch = getBestMatch(trainDescriptorsByClass, descriptor)
        const bestMatch = getBestMatch(descriptor1,descriptor2)

		const prediction=bestMatch.distance;

        currImageIdx = currClassIdx === (classes.length - 1)
          ? currImageIdx + 1
          : currImageIdx
        currClassIdx = (currClassIdx + 1) % classes.length

        currImageIdx = (currImageIdx % 6) || 2
        //to = setTimeout(next, interval)
		console.log(prediction):
    }
    
	 function run() {
      try {
        //setStatusText('loading model file...')

        const loadModel = Promise.all(faceapi.loadFaceRecognitionModel('/'))

        //setStatusText('computing initial descriptors...')

        trainDescriptorsByClass = Promise.all(initTrainDescriptorsByClass(faceapi.recognitionNet))
        //$('#loader').hide()
		runFaceRecognition()
      } catch (err) {
        console.error(err)
      }
    }
	
