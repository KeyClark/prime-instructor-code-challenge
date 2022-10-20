
let allEmployees = []

function addEmployeeSubmitHandler() {
    console.log("addEmployee")
    addEmployee()
    updateEmployeeDataTable()
    resetAddEmployeeForm()
    console.log("All Employees: " + JSON.stringify(allEmployees))
}

// Will add employee from form into allEmployees[] array
function addEmployee() {
    // Throw error if duplicate id is found (truthy)
    if(allEmployees.find(doesIdExist)){
        alert("Every employee must have a unique id")
        throw new Error("Every employee must have a unique id")
    }
    
    // If employee ID is unique, will create a new entry in allEmployees[]
    const employeeToAdd = new Object()
    employeeToAdd.firstName = document.getElementById("firstNameInput").value
    employeeToAdd.lastName = document.getElementById("lastNameInput").value
    employeeToAdd.id = document.getElementById("idInput").value
    employeeToAdd.title = document.getElementById("titleInput").value
    employeeToAdd.annualSalary = document.getElementById("annualSalaryInput").value

    console.log("employeeToAdd id: " + employeeToAdd.id)

    // Throws error if employee id is empty
    if(employeeToAdd.id == undefined || employeeToAdd.id.length < 1){
        alert("Employee ID must be a number")
        throw new Error("Employee ID must be a number")
    }

    allEmployees.push(employeeToAdd)
}

// Matcher for employee id uniqueness
function doesIdExist(employee){
    return employee.id == document.getElementById("idInput").value;
}

// Will update table to have rows, which represent array of allEmployees[]
// This function controls what is rendered in the table
function updateEmployeeDataTable() {
    console.log("updating updateEmployeeDataTable: " + JSON.stringify(allEmployees))

    const table = document.getElementById("employeeDataTableBody")

    // Remove all rows (if any) in table before re-rendering
    table.replaceChildren()

    // For every employee in allEmployees[] add a table row
    allEmployees.forEach((employee) => {
        // Create a new row, appending to the end of the table
        const row = table.insertRow(-1)
        row.dataset.employeeId = employee.id
        
        // Creates columns for ever property, within the row
        row.insertCell(0).innerHTML = employee.firstName
        row.insertCell(1).innerHTML = employee.lastName
        row.insertCell(2).innerHTML = employee.id
        row.insertCell(3).innerHTML = employee.title
        row.insertCell(4).innerHTML = employee.annualSalary
        row.insertCell(5).innerHTML = `<button onclick="deleteEmployee(${employee.id})">Delete</button>`
    })
}

// Will reset all input fields in the form
function resetAddEmployeeForm() {
    document.getElementById("addEmployeeForm").reset()
}

// Will delete employee from allEmployees[], using employee's unique ID
// Then update table to show rows for current entries in allEmployees[]
function deleteEmployee(employeeId) {
    console.log("Deleting Employee: " + employeeId)
    // Updates allEmployees, minus any entries that match the employeeId to be deleted
    allEmployees = allEmployees.filter(employee => employee.id != employeeId)
    console.log("All Employees now: " + JSON.stringify(allEmployees))
    updateEmployeeDataTable()
}
