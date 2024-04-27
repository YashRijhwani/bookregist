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
      className={`text-center sm:flex sm:justify-center sm:items-center my-14 md:mx-40 mx-4`}
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
    >
      <div className={`p-5`}>
        <div className={`mb-4`}>
          <h4 className={`text-gray-800`}>{title}</h4>
          <span className={`mt-2`}>Written By: </span>
          <small className={`inline mt-2 font-bold text-md md:text-lg`}>
            {" "}
            {author}
          </small>
        </div>

        <div className={`flex flex-col justify-between gap-8 md:flex-row`}>
          <div className={`w-full md:w-2/4 text-center flex justify-center`}>
            <img src={image} alt={title} className={`max-w-full`} />
          </div>

          <div
            className={`w-full md:w-2/4 p-5 overflow-y-auto text-center`}
            style={{ maxHeight: "300px" }}
          >
            <p className={`font-bold`}>Description: </p>
            <p className={`text-center `}>{description}</p>
          </div>
        </div>
        <div className={`flex justify-between my-4 p-5`}>
          <Button href={link} className={``}>
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
      </div>
    </div>
  );
}

export default ResultCard;
