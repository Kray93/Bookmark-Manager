// TODO: document.ready(function())
// each will have an ajax call with .then and callback

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

function displayBM(data, cb) {
  if (data.id) {
    $.ajax({
      method: "GET",
      url: "/api/bookmarks/?id=" + data.id,
    })
      .then(cb)
      .fail((err) => {
        console.log(err);
      });
  } else {
    let url = "/api/bookmarks/?";
    if (data.color) {
      url += `color=${data.color}&`;
    }
    if (data.collection) {
      url += `collection=${data.collection}`;
    }
    if (data.tag) {
      url += `tag=${data.tag}`;
      $.get(url)
        .then(cb)
        .fail((err) => console.log(err));
    }
  }
}

function displayuncatBM(uncatBM) {
  if (uncatBM)
    $.ajax({
      method: "GET",
      url: "/api/bookmarks/uncategorized",
    });
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
// function updateTab()

// function that creates edit page for BM

function editBM(id) {
  displayBM({ id }, (bm) => {
    $("input[name=bookmark]").val(bm.name);
    $("input[name=bmurl]").val(bm.url);
    $("input[name=bmcolor]").val(bm.color);
    $("input[name=bmtags]").val(bm.tags);
    $("#edit-bookmark").on("submit", (event) => {
      event.preventDefault();
      const updatedBM = { id: bm.id };
      if (bm.name !== $("input[name=bookmark]").val()) {
        updatedBM.newName = $("input[name=bookmark]").val();
      }
      if (bm.url !== $("input[name=bmurl]").val()) {
        updatedBM.newURL = $("input[name=bmurl]").val();
      }
      if (bm.color !== $("input[name=bmcolor]").val()) {
        updatedBM.newColor = $("input[name=bmcolor]").val();
      }
      if (bm.tags !== $("input[name=bmtags]").val()) {
        updatedBM.newParent = $("input[name=bmtags]").val();
      }
      updateBM(updatedBM, location.reload);
    });
    $("#bmEditForm").show();
  });
}

// function that creates edit page for collections

function editCollection(id) {
  displayCollection({ id }, (collection) => {
    $("input[name=collection]").val(collection.name);
    $("input[name=collectionurl]").val(collection.url);
    $("input[name=collectioncolor]").val(collection.color);
    $("input[name=collectiontags]").val(collection.tags);
    $("#edit-collection").on("submit", (event) => {
      event.preventDefault();
      const updatedCollect = { id: collection.id };
      if (bm.name !== $("input[name=bookmark]").val()) {
        updatedCollect.newName = $("input[name=bookmark]").val();
      }
      if (bm.url !== $("input[name=bmurl]").val()) {
        updatedCollect.newURL = $("input[name=bmurl]").val();
      }
      if (bm.color !== $("input[name=bmcolor]").val()) {
        updatedCollect.newColor = $("input[name=bmcolor]").val();
      }
      if (bm.tags !== $("input[name=bmtags]").val()) {
        updatedCollect.newParent = $("input[name=bmtags]").val();
      }
      updateCollect(updatedCollect, location.reload);
    });
    $("#collectEditForm").show();
  });
}

// function to update BM name, url, comment, and color

function updateBM(data, cb) {
  if (data.newName) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/name",
      data: { newName: data.newName, id: data.id },
    })
      .then(cb)
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
      .then(cb)
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
      .then(cb)
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
      .then(cb)
      .fail((err) => {
        console.log(err);
      });
  }
}

// function to update collection name, color, and parent

function updateCollect(data, cb) {
  if (data.newName) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/name",
      data: { newName: data.newName, id: data.id },
    })
      .then(cb)
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
      .then(cb)
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
      .then(cb)
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

// function moveBM(newCollection, originalCollection, id, deleteFromOriginalCollection){
//     $.ajax({
//         method: "PUT",
//         url: "/api/bookmarks/collection",
//         data: {
//             newCollection: ,
//             originalCollection: ,
//             id: ,
//             deleteFromOriginalCollection:
//          }
//     }).then()
//     .fail((err) => {
//       console.log(err);
//     });
// }

// TODO: set up click event handlers for links to get subcollections
// TODO: create next menu for those

$(() => {
  $("#menu").multilevelpushmenu({ preventItemClick: false });
});
