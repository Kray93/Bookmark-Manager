// TODO: document.ready(function())
// each will have an ajax call with .then and callback

const { data } = require("jquery");

//Create Functions=========================================
// TODO: function to create new account
// function createNewAcc()
// TODO: function to create tab
// function createTab()

// function to create BM

function createBM(name, url, comment, color, collection, callback) {
  $.post("/api/bookmarks", { data: { name, url, comment, color, collection } })
    .then(callback)
    .fail((err) => {
      console.log(err);
    });
}

// function to create collection

function createCollect(name, color, parent, callback) {
  $.post("/api/collections/", { data: { name, color, parent } })
    .then(callback)
    .fail((err) => {
      console.log(err);
    });
}

//Display Functions========================================
// TODO: function to display everything in a tab

function displayTabs(call) {
  $.get("/api/collections")
    .then(call)
    .fail((err) => {
      console.log(err);
    });
}

// function to display BM

function displayBM(data, bm) {
  if (data.id) {
    $.ajax({
      method: "GET",
      url: "/api/bookmarks/?id=" + data.id,
    })
      .then(bm)
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.color || data.collection) {
    $.get(
      "/api/bookmarks/?collection= " + data.collection,
      "/api/bookmarks/?color=" + data.color
    )
      .then(bm)
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.tag) {
    $.get("/api/bookmarks/?tag=" + data.tag)
      .then(bm)
      .fail((err) => {
        console.log(err);
      });
  }
}

function displayuncatBM(uncatBM) {
    if(uncatBM)
    $.ajax({
        method: "GET",
        url: "/api/bookmarks/uncategorized"
    })
}

// TODO: function to display collection

function displayCollect(displaysub) {
  $.get("/api/collection/subcollections")
    .then(displaysub)
    .fail((err) => {
      console.log(err);
    });
}

//Edit Functions==========================================
// TODO: function to edit account info
// function editAccInfo()
// TODO: function to edit tab
// function editTab()

// function to edit BM name, url, comment, and color

function editBM(data) {
  if (data.newName) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/name",
      data: { newName: data.newName, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newURL) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/url",
      data: { newURL: data.url, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newComment) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/comment",
      data: { newComment: data.comment, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/color",
      data: { newColor: data.color, id: [data.id] },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
}

// function to edit collection name, color, and parent

function editCollect(data) {
  if (data.newName) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/name",
      data: { newName: data.newName, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/color",
      data: { newColor: data.color, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newParent) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/parent",
      data: { newParent: data.parent, id: data.id },
    })
      .then()
      .fail((err) => {
        console.log(err);
      });
  }
}

//Delete Functions=======================================
// TODO: function to delete tab
// function deleteTab()

// function to delete single BM

function deleteBM() {
  $.ajax({
    method: "DELETE",
    url: "/api/bookmarks/:id",
  })
    .then()
    .fail((err) => {
      console.log(err);
    });
}

// function to delete collection

function deleteCollect() {
  $.ajax({
    method: "DELETE",
    url: "/api/collection/:id",
  })
    .then()
    .fail((err) => {
      console.log(err);
    });
}

//Move Functions============================================
// TODO: function to move a bm from one collection to another

function moveBM(newCollection, originalCollection, id, deleteFromOriginalCollection){
    $.ajax({
        method: "PUT",
        url: "/api/bookmarks/collection",
        data: { 
            newCollection: ,
            originalCollection: ,
            id: ,
            deleteFromOriginalCollection:
         }
    }).then()
    .fail((err) => {
      console.log(err);
    });
}

// TODO: set up click event handlers for links to get subcollections
// TODO: create next menu for those

