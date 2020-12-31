const frame = document.getElementById("frame");
const form = document.getElementById("form");
const body = document.getElementsByTagName("body")[0];
const html = document.getElementsByTagName("html")[0];
const svg = document.getElementById("svg");
const svgPaths = document.querySelectorAll("#svg path");
const containers = document.getElementsByClassName("container");
const sidebar = document.getElementsByClassName("sidebar");
const skills = document.getElementsByClassName("sub-main");
const projects = document.getElementsByClassName("main");

//functions to manipulate the page flow
function cancelFloating() {
  for (let i = 0; i < frame.children.length; i++) {
    frame.children[i].style.float = "none";
  }
}
function setFloating() {
  for (let i = 0; i < frame.children.length; i++) {
    if (frame.children[i].classList.contains("sidebar")) {
      frame.children[i].style.float = "left";
    } else {
      frame.children[i].style.float = "right";
    }
  }
}

//mobile view
if (screen.width < 900) {
  cancelFloating();
}

//track browser width
window.addEventListener("resize", function () {
  if (screen.width < 900) {
    cancelFloating();
  }
  if (screen.width > 900) {
    setFloating();
  }
});

//svg
if (screen.width < 900) {
  //scale down svg in mobile
  svg.setAttribute("viewBox", "0 0 2646 213");
  svg.style.transform = "translate(-16.7%, -16.7%)";
}
var animDelay = 0;
for (let i = 0; i < svgPaths.length; i++) {
  //animate svg strokes
  svgPaths[i].setAttribute("stroke", "#828282");
  svgPaths[i].setAttribute("stroke-width", "5");
  svgPaths[i].style.strokeDasharray = svgPaths[i].getTotalLength();
  svgPaths[i].style.strokeDashoffset = svgPaths[i].getTotalLength();
  svgPaths[i].style.animation = `svg-line 2s ease forwards ${animDelay}s`;
  animDelay += 0.1;
}
animDelay += 2;
svg.style.animation = `svg-out 1s ease forwards ${animDelay}s`;
animDelay += 1;

//stop scroll bar from affecting position of elements
html.style.overflowY = "scroll";
//stop the browser from scrolling because of transition
body.style.maxHeight = "100vh";
html.style.maxHeight = "100vh";
body.style.overflow = "hidden";
html.style.overflow = "hidden";

//page animation on desktop
if (screen.width > 900) {
  //animation
  for (let i = 0; i < sidebar.length; i++) {
    sidebar[i].style.opacity = "0";
    sidebar[i].style.transform = "translateY(200px)";
    sidebar[
      i
    ].style.animation = `sidebar-anim 0.3s ease forwards ${animDelay}s`;
    animDelay += 0.1;
  }
  for (let i = 0; i < skills.length; i++) {
    skills[i].style.opacity = "0";
    skills[i].style.transform = "translateX(200px)";
    skills[
      skills.length - i + -1
    ].style.animation = `sidebar-anim 0.3s ease forwards ${animDelay}s`;
    animDelay += 0.1;
  }

  for (let i = 0; i < projects.length; i++) {
    projects[i].style.opacity = "0";
    projects[i].style.transform = "translateY(200px)";
    projects[
      i
    ].style.animation = `sidebar-anim 0.3s ease forwards ${animDelay}s`;
    animDelay += 0.1;
  }

  setTimeout(() => {
    body.style.maxHeight = "unset";
    html.style.maxHeight = "unset";
    body.style.overflow = "unset";
    html.style.overflow = "unset";
  }, animDelay * 1000);

  setTimeout(() => {
    animateSkillBars();
  }, animDelay * 1000);
}

//page animation on desktop
if (screen.width <= 900) {
  for (let i = 0; i < containers.length; i++) {
    containers[i].classList.add("hiddenCont");
  }
  //wait for svg to load
  setTimeout(() => {
    body.style.maxHeight = "unset";
    html.style.maxHeight = "unset";
    body.style.overflow = "unset";
    html.style.overflow = "unset";
    containers[0].classList.remove("hiddenCont");
  }, animDelay * 1000);

  window.addEventListener("scroll", function () {
    animateSkillBars();

    for (let i = 0; i < containers.length; i++) {
      let prevElem = containers[i - 1] ? containers[i - 1].offsetTop : -1;
      if (body.scrollTop > prevElem) {
        containers[i].classList.remove("hiddenCont");
      }
    }
  });
}

const node = document.getElementById("node");
const express = document.getElementById("express");
const react = document.getElementById("react");
const ajax = document.getElementById("ajax");
const python = document.getElementById("python");
const js = document.getElementById("js");
const htmlskill = document.getElementById("html");
const css = document.getElementById("css");

function animateSkillBars() {
  node.style.width = "80%";
  express.style.width = "80%";
  react.style.width = "80%";
  ajax.style.width = "80%";

  python.style.width = "90%";
  js.style.width = "90%";
  htmlskill.style.width = "90%";
  css.style.width = "90%";
}
//contact me form api call to google sheets
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.name.value || !form.email.value || !form.message.value) {
    window.alert("Please fill all fields to send a message");
  } else {
    let url = `https://script.google.com/macros/s/AKfycbyLtkdKFqtsbBGCQMv91bY8nha2r__L3x02fqhy2qw6U7BOFD4/exec?name=${form.name.value}&email=${form.email.value}&message=${form.message.value}`;
    function reqListener() {
      var data = JSON.parse(this.responseText);
      window.alert("Message sent successfully");
    }

    function reqError(err) {
      window.alert("There was an Error Sending Your Message");
    }

    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open("get", url, true);
    oReq.send();
  }
});
