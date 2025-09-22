//Declaration of the variables
let todoInput = document.querySelector("input");
let todoBtn = document.querySelector("#toDoBtn"); //Id
let toDoItem = document.querySelector("#toDoItem"); //<ul>
let clearAll = document.querySelector("#clearAll");
let smallField = document.querySelector("small"); //For empty input message
let label = document.querySelector('.completedCount'); //class
let tasksLabel = document.querySelector('.tasks');
let completedCount = 0;
let tasksCount = 0;
let toDoArray = [];

todoBtn.addEventListener("click", AddToDo);

// Add task to the list when enter key is pressed
todoInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        AddToDo();
    }
});

// Clear all items when clear button is clicked
clearAll.addEventListener("click", function() {
    // Remove all list items from the DOM
    toDoItem.innerHTML = '';
    
    // Reset counters and arrays
    completedCount = 0;
    tasksCount = 0;
    toDoArray = [];
    
    // Update labels
    label.innerHTML = `${completedCount} färdiga`;
    tasksLabel.innerHTML = `${tasksCount} uppgifter`;
});

function changeStatus(todoText, completed) {
    // let findIndex = toDoArray.findIndex(t => t.name === todoText); // First method
    let findIndex = toDoArray.map(t => t.name).indexOf(todoText); // Second Method
    if (findIndex !== -1) {
        toDoArray[findIndex].completed = completed;
    }
}

function AddToDo() {
    // Trim the whitespaces and check if the value is present in the input field
    let inputValue = todoInput.value.trim();
    
    if (inputValue.length == 0) {
        smallField.innerHTML = "Input must not be empty!";
        return;
    } else {
        smallField.innerHTML = '';
        
        // Create a new list item
        let listItem = document.createElement("li");
        
        let delBtn = document.createElement("button");
        delBtn.innerHTML = "&#128465;"; // Trash icon Unicode
        delBtn.classList.add("deleteBtn");
        
        // Add event listener to the delete button
        delBtn.addEventListener("click", function(e) {
            // The stopPropagation() method prevents propagation of the same event from being called.
            // Propagation means bubbling up to parent elements or capturing down to child elements.
            e.stopPropagation();
            
            // Check if the item is completed and update count if needed
            if(listItem.getAttribute("class") == "completed"){
                completedCount--;
                label.innerHTML = `${completedCount} färdiga`;
            }
            
            // Remove from array
            let itemText = itemLabel.textContent;
            toDoArray = toDoArray.filter(item => item.name !== itemText);
            
            // Remove the list item from the DOM
            listItem.remove();
            
            // Update tasks count
            tasksCount--;
            tasksLabel.innerHTML = `${tasksCount} uppgifter`;
        });
        
        // Create a new span for items to be added
        const itemLabel = document.createElement("span");
        itemLabel.textContent = inputValue;
        
        // Append to array
        const toDoObject = { name: inputValue, completed: false };
        toDoArray.push(toDoObject);
        
        // DOM manipulation - Add the created elements to the list item
        listItem.appendChild(itemLabel);
        listItem.appendChild(delBtn);
        toDoItem.appendChild(listItem);
        
        // Update tasks count
        tasksCount++;
        tasksLabel.innerHTML = `${tasksCount} uppgifter`;
        
        // Add click event to handle the completed tasks. Can add and remove the tasks completed.
        //The counter increases when the task is completed and decreases when unselecting the task.
        listItem.addEventListener("click", function() {
            if(listItem.getAttribute("class") == "completed"){
                listItem.setAttribute("class", "");
                completedCount--;
                changeStatus(itemLabel.textContent, false);
            } 
            else {
                listItem.setAttribute("class", "completed");
                completedCount++;
                changeStatus(itemLabel.textContent, true);
            }
        
        label.innerHTML = `${completedCount} färdiga`;
        });
        
        // Clear input field after the task is added. When the input field is clicked it focuses by highlighting the input field.
        todoInput.value = '';
        todoInput.focus();
    }
}