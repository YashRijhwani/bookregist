import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import useDB from "../hooks/useDB";
import { useSelector, useDispatch } from "react-redux";
import { lopen, sclose } from "../actions";
import { Result } from "antd"; // Importing Ant Design Result component

export default function SignInForm() {
  const dispatch = useDispatch();
  const signUpModal = useSelector((state) => state.signUpModal);
  const handleClose = () => {
    dispatch(sclose());
  };
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const { signupDB } = useDB();
  const [result, setResult] = useState({ state: "waiting", data: {} });

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        setName(res.profileObj.name);
        setResult({ state: "name", data: { email: res.profileObj.email } });
      } catch (error) {
        console.error("Error handling success:", error);
      }
    },
    onFailure: (res) => {
      try {
        setResult({ state: "waiting", data: { error: res.error } });
      } catch (error) {
        console.error("Error handling failure:", error);
      }
    },
    onRequest: () => {
      setResult({ state: "loading", data: {} });
    },
  });

  const logOut = () => {
    googleLogout();
    setResult({ state: "waiting", data: {} });
    setName("");
  };

  return (
    <div>
      <Modal show={signUpModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", padding: "20px" }}>
            Sign Up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {result.state === "waiting" ? (
            <div style={{ height: "150px", width: "260px" }}>
              <div style={{ height: "30px" }}></div>
              <div style={{ marginBottom: "50px" }}>
                <Button className="googlelogin" onClick={login} variant="dark">
                  Sign up with a Google account
                </Button>             
              </div>
            </div>
          ) : (
            <div
              style={{ height: "350px", width: "310px", overflowY: "hidden" }}
            >
              {isLoading ? (
                <div style={{ marginLeft: "120px", marginTop: "100px" }}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <>
                  {result.state === "fail" ? (
                    <Result
                      status={result.data.status !== 404 ? "error" : "info"}
                      title={result.data.error}
                      subTitle={
                        result.data.status === 404
                          ? "Try to log in with it."
                          : "Refresh the page or Try again later"
                      }
                      extra={[
                        <Button
                          key="login"
                          onClick={() => {
                            handleClose();
                            dispatch(lopen());
                          }}
                          variant="primary"
                        >
                          Log in
                        </Button>,
                      ]}
                    />
                  ) : result.state === "name" ? (
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          maxLength={30}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        disabled={name === ""}
                        onClick={async () => {
                          setLoad(true);
                          const { status, data } = await signupDB({
                            email: result.data.email,
                            name: name,
                          });
                          if (status === 200) {
                            setTimeout(() => {
                              handleClose();
                            }, 4000);
                            setLoad(false);
                            setResult({ state: "success", data: {} });
                          } else {
                            setResult({
                              state: "fail",
                              data: { status, error: data.data },
                            });
                          }
                        }}
                      >
                        {load ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                    </Form>
                  ) : (
                    <Result
                      status="success"
                      title="You have signed up an account."
                      subTitle="You can try to log in now."
                    />
                  )}
                </>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

