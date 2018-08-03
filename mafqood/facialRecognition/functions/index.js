/**a
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const faceapi = require('./face-api.js');

const commons = require('./commons.js');
//const faceRecognition = require('./runFaceRecognition.js');
let minConfidence = 0.7
    let result
const functions = require('firebase-functions');
const admin = require('firebase-admin');
 admin.initializeApp();

/**
 * This Function updates the `/lastmodified` with the timestamp of the last write to `/chat/$message`.
 */
//exports.touch = functions.database.ref('/chat/{message}').onWrite(
 //   (change, context) => admin.database().ref('/change').set(context.timestamp));
//exports.runFRecognition = functions.database.ref('/chat/{message}').onWrite((snapshot, context) => {run();});
   exports.runFRecognition684 = functions.database.ref('/chat/{message}').onWrite((change, context) =>  { 
   Promise.all(run()).then(matchObj => {
	   admin.database().ref('/change').set(matchObj);
   }).catch(err => admin.database().ref('/change').set("FALSE"));
   }) 


    function onIncreaseThreshold() {
      minConfidence = Math.min(faceapi.round(minConfidence + 0.1), 1.0)
     // $('#minConfidence').val(minConfidence)
      updateResults()
    }

    function onDecreaseThreshold() {
      minConfidence = Math.max(faceapi.round(minConfidence - 0.1), 0.1)
      //$('#minConfidence').val(minConfidence)
      updateResults()
    }

  function loadImageFromUrl(url) {
      const img =Promise.all(requestExternalImage($('#imgUrlInput').val()))
      //$('#inputImg').get(0).src = img.src
      updateResults()
    }

  
  /* function updateResults() {
      const inputImgEl = $('#inputImg').get(0)
      const { width, height } = inputImgEl
      const canvas = $('#overlay').get(0)
      canvas.width = width
      canvas.height = height

      result = Promise.all(faceapi.locateFaces(inputImgEl, minConfidence))
      faceapi.drawDetection('overlay', result.map(det => det.forSize(width, height)))
    }

     function onSelectionChanged(uri) {
      const imgBuf = Promise.all(fetchImage(uri))
      $(`#inputImg`).get(0).src = (Promise.all(faceapi.bufferToImage(imgBuf))).src
      updateResults()
    }
 */
 function run() {
		return new Promise(function(resolve, reject) {
			var promises = []
			promises.push(faceapi.computeFaceDescriptor('/images/obama1.jpg'))
			promises.push(faceapi.computeFaceDescriptor('/images/trump.jpg'))
			Promise.all(promises).then((descriptors)=> {
				var desc1 = descriptors[0]
				var desc2 = descriptors[1]
				const distance = faceapi.euclideanDistance(desc1, desc2)
				if (distance < 0.6){
					console.log('match')
				  resolve({
					  "match": true,
					  "distance": distance
					  })
				  
				}
				else{
				console.log('no match')
				  resolve({
					  "match": false,
					  "distance": distance
					  })
				  
				}
			}).catch( err => {
				console.error(err)
				reject(err)
			}
			);
			
		})
 }
 
 
/* 
    $(document).ready(function() {
      renderNavBar('#navbar', 'face_detection')
      renderImageSelectList(
        '#selectList',
        async (uri) => {
          await onSelectionChanged(uri)
        },
        'bbt1.jpg'
      )
      run()
    }) */