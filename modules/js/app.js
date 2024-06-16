$(document).ready(function () {
  $("#task-result").hide();
  let site = location.href;
  if (site.charAt(site.length - 1) == "#") {
    var aux = "";
    for (let i = 0; i < site.length - 1; i++) {
      aux += site.charAt(i);
    }
    site = aux;
  } else {
    site = site;
  }
  let edit = "";
  fetchTask();
  $("#search").keyup((e) => {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: site + "modules/php/task-search.php",
        type: "POST",
        data: { search },
        success: (response) => {
          let tasks = JSON.parse(response);
          let template = "";
          tasks.forEach((task) => {
            template += `<li>
          ${task.name}
          </li>`;
          });
          $("#container").html(template);
          $("#task-result").show();
        },
      });
    } else {
      $("#task-result").hide();
    }
  });

  //add task
  $("#task-form").submit((e) => {
    e.preventDefault();
    const postDta = {
      name: $("#name").val(),
      description: $("#description").val(),
      id: edit,
    };

    let url = edit === "" ? "task-add.php" : "task-update.php";
    $.post(site + "modules/php/" + url, postDta, (response) => {
      fetchTask();
      $("#task-form").trigger("reset");
    });
  });

  //list task

  function fetchTask() {
    $.ajax({
      url: site + "modules/php/task-list.php",
      type: "GET",
      success: (response) => {
        let tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `<tr>
                        <td id=${task.id} >${task.id}</td>
                        <td>
                          <a href="#" class="task-item">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                          <button class="task-delete btn btn-danger">
                          Delete
                          </button>
                        </td>
                    </tr>`;
        });
        $("#tasks").html(template);
      },
    });
  }

  //delete task
  $(document).on("click", ".task-delete", (e) => {
    e.preventDefault();
    let padre = e.target.parentElement.parentElement;
    let id = padre.children[0].id;
    $.post(site + "modules/php/task-delete.php", { id }, (response) => {
      fetchTask();
      console.log(response);
    });
  });

  //update task
  $(document).on("click", ".task-item", (e) => {
    e.preventDefault();
    let padre = e.target.parentElement.parentElement;
    let id = padre.children[0].id;
    $.post(site + "modules/php/task-single.php", { id }, (response) => {
      const task = JSON.parse(response);
      $("#name").val(task.name);
      $("#description").val(task.description);
      edit = task.id;
      console.log(id);
    });
  });
});
