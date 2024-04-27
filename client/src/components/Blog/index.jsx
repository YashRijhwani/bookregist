import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Blog = () => {
  // Define an array of objects containing bookshelf image URLs and corresponding text
  const bookshelfImages = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1651313745674-eb83846a1d85?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Reading books becomes easier with Bookilyx",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1622010652810-eba11f92f90f?q=80&w=1424&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Explore a vast collection of books with Bookilyx",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Discover the joy of reading with Bookilyx",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Unlock new worlds through the pages of books",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1706061121923-e2aef3d28939?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Immerse yourself in the magic of storytelling",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1690322620864-9489655480dd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Let your imagination soar with Bookilyx",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1525715843408-5c6ec44503b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Escape reality and dive into a good book",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1607193634806-5c28805731aa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Experience the thrill of adventure with Bookilyx",
    },
    {
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1703701579010-abd8162f9989?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Find solace and inspiration in the pages of a book",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className={`md:my-10 md:p-10 shadow-xl`} id="blog-section">
      <div className={`text-center my-5`}>
        <h1
          className={`sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4`}
        >
          Our Blog
        </h1>
        <p
          className={`text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500`}
        >
          Blue bottle crucifix vinyl post-ironic four dollar toast vegan
          taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
          pug.
        </p>
      </div>
      <div className={`px-5 mx-auto`}>
        <Slider {...settings}>
          {bookshelfImages.map((item, index) => (
            <div
              key={index}
              className={`p-4 flex flex-col text-center items-center`}
            >
              <img
                className={`md:w-full md:h-96 w-full h-80 object-cover`}
                src={item.imageUrl}
                alt={`Bookshelf ${index + 1}`}
              />
              <div className={`my-4`}>
                <h1 className={`md:text-4xl text-red-500 font-bold capitalize`}>
                  {item.text}
                </h1>
                {/* <p className={`mt-2 text-gray-600`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum euismod, mi ac volutpat semper, ipsum magna
                  scelerisque justo.
                </p> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Blog;
