//Create Functions=========================================
// function to create tag

function createTag(name, color, callback) {
  $.post("/api/bookmarks/tags", { name, color })
    .then(callback)
    .fail(handleApiErr);
}

// function to create BM

function createBM(name, url, comment, color, collections, callback) {
  $.post("/api/bookmarks", { name, url, comment, color, collections })
    .then(callback)
    .fail(handleApiErr);
}

// function to create collection

function createCollect(name, color, ParentCollection, callback) {
  $.post("/api/collections/", { name, color, ParentCollection })
    .then(callback)
    .fail(handleApiErr);
}

// function for create tag form

function createTagForm() {
  $("#tagForm").on("submit", (event) => {
    event.preventDefault();
    createTag($("input[name=tag]").val(), $("input[name=tagcolor]").val(), () =>
      location.replace("/")
    );
  });
  $("#tagFormDiv").show();
}

// function for create BM form

function createBMForm(parentId, name, url) {
  $("select[name=bmcollections]").val([parentId]).formSelect();
  $("input[name=bookmark]").val(name);
  $("input[name=bmurl]").val(url);
  $("#bmForm").on("submit", (event) => {
    event.preventDefault();
    createBM(
      $("input[name=bookmark]").val(),
      $("input[name=bmurl]").val(),
      $("textarea[name=bmcomment]").val(), //textarea
      $("select[name=bmcolor]").val(),
      $("select[name=bmcollections]").val(), //dropdown menu
      () => location.replace("/")
    );
  });
  $("#bmFormDiv").show();
}

// function for create collection form

function createCollectionForm(parentId) {
  $("select[name=collectionparent]").val(parentId).formSelect();
  $("#collectForm").on("submit", (event) => {
    event.preventDefault();
    createCollect(
      $("input[name=collection]").val(),
      $("select[name=collectioncolor]").val(),
      $("select[name=collectionparent]").val(),
      () => location.replace("/")
    );
  });
  $("#collectFormDiv").show();
}

//Display Functions========================================
// function to display everything in a tab

function displayTabs(call) {
  $.get("/api/collections").then(call).fail(handleApiErr);
}

// function to display BM

function displayBM(data, cb) {
  if (data.id) {
    $.ajax({
      method: "GET",
      url: "/api/bookmarks/?id=" + data.id,
    })
      .then(cb)
      .fail(handleApiErr);
  } else {
    let url = "/api/bookmarks/?";
    if (data.color) {
      url += `color=${data.color}&`;
    }
    if (data.collection) {
      url += `collection=${data.collection}&`;
    }
    if (data.tag) {
      url += `tag=${data.tag}`;
    }
    $.get(url).then(cb).fail(handleApiErr);
  }
}

function displayuncatBM(uncatBM) {
  if (uncatBM)
    $.ajax({
      method: "GET",
      url: "/api/bookmarks/uncategorized",
    });
}

// function to display collection

function displayCollect(data, cb) {
  $.get(`/api/collections/id?id=${data.id}`)
    .then(cb)
    .fail(handleApiErr);
}

//Edit Functions==========================================

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
      updateTag(updatedTag, () => location.replace("/"));
    });
    $("#tagFormDiv").show();
  });
}

// function that creates edit page for BM

function editBM(id) {
  displayBM({ id }, (bm) => {
    $("input[name=bookmark]").val(bm.name);
    $("input[name=bmurl]").val(bm.url);
    $("select[name=bmcolor]").val(bm.color).formSelect();
    $("input[name=bmtags]").val(bm.tags);
    $("textarea[name=bmcomment]").val(bm.comment);
    const collectionIDs = bm.Collections.map(
      (collection) => collection.collectionID
    );
    let collectionsChanged = false;
    $("select[name=bmcollections")
      .val(collectionIDs)
      .formSelect()
      .on("change", () => (collectionsChanged = true));
    console.log($("select[name=bmcollections").val());
    $("#bmForm").on("submit", (event) => {
      event.preventDefault();
      const updatedBM = { id: bm.id };
      if (bm.name !== $("input[name=bookmark]").val()) {
        updatedBM.newName = $("input[name=bookmark]").val();
      }
      if (bm.url !== $("input[name=bmurl]").val()) {
        updatedBM.newURL = $("input[name=bmurl]").val();
      }
      if (bm.color !== $("select[name=bmcolor]").val()) {
        updatedBM.newColor = $("select[name=bmcolor]").val();
      }
      if (bm.tags !== $("input[name=bmtags]").val()) {
        updatedBM.newParent = $("input[name=bmtags]").val();
      }
      if (bm.comment !== $("textarea[name=bmcomment]").val()) {
        updatedBM.newComment = $("textarea[name=bmcomment]").val();
      }
      if (collectionsChanged) {
        updatedBM.newCollections = $("select[name=bmcollections").val();
      }
      updateBM(updatedBM, () => location.replace("/"));
    });
    $("#bmFormDiv").show();
  });
}

