document.addEventListener("DOMContentLoaded", function () {
    let tasklist = document.querySelector(".tasklist");
    let form = document.querySelector("#myform");
    let input = document.querySelector("#taskitem");

    form.addEventListener("submit", (ev) => {
        ev.preventDefault();

        axios.post("/addtodo", {
            name: input.value
        }).then((response) => {
            console.log(response);
            let li = document.createElement("li");
            li.innerText = `${input.value}`;

            // EDIT BUTTON
            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", () => {
                editTask(response.data.id, input.value);
            });
            li.appendChild(editButton);

            // DELETE BUTTON
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteTask(response.data.id);
            });
            li.appendChild(deleteButton);

            tasklist.append(li);
            input.value = "";
        });
    });

    function showData(data) {
        tasklist.innerHTML = "";
        data.forEach((d) => {
            let li = document.createElement("li");
            li.innerText = `${d.value}`;

            // EDIT BUTTON
            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", () => {
                editTask(d.id, d.value);
            });
            li.appendChild(editButton);

            // DELETE BUTTON
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteTask(d.id);
            });
            li.appendChild(deleteButton);

            tasklist.append(li);
        });
    }

    async function editTask(taskId, currentValue) {
        const newValue = prompt(`Edit task:`);
        if (newValue !== null) {
            await axios.post("/edittodo", {
                id: taskId,
                value: newValue,
            });
            getdata("/gettodo");
        }
    }

    async function deleteTask(taskId) {
        if (confirm("Are you sure you want to delete this task ?")) {
            await axios.post("/deletetodo", {
                id: taskId,
            });
            getdata("/gettodo");
        }
    }

    async function getdata(API) {
        let response = await fetch(API);
        let data = await response.json();
        showData(data);
    }

    getdata("/gettodo");
}); 