import React from "react";
import Button from "../Button";

function ResultCard({
  title,
  link,
  id,
  author,
  image,
  description,
  saveBook,
  deleteBook,
}) {
  return (
    <div
      className={`text-center sm:flex sm:justify-center sm:items-center my-10 container`}
    >
      <div className={`sm:w-3/4 lg:w-2/3`}>
        <div className={`mb-4`}>
          <h4 className={`text-gray-800`}>{title}</h4>
          <span className={`mt-2`}>Written By: </span>
          <small className={`inline mt-2 font-bold text-md md:text-lg`}>
            {" "}
            {author}
          </small>
        </div>

        <div className={`flex flex-col justify-between gap-20 md:flex-row`}>
          <div className={`w-full md:w-2/4 text-center flex justify-center`}>
            <img src={image} alt={title} className={`max-w-full`} />
          </div>

          <div className={`w-full md:w-2/4 p-5 overflow-y-auto text-center`} style={{ maxHeight: "300px" }}>
            <p className={`font-bold`}>Description: </p>
            <p className={`text-center `}>{description}</p>
          </div>
        </div>
        <div className={`flex justify-between my-4 p-5`}>
          <Button href={link} className={`mr-2`}>
            View
          </Button>
          {!saveBook ? (
            <Button id={id} onClick={(event) => deleteBook(event)}>
              Delete
            </Button>
          ) : (
            <Button id={id} onClick={(event) => saveBook(event)}>
              Save
            </Button>
          )}
        </div>
        <hr className={`mb-4 font-bold text-black`} />
      </div>
    </div>
  );
}

export default ResultCard;
