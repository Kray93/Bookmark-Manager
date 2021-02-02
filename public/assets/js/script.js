//Create Functions=========================================
// TODO: function to create new account
// function createNewAcc()
// function to create tag

function createTag(name, color, callback) {
  $.post("/api/bookmarks/tags", { data: { name, color } })
    .then(callback)
    .fail((err) => {
      console.log(err);
    });
}

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

// function for create tag form

function createTagForm() {
  $("#tagForm").on("submit", (event) => {
    event.preventDefault();
    createTag(
      $("input[name=tag]").val(),
      $("input[name=tagcolor]").val(),
      location.reload
    );
  });
  $("#tagFormDiv").show();
}

// function for create BM form

function createBMForm() {
  $("#bmForm").on("submit", (event) => {
    event.preventDefault();
    createBM(
      $("input[name=bookmark]").val(),
      $("input[name=bmurl]").val(),
      $("#notes").val(), //textarea
      $("select").material_select(), //dropdown menu
      $("input[name=bmcolor]").val(),
      location.reload
    );
  });
  $("#bmFormDiv").show();
}

// function for create collection form

function createCollectionForm() {
  $("#collectForm").on("submit", (event) => {
    event.preventDefault();
    createCollection(
      $("input[name=collection]").val(),
      $("input[name=collectionparent]").val(),
      $("input[name=collectioncolor]").val(),
      location.reload
    );
  });
  $("#collectFormDiv").show();
}

//Display Functions========================================
// FIXME: function to display everything in a tab

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

// FIXME: function to display collection

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

// function to edit tag

function updateTab(id) {
  displayTabs({ id }, (tag) => {
    $("input[name=tag]").val(tag.name);
    $("input[name=tagcolor]").val(tag.color);
    $("#tagForm").on("submit", (event) => {
      event.preventDefault();
      const updatedTag = { id: tag.id };
      if (tag.name !== $("input[name=tag]").val()) {
        updatedTag.newName = $("input[name=tag]").val();
      }
      if (tag.color !== $("input[name=tagcolor]").val()) {
        updatedTag.newColor = $("input[name=tagcolor]").val();
      }
      updateTag(updatedTag, location.reload);
    });
    $("#tagFormDiv").show();
  });
}

// function that creates edit page for BM

function editBM(id) {
  displayBM({ id }, (bm) => {
    $("input[name=bookmark]").val(bm.name);
    $("input[name=bmurl]").val(bm.url);
    $("input[name=bmcolor]").val(bm.color);
    $("input[name=bmtags]").val(bm.tags);
    $("textarea[name=bmcomment]").val(bm.comment);
    $("#bmForm").on("submit", (event) => {
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
      if (bm.comment !== $("textarea[name=bmcomment]").val()) {
        updatedBM.newComment = $("textarea[name=bmcomment]").val();
      }
      updateBM(updatedBM, location.reload);
    });
    $("#bmFormDiv").show();
  });
}

// function that creates edit page for collections

function editCollection(id) {
  displayCollect({ id }, (collection) => {
    $("input[name=collection]").val(collection.name);
    $("input[name=collectionurl]").val(collection.url);
    $("input[name=collectioncolor]").val(collection.color);
    $("input[name=collectiontags]").val(collection.tags);
    $("#collectForm").on("submit", (event) => {
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
    $("#collectFormDiv").show();
  });
}

// function to update BM name, url, comment, and color

function updateBM(data, cb) {
  if (data.newName) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/name",
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
      data: { newURL: data.newURL, id: data.id },
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
      data: { newComment: data.newComment, id: data.id },
    })
      .then(cb)
      .fail((err) => {
        console.log(err);
      });
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/color",
      data: { newColor: data.newColor, id: [data.id] },
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

// function to update tag name and color

function updateTag(data, cb) {
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
  $("#menu").multilevelpushmenu({ menuWidth: "20%", preventItemClick: false });

  $(".edit").on("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const id = $(this).parent().data("id");
    switch ($(this).parent().data("type")) {
      case "collection":
        editCollection(id);
        break;
      case "bookmark":
        editBM(id);
        break;
    }
  });
});
