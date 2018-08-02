/**
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
//const faceRecognition = require('./runFaceRecognition.js');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/**
 * This Function updates the `/lastmodified` with the timestamp of the last write to `/chat/$message`.
 */
//exports.touch = functions.database.ref('/chat/{message}').onWrite(
 //   (change, context) => admin.database().ref('/change').set(context.timestamp));
exports.runFRecognition = functions.database.ref('/chat/{message}').onWrite((snapshot, context) => {run();});
   
   
 function runFaceRecognition() {
     
        const imgBuf1 ='https://media.boingboing.net/wp-content/uploads/2016/11/trump.jpg'

 		const imgBuf2 ='https://biznology.com/wp-content/uploads/2017/02/88160170_trump-promo.jpg'
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

        //const bestMatch = getBestMatch(trainDescriptorsByClass, descriptor)
        const prediction=bestMatch.distance;
		console.log(prediction);
       
		return context.timestamp
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
	
	
	function euclideanDistance(arr1, arr2) {
      if (arr1.length !== arr2.length)
          throw new Error('euclideanDistance: arr1.length !== arr2.length');
      var desc1 = Array.from(arr1);
      var desc2 = Array.from(arr2);
      return Math.sqrt(desc1
          .map(function (val, i) { return val - desc2[i]; })
          .reduce(function (res, diff) { return res + Math.pow(diff, 2); }, 0));
  }
  
  
  function getBestMatch(descriptorsByClass, queryDescriptor) {
  function computeMeanDistance(descriptorsOfClass) {
    return faceapi.round(
      descriptorsOfClass
        .map(d => faceapi.euclideanDistance(d, queryDescriptor))
        .reduce((d1, d2) => d1 + d2, 0)
          / (descriptorsOfClass.length || 1)
      )
  }
  return descriptorsByClass
    .map(
      ({ descriptors, className }) => ({
        distance: computeMeanDistance(descriptors),
        className
      })
    )
    .reduce((best, curr) => best.distance < curr.distance ? best : curr)
}
function createFaceRecognitionNet(weights) {
      var net = new FaceRecognitionNet();
      net.extractWeights(weights);
      return net;
  }
  function faceRecognitionNet(weights) {
      console.warn('faceRecognitionNet(weights: Float32Array) will be deprecated in future, use createFaceRecognitionNet instead');
      return createFaceRecognitionNet(weights);
  }


  