// function start(tabs) {
//   const div = $("<div>");
//   $(document.body).append(div);
//   var links = tabs.map((tab) => ({
//     label: tab.name,
//     bg: tab.color,
//     id: tab.id,
//   }));
//   var windowHeight = window.innerHeight;
//   if (windowHeight === 0) windowHeight = 238;
//   var radius = windowHeight * 0.6, //sets the radius to react to the window
//     circle = $("<div>"),
//     borderSize = radius * 0.021,
//     totalArea = 48,
//     increment = totalArea / (links.length - 1),
//     startPoint = 0 - totalArea / 2,
//     fontSize = radius * 0.12,
//     linkSize = radius * 0.25;
//   styleCircle();
//   addCircle();
//   addLinks();
//   styleLinks();
//   function styleCircle() {
//     circle.css({
//       border: borderSize + "px solid #fff",
//       width: radius * 2 + "px",
//       height: radius * 2 + "px",
//       borderRadius: radius + "px",
//       position: "absolute",
//       top: "-" + radius * 0.2 + "px",
//       left: radius * -1 + "px",
//     });
//   }
//   function addCircle() {
//     div.append(circle);
//   }
//   function addLinks() {
//     for (var i = 0, l = links.length; i < l; i++) {
//       //set data-id attr to links[i].id
//       link = $("<a>");
//       hover = $("<span>");
//       link.attr("href", "#");
//       link.data("color", links[i].bg);
//       link.css({
//         display: "inline-block",
//         textDecoration: "none",
//         color: "#fff",
//         position: "absolute",
//         zIndex: 100,
//       });
//       link.text(links[i].label);
//       hover.css({
//         position: "absolute",
//         display: "inline-block",
//         zIndex: 50,
//         oppacity: 0,
//       });
//       div.append(link, hover);
//       link.on("mouseover", linkOver);
//       link.on("mouseout", linkOut);
//       links[i].elem = link;
//       links[i].hover = hover;
//     }
//   }
//   function styleLinks() {
//     for (var i = 0, l = links.length; i < l; i++) {
//       var link = links[i].elem,
//         hover = links[i].hover,
//         deg = startPoint + i * increment;
//       link.css({
//         paddingLeft: radius * 1.2 + "px",
//         fontSize: (fontSize = "px"),
//         height: linkSize + "px",
//         lineHeight: linkSize + "px",
//         left: borderSize + "px",
//         top: windowHeight / 2 - windowHeight * 0.1 + borderSize + "px",
//       });
//       setTransformOrigin(link, "0px " + linkSize * 0.5 + "px");
//       setTransition(link, "all 0.2s ease-out");
//       setTransform(link, "rotate(" + deg + "deg)");
//       hover.css({
//         left: borderSize + "px",
//         top: windowHeight * 0.4 + borderSize + "px",
//         width: radius + borderSize / 2 + "px",
//         height: linkSize + "px",
//         borderRight: borderSize * 2 + "px solid #fff",
//       });
//       setTransformOrigin(hover, "0px " + linkSize * 0.5 + "px");
//       setTransition(hover, "all 0.2s ease-out");
//       setTransform(hover, "rotate(" + deg + "deg)");
//     }
//   }
//   window.onresize = function () {
//     windowHeight = window.innerHeight;
//     (radius = windowHeight * 0.6), (borderSize = radius * 0.021);
//     (fontSize = radius * 0.12), (linkSize = radius * 0.25);
//     styleCircle();
//     styleLinks();
//   };
//   function linkOver(e) {
//     var thisLink = $(e.target),
//       thisHover = $(e.target.nextSibling);
//     thisLink.css("paddingLeft", radius * 1.25 + "px");
//     thisHover.css("opacity", 1);
//     $(document.body).css("backgroundColor", thisLink.data("color"));
//   }
//   function linkOut(e) {
//     var thisLink = $(e.target),
//       thisHover = $(e.target.nextSibling);
//     thisLink.css("paddingLeft", radius * 1.2 + "px");
//     thisHover.css("opacity", 0);
//   }
//   function setTransform(element, string) {
//     element.css({
//       webkitTransform: string,
//       MozTransform: string,
//       msTransform: string,
//       OTransform: string,
//       transform: string,
//     });
//   }
//   function setTransformOrigin(element, string) {
//     element.css({
//       webkitTransformOrigin: string,
//       MozTransformOrigin: string,
//       msTransformOrigin: string,
//       OTransformOrigin: string,
//       transformOrigin: string,
//     });
//   }
//   function setTransition(element, string) {
//     element.css({
//       webkitTransition: string,
//       MozTransition: string,
//       msTransition: string,
//       OTransition: string,
//       transition: string,
//     });
//   }
// }

// function displayTabs(callback) {
//   callback([
//     { name: "work", color: "pink", id: 1 },
//     { name: "school", color: "black", id: 2 },
//     { name: "home", color: "red", id: 3 },
//   ]);
// }

// window.addEventListener("load", () => {
//   displayTabs(start);
// });