// function that creates edit page for collections

function editCollection(id) {
  displayCollect({ id }, (collection) => {
    console.log(collection);
    $("input[name=collection]").val(collection.name);
    $("select[name=collectioncolor]").val(collection.color).formSelect();
    $("select[name=collectionparent]").val(collection.ParentCollection).formSelect();
    $("#collectForm").on("submit", (event) => {
      event.preventDefault();
      const updatedCollect = { id: collection.id };
      if (collection.name !== $("input[name=collection]").val()) {
        updatedCollect.newName = $("input[name=collection]").val();
      }
      if (collection.color !== $("select[name=collectioncolor]").val()) {
        updatedCollect.newColor = $("select[name=collectioncolor]").val();
      }
      if (collection.ParentCollection !== $("select[name=collectionparent]").val()) {
        updatedCollect.newParentCollection = $("select[name=collectionparent]").val();
      }
      updateCollect(updatedCollect, () => location.replace("/"));
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
      .fail(handleApiErr);
  }
  if (data.newURL) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/url",
      data: { newURL: data.newURL, id: data.id },
    })
      .then(cb)
      .fail(handleApiErr);
  }
  if (data.newComment) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/comment",
      data: { newComment: data.newComment, id: data.id },
    })
      .then(cb)
      .fail(handleApiErr);
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/color",
      data: { newColor: data.newColor, id: [data.id] },
    })
      .then(cb)
      .fail(handleApiErr);
  }
  if (data.newCollections) {
    $.ajax({
      method: "PUT",
      url: "/api/bookmarks/collection",
      data: { id: data.id, newCollections: data.newCollections },
    })
      .then(cb)
      .fail(handleApiErr);
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
      .fail(handleApiErr);
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/color",
      data: { newColor: data.newColor, id: data.id },
    })
      .then(cb)
      .fail(handleApiErr);
  }
  if (data.newParentCollection) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/parent",
      data: { newParentCollection: data.newParentCollection, id: data.id },
    })
      .then(cb)
      .fail(handleApiErr);
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
      .fail(handleApiErr);
  }
  if (data.newColor) {
    $.ajax({
      method: "PUT",
      url: "/api/collections/color",
      data: { newColor: data.color, id: data.id },
    })
      .then(cb)
      .fail(handleApiErr);
  }
}

//Delete Functions=======================================

// function to delete single BM

function confirmDeleteBM(id) {
  $("button#confirm-delete").off();
  $("button#confirm-delete").on("click", () => deleteBM(id));
  $("#confirm-delete-modal").modal("open");
}

function deleteBM(id) {
  $.ajax({
    method: "DELETE",
    url: `/api/bookmarks/${id}`,
  })
    .then(() => location.replace("/"))
    .fail(handleApiErr);
}

// function to delete collection

function confirmDeleteCollect(id) {
  $("button#confirm-delete").off();
  $("button#confirm-delete").on("click", () => deleteCollect(id));
  $("#confirm-delete-modal").modal("open");
}

function deleteCollect(id) {
  $.ajax({
    method: "DELETE",
    url: `/api/collections/${id}`,
  })
    .then(() => location.replace("/"))
    .fail(handleApiErr);
}

function handleApiErr(err) {
  console.error(err);
  if (err.status == 401) location.replace("/login");
}

$(() => {
  let menuWidth;
  if (window.innerWidth <= 600) {
    menuWidth = "100%";
  } else if (window.innerWidth <= 992) {
    menuWidth = "50%";
  } else if (window.innerWidth <= 1200) {
    menuWidth = "35%";
  } else {
    menuWidth = "20%";
  }
  $(window).innerWidth();
  $("#menu").multilevelpushmenu({ menuWidth, preventItemClick: false });
  
  $("select").formSelect();
  
  $(".modal").modal();
  
  if ($("input[name=bookmark]").val() && $("input[name=bmurl]").val()) {
    createBMForm(null, $("input[name=bookmark]").val(), $("input[name=bmurl]").val());
  }
  
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

  $(".delete").on("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const id = $(this).parent().data("id");
    switch ($(this).parent().data("type")) {
      case "collection":
        confirmDeleteCollect(id);
        break;
      case "bookmark":
        confirmDeleteBM(id);
        break;
    }
  });

  $(".add").on("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    const id = $(this).data("id");
    switch ($(this).data("type")) {
      case "collection":
        createCollectionForm(id);
        break;
      case "bookmark":
        createBMForm(id);
        break;
    }
  })
});
