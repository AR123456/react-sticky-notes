import React from "react";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(",");
  // console.log(tags);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* dyi card  */}
      <img src={image.webformatURL} alt="random" className="w-full" />
      <div className="px-6 py4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views: </strong> {image.views}
          </li>
          <li>
            <strong>Downloads:</strong> {image.downloads}
          </li>
          <li>
            <strong>Likes:</strong> {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
