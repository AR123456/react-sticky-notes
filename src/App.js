import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import ml5 from "ml5";
import PieChart from "./PieChart";
import useInterval from "./useInterval";

let classifier;

function App() {
  const videoRef = useRef();
  const [pieData, setPieData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);
  // When the DOM elements have been rendered
  useEffect(() => {
    // telling ml5 to load the imageClassifier located in the public folder
    classifier = ml5.imageClassifier("./my-model/model.json", () => {
      // when the modle is ready this call back will be triggered
      // this accesses the web cam of the user
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          // connect the web cam with the video element defined in the return
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
  }, []);
  // source of this custom hook  https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  useInterval(() => {
    // every 1/2 seconds this use interval hook will try to clasify what
    //is in the video element and tell if image is there or not
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        // when this clasification is done getting a results array
        // ml5 is telling us how confident the machine is that image is there
        // and how confident the machine is that image is not there
        // the result array is sorted by confidence so that the
        //first element in the confidence array is the highest confidence
        /// this is not what we want so this sort done to sort by the label
        // so that they do not change based on the confidence
        results.sort((a, b) => b.label.localeCompare(a.label));
        // save with the setPieData function in useState and pass to PieChart in return
        setPieData(results.map((entry) => entry.confidence));
      });
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>
        Is Norwal there? <br />
        <small>
          [{pieData[0].toFixed(2)}, {pieData[1].toFixed(2)}]
        </small>
      </h1>
      <PieChart data={pieData} />
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "Stop classifying" : "Start classifying"}
      </button>
      <video
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width="300"
        height="150"
      />
    </React.Fragment>
  );
}

export default App;
