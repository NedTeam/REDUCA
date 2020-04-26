import React from "react";
import logoEduco from "./logo-educo.png";
import firebase from "firebase";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";

const rooms = {
  physics: { title: "Particle Physics", description: "Physics" },
  deeplearning: { title: "Deep Learning", description: "Depp learning" },
  math: { title: "Math 101", description: "Math 101" },
  biochemistry: { title: "Biochemistry", description: "Biochemistry" },
  software: {
    title: "Software Engineering",
    description: "Software Engineering"
  },
  economics: { title: "Economics 101", description: "Economics 101" }
};

const images = [
  "https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/5775/calculator-scientific.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4149035/pexels-photo-4149035.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/3671146/pexels-photo-3671146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];

const getName = email => email && email.split("@")[0];

export default ({ user, setUser, logout }) => {
  return (
    <div className="">
      <div
        className="mainGrid3"
        style={{ backgroundColor: "white", backgroundSize: "cover" }}
      >
        <div
          className="topGrid3"
          style={{ backgroundColor: "rgba(0,192,192,0.8)" }}
        >
          <div style={{ padding: "0.5em" }}>
            <div
              style={{
                paddingBottom: "2vh",
                padding: "1em",
                borderRadius: "1em"
              }}
            >
              <img src={logoEduco} height="50px" alt="Logo" />
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "1em" }}>
          <img
            className="avatarIcon"
            src={
              "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
            }
            style={{ height: "20vh" }}
          />
          <div style={{ textAlign: "center", padding: "1em 1em 0 1em" }}>
            <h2>Hi, {getName(user)}!</h2>
          </div>
          <button class="mainButton">My Profile</button>
          <button
            class="mainButton"
            onClick={logout}
            style={{
              backgroundColor: "rgb(239, 239, 239)",
              marginLeft: "10px"
            }}
          >
            Log out
          </button>
        </div>
        <div style={{ backgroundColor: "white" }}>
          <div className="flexCenter" style={{ paddingTop: "2vh" }}>
            <div
              className="flexMain"
              style={{
                height: "5vh",
                width: "95%"
              }}
            >
              <h1
                style={{
                  marginTop: "auto",
                  marginBottom: "auto"
                }}
              >
                My Courses
              </h1>
              <button class="mainButton">Add more courses</button>
            </div>
          </div>
          <div className="homeGrid3">
            {Object.entries(rooms).map(([k, { title, description }], i) => (
              <div style={{ padding: "2em" }} key={i}>
                <Link
                  to={`/home/room/${k}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    className="boxShadow"
                    style={{
                      height: "20em",
                      textAlign: "left",
                      backgroundColor: "#EFEFEF",
                      borderRadius: "1em"
                    }}
                  >
                    <img className="projectImage" src={images[i]} />
                    <p
                      style={{
                        paddingLeft: "1em",
                        lineHeight: "50%",
                        fontSize: "1.2em"
                      }}
                    >
                      <b>{title}</b>
                    </p>
                    <p
                      style={{
                        paddingLeft: "1.5em",
                        lineHeight: "80%",
                        color: "#181818"
                      }}
                    >
                      {description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              padding: "0.5em",
              backgroundColor: "#EFEFEF",
              width: "100%",
              height: "20vh"
            }}
          >
            <h4
              style={{
                textAlign: "center",
                marginBottom: "1em",
                marginTop: "1em"
              }}
            >
              Calendar
            </h4>
            <Calendar />
          </div>
          <div
            style={{
              padding: "0.5em",
              backgroundColor: "white",
              width: "100%",
              height: "60vh"
            }}
          >
            <h4
              style={{
                textAlign: "center",
                marginBottom: "1em",
                marginTop: "1em"
              }}
            >
              Announcements
            </h4>
            <div class="announcementCard">
              <p class="announcementDate">12/03/20</p>
              <p style={{ padding: "5px", fontSize: "16px" }}>
                Campus closed due to COVID 19. Lectures will continue remotely
                via E-DUCO platform.
              </p>
            </div>
            <div class="announcementCard">
              <p class="announcementDate">06/03/20</p>
              <p style={{ padding: "5px", fontSize: "16px" }}>
                Start of the spring semester.
              </p>
            </div>
            <div class="announcementCard">
              <p class="announcementDate">16/02/20</p>
              <p style={{ padding: "5px", fontSize: "16px" }}>
                New e-learning platform available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
