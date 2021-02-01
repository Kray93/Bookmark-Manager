// TODO: document.ready(function())
// each will have an ajax call with .then and callback

//Create Functions=========================================
// TODO: function to create new account
// function createNewAcc()
// TODO: function to create tab
// function createTab()
// TODO: function to create BM
// function createBM()
// TODO: function to create collection
// function createCollect()

//Display Functions========================================
// TODO: function to display everything in a tab

// function displayTabs(call) {
// $.get("/api/collections").then(call).fail((err) => { console.log(err) })
// }

// TODO: function to display BM
// function displayBM()
// TODO: function to display collection
// function displayCollect() {

// }

//Edit Functions==========================================
// TODO: function to edit account info
// function editAccInfo()
// TODO: function to edit tab
// function editTab()
// TODO: function to edit BM
// function editBM()
// TODO: function to edit collection
// function editCollect()

//Delete Functions=======================================
// TODO: function to delete tab
// function deleteTab()
// TODO: function to delete BM
// function deleteBM()
// TODO: function to delete collection
// function deleteCollect()

// TODO: set up click event handlers for links to get subcollections
// TODO: create next menu for those

function start(tabs) {
  const div = $("<div>");
  $(document.body).append(div);
  var links = tabs.map((tab) => ({
    label: tab.name,
    bg: tab.color,
    id: tab.id,
  }));
  var windowHeight = window.innerHeight;
  if (windowHeight === 0) windowHeight = 238;
  var radius = windowHeight * 0.6, //sets the radius to react to the window
    circle = $("<div>"),
    borderSize = radius * 0.021,
    totalArea = 48,
    increment = totalArea / (links.length - 1),
    startPoint = 0 - totalArea / 2,
    fontSize = radius * 0.12,
    linkSize = radius * 0.25;
  styleCircle();
  addCircle();
  addLinks();
  styleLinks();
  function styleCircle() {
    circle.css({
      // circle.style.border = borderSize + "px solid #fff";
      border: borderSize + "px solid #fff",
      // circle.style.width = radius * 2 + "px";
      width: radius * 2 + "px",
      // circle.style.height = radius * 2 + "px";
      height: radius * 2 + "px",
      // circle.style.borderRadius = radius + "px";
      borderRadius: radius + "px",
      // circle.style.position = "absolute";
      position: "absolute",
      // circle.style.top = "-" + radius * 0.2 + "px";
      top: "-" + radius * 0.2 + "px",
      // circle.style.left = radius * -1 + "px";
      left: radius * -1 + "px",
    });
  }
  function addCircle() {
    // document.body.appendChild(circle);
    div.append(circle);
  }
  function addLinks() {
    for (var i = 0, l = links.length; i < l; i++) {
      //set data-id attr to links[i].id
      //   (link = document.createElement("a")),
      link = $("<a>");
      //     (hover = document.createElement("span"));
      hover = $("<span>");
      //   link.href = "#";
      link.attr("href", "#");
      //   link.dataset.color = links[i].bg;
      link.data("color", links[i].bg);
      link.css({
        //   link.style.display = "inline-block";
        display: "inline-block",
        //   link.style.textDecoration = "none";
        textDecoration: "none",
        //   link.style.color = "#fff";
        color: "#fff",
        //   link.style.position = "absolute";
        position: "absolute",
        //   link.style.zIndex = 100;
        zIndex: 100,
      });
      //   link.innerHTML = links[i].label;
      link.text(links[i].label);
      //   hover.style.position = "absolute";
      hover.css({
        position: "absolute",
        //   hover.style.display = "inline-block";
        display: "inline-block",
        //   hover.style.zIndex = 50;
        zIndex: 50,
        //   hover.style.opacity = 0;
        oppacity: 0,
      });
      //   document.body.appendChild(link);
      div.append(
        link,
        //   document.body.appendChild(hover);
        hover
      );
      //   link.addEventListener("mouseover", linkOver);
      link.on("mouseover", linkOver);
      //   link.addEventListener("mouseout", linkOut);
      link.on("mouseout", linkOut);
      links[i].elem = link;
      links[i].hover = hover;
    }
  }
  function styleLinks() {
    for (var i = 0, l = links.length; i < l; i++) {
      var link = links[i].elem,
        hover = links[i].hover,
        deg = startPoint + i * increment;
      //   link.style.paddingLeft = radius * 1.2 + "px";
      link.css({
        paddingLeft: radius * 1.2 + "px",
        //   link.style.fontSize = fontSize + "px";
        fontSize: (fontSize = "px"),
        //   link.style.height = linkSize + "px";
        height: linkSize + "px",
        //   link.style.lineHeight = linkSize + "px";
        lineHeight: linkSize + "px",
        //   link.style.left = borderSize + "px";
        left: borderSize + "px",
        //   link.style.top = windowHeight / 2 - windowHeight * 0.1 + borderSize + "px";
        top: windowHeight / 2 - windowHeight * 0.1 + borderSize + "px",
      });
      setTransformOrigin(link, "0px " + linkSize * 0.5 + "px");
      setTransition(link, "all 0.2s ease-out");
      setTransform(link, "rotate(" + deg + "deg)");
      hover.css({
        // hover.style.left = borderSize + "px";
        left: borderSize + "px",
        // hover.style.top = windowHeight * 0.4 + borderSize + "px";
        top: windowHeight * 0.4 + borderSize + "px",
        // hover.style.width = radius + borderSize / 2 + "px";
        width: radius + borderSize / 2 + "px",
        // hover.style.height = linkSize + "px";
        height: linkSize + "px",
        // hover.style.borderRight = borderSize * 2 + "px solid #fff";
        borderRight: borderSize * 2 + "px solid #fff",
      });
      setTransformOrigin(hover, "0px " + linkSize * 0.5 + "px");
      setTransition(hover, "all 0.2s ease-out");
      setTransform(hover, "rotate(" + deg + "deg)");
    }
  }
  window.onresize = function () {
    windowHeight = window.innerHeight;
    (radius = windowHeight * 0.6), (borderSize = radius * 0.021);
    (fontSize = radius * 0.12), (linkSize = radius * 0.25);
    styleCircle();
    styleLinks();
  };
  function linkOver(e) {
    var thisLink = $(e.target),
      thisHover = $(e.target.nextSibling);
    // thisLink.style.paddingLeft = radius * 1.25 + "px";
    thisLink.css("paddingLeft", radius * 1.25 + "px");
    // thisHover.style.opacity = 1;
    thisHover.css("opacity", 1);
    // document.body.style.backgroundColor = thisLink.dataset.color;
    $(document.body).css("backgroundColor", thisLink.data("color"));
  }
  function linkOut(e) {
    var thisLink = $(e.target),
      thisHover = $(e.target.nextSibling);
    // thisLink.style.paddingLeft = radius * 1.2 + "px";
    thisLink.css("paddingLeft", radius * 1.2 + "px");
    // thisHover.style.opacity = 0;
    thisHover.css("opacity", 0);
  }
  function setTransform(element, string) {
    element.css({
      // element.style.webkitTransform = string;
      webkitTransform: string,
      // element.style.MozTransform = string;
      MozTransform: string,
      // element.style.msTransform = string;
      msTransform: string,
      // element.style.OTransform = string;
      OTransform: string,
      // element.style.transform = string;
      transform: string,
    });
  }
  function setTransformOrigin(element, string) {
    element.css({
      // element.style.webkitTransformOrigin = string;
      webkitTransformOrigin: string,
      // element.style.MozTransformOrigin = string;
      MozTransformOrigin: string,
      // element.style.msTransformOrigin = string;
      msTransformOrigin: string,
      // element.style.OTransformOrigin = string;
      OTransformOrigin: string,
      // element.style.transformOrigin = string;
      transformOrigin: string,
    });
  }
  function setTransition(element, string) {
    element.css({
      // element.style.webkitTransition = string;
      webkitTransition: string,
      // element.style.MozTransition = string;
      MozTransition: string,
      // element.style.msTransition = string;
      msTransition: string,
      // element.style.OTransition = string;
      OTransition: string,
      // element.style.transition = string;
      transition: string,
    });
  }
}

function displayTabs(callback) {
  callback([
    { name: "work", color: "pink", id: 1 },
    { name: "school", color: "black", id: 2 },
    { name: "home", color: "red", id: 3 },
  ]);
}

window.addEventListener("load", () => {
  displayTabs(start);
});
