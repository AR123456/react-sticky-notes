import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    //
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
    )
      // returns promise
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    // add term as a dependancy so when it chagnes will reun tetch again
  }, [term]);
  return (
    <div className="containter mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)}></ImageSearch>
      {!isLoading && images.length === 0 && (
        <div className="text-5xl text-center mx-auto mt-32">
          No images found...
        </div>
      )}
      {isLoading ? (
        <div className="text-6xl text-center mx-auto mt-32">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image}></ImageCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
