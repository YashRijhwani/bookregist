import "../App.css";
import {
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Booklist from "../components/Booklist";
import HomeBook from "../components/HomeBook";
import Bookshelf from "../components/Bookshelf";
import { useSelector, useDispatch } from "react-redux";
import {
  bopen,
  lopen,
  sopen,
  setcurrentbook,
  saveimage,
  savedescription,
  nbopen,
  setcurrentshelf,
} from "../actions";
import { Empty } from "antd";
import useApi from "../hooks/useApi";
import useDB from "../hooks/useDB";
import info_icon from "../assets/images/info_icon.svg";

export default function Home() {
  const dispatch = useDispatch();
  const logIn = useSelector((state) => state.logIn);
  const images = useSelector((state) => state.booksInfo);
  const homebook = useSelector((state) => state.homeBook);
  const userdata = useSelector((state) => state.userData);
  const [homebookImage, sethomebookImage] = useState(null);
  const [loading, setloading] = useState(false);
  const { getDetail } = useApi();
  const { setHomebookDB, removeHomebookDB } = useDB();

  const showBookInfo = (e) => {
    dispatch(setcurrentbook(homebook));
    dispatch(bopen());
  };

  const showNotes = (e) => {
    dispatch(setcurrentshelf({ shelf: {}, pos: -1 }));
    dispatch(setcurrentbook(homebook));
    dispatch(nbopen());
  };

  useEffect(() => {
    setloading(true);
    async function fetchData() {
      let bookdata = images.find((n) => n.id === homebook.id);
      if (bookdata && bookdata.image) {
        sethomebookImage(bookdata.image);
      } else {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/getDetail/${book.id}`
          );
          const data = response.data;
          if (!data.volumeInfo) {
            dispatch(
              saveimage({
                id: homebook.id,
                image: homebook.volumeInfo?.imageLinks?.thumbnail,
              })
            );
            if (homebookImage == homebook.volumeInfo?.imageLinks?.thumbnail)
              setloading(false);
            sethomebookImage(homebook.volumeInfo?.imageLinks?.thumbnail);
            dispatch(
              savedescription({
                id: homebook.id,
                description: homebook.volumeInfo?.description,
              })
            );
          } else {
            let image = data.volumeInfo.imageLinks.small
              ? data.volumeInfo.imageLinks.small
              : data.volumeInfo.imageLinks.thumbnail;
            dispatch(saveimage({ id: homebook.id, image }));
            if (homebookImage == image) {
              setloading(false);
            } else {
              sethomebookImage(image);
            }
            dispatch(
              savedescription({
                id: homebook.id,
                description: data.volumeInfo.description
                  ? data.volumeInfo.description
                  : "",
              })
            );
          }
        } catch (error) {
          console.error("Error fetching book detail:", error);
        }
      }
      setHomebookDB({ email: userdata.email, id: homebook.id });
    }

    if (userdata.email) {
      if (homebook.id) {
        fetchData();
      } else {
        removeHomebookDB(userdata.email);
        setloading(false);
      }
    } else if (homebook.volumeInfo?.imageLinks) {
      let image = homebook.volumeInfo.imageLinks.small
        ? homebook.volumeInfo.imageLinks.small
        : homebook.volumeInfo.imageLinks.thumbnail;
      dispatch(saveimage({ id: homebook.id, image }));
      sethomebookImage(image);
      dispatch(
        savedescription({
          id: homebook.id,
          description: homebook.volumeInfo.description
            ? homebook.volumeInfo.description
            : "",
        })
      );
    } else {
      setloading(false);
    }
  }, [homebook]);

  useEffect(() => {
    if (loading) {
      setloading(false);
    }
  }, [homebookImage]);

  return logIn ? (
    <div className="page">
      <div className="home-main">
        <Card
          style={{
            height: "464px",
            width: "300px",
            textAlign: "center",
            flexGrow: 0,
            flexShrink: 0,
          }}
        >
          {!homebook.id ? (
            <>
              <p
                style={{ paddingTop: "210px", color: "grey", fontSize: "17px" }}
              >
                what are you currently reading?
              </p>
              <p style={{ color: "grey", fontSize: "13px" }}>
                Go Find a book to read.
              </p>
            </>
          ) : (
            <div>
              {!loading ? (
                <>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Show info</Tooltip>}
                  >
                    <img
                      onClick={showBookInfo}
                      className="readicon"
                      src={info_icon}
                      style={{
                        position: "absolute",
                        height: "40px",
                        width: "40px",
                        left: "260px",
                        top: "80px",
                        zIndex: 3,
                      }}
                    />
                  </OverlayTrigger>
                  <img
                    src={homebookImage}
                    className="hover"
                    onClick={homebook.id ? showNotes : () => {}}
                    style={{ height: "464px", width: "300px" }}
                  />
                </>
              ) : (
                <Spinner
                  animation="border"
                  style={{ left: "50%", marginTop: "70%" }}
                />
              )}
            </div>
          )}
        </Card>
        <div className="home-play">
          {homebook.id ? (
            <HomeBook book={homebook} />
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Currently not reading any book. Click on the left to add a book"
                style={{
                  paddingTop: "160px",
                  paddingLeft: "175px",
                  paddingRight: "175px",
                }}
              />
              <div>
                <div style={{ height: "50px" }}></div>
                <Bookshelf />
              </div>
            </div>
          )}
        </div>
      </div>
      <Booklist pos={0} title="Reading Now" info={true} />
      <Booklist pos={1} title="To Read" info={true} />
      <Booklist pos={2} title="Recommended for you " info={false} />
      <div style={{ height: "50px" }}></div>
    </div>
  ) : (
    <div className="notlogin">
      <p
        style={{
          textAlign: "center",
          color: "#37474F",
          height: "40px",
          fontSize: "20px",
        }}
      >
        Log in with your Google account, to explore your personal book tracker!
      </p>
      <Button
        style={{ color: "rgb(44, 156, 231)" }}
        onClick={() => dispatch(lopen())}
      >
        Log In
      </Button>
      <p style={{ color: "grey" }}>
        Doesn't have an account?
        <Button
          style={{ marginLeft: "5px", color: "rgb(44, 156, 231)" }}
          onClick={() => dispatch(sopen())}
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
};


