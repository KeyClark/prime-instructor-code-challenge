
let allEmployees = [
    {
        firstName: "Taco",
        lastName: "Cat",
        id: "123",
        title: "El Gato",
        annualSalary: "$75,000.00"
    },
    {
        firstName: "Hot",
        lastName: "Dog",
        id: "456",
        title: "Good Boy",
        annualSalary: "$50,000.00"
    }
]

let monthlyTotalAmt;

function addEmployeeSubmitHandler() {
    console.log("addEmployee")
    addEmployee()
    updateEmployeeDataTable()
    resetAddEmployeeForm()
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

    // Will convert salary number to USD currency format before the entry is added
    employeeToAdd.annualSalary = new Intl.NumberFormat("en-HOSSDDG",{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
     }).format(document.getElementById("annualSalaryInput").value)
    

    // Throws error if employee id is empty
    if(employeeToAdd.id == undefined || employeeToAdd.id.length < 1){
        alert("Employee ID must be a number")
        throw new Error("Employee ID must be a number")
    }

    console.log("Success... will now add employee. (id: " + employeeToAdd.id + ")")
    allEmployees.push(employeeToAdd)
}

// Matcher for employee id uniqueness
function doesIdExist(employee){
    return employee.id == document.getElementById("idInput").value;
}

// Will update table to have rows, which represent array of allEmployees[]
// This function controls what is rendered in the table
function updateEmployeeDataTable() {
    console.log("Updating... All Employees now:")
    console.group()
    console.table(allEmployees)
    console.groupEnd()

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

        // The last 2 cells will have special classes so they can be styles differently
        const annualSalaryCell = row.insertCell(4)
        annualSalaryCell.innerHTML = employee.annualSalary
        annualSalaryCell.classList.add("annualSalaryCell")

        const deleteButtOnCell = row.insertCell(5)
        deleteButtOnCell.innerHTML = `<button class="deleteButton" onclick="deleteEmployee(${employee.id})">Delete</button>`
        deleteButtOnCell.classList.add("deleteButtonCell")
    })

    // Trailing row at the end of the table
    const trailingRow = table.insertRow(-1)
    trailingRow.classList.add("trailingRow")
    const cell = trailingRow.insertCell(0);
    cell.innerHTML= ""
    cell.colSpan = 6

    updateTotalMonthly()
    console.log("total monthly: " + monthlyTotalAmt)
}

function updateTotalMonthly() {
    const monthlyTotal = document.getElementById("totalMonthlyAmount")
    let total = 0

    allEmployees.forEach(employee => {
        // Will remove all non-numeric characters from the string
        total += parseFloat(employee.annualSalary.replace(/[^0-9.-]+/g,""))
    })

    monthlyTotalAmt = total / 12

    monthlyTotal.innerHTML = new Intl.NumberFormat("en-HOSSDDG",{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
     }).format(monthlyTotalAmt)

     // Checks if monthly total is over $20,000, and if so, will change text color to red
        // If not, will use normal text
     if(monthlyTotalAmt >= 20000){
         monthlyTotal.classList.remove("monthlyTotalNormal")
         monthlyTotal.classList.add("monthlyTotalWarning")
     } else {
        monthlyTotal.classList.remove("monthlyTotalWarning")
        monthlyTotal.classList.add("monthlyTotalNormal")
     }

}

// Will reset all input fields in the form
function resetAddEmployeeForm() {
    document.getElementById("addEmployeeForm").reset()
}

// Will delete employee from allEmployees[], using employee's unique ID
// Then update table to show rows for current entries in allEmployees[]
function deleteEmployee(employeeId) {
    console.log("Deleting Employee, id: " + employeeId)
    // Updates allEmployees, minus any entries that match the employeeId to be deleted
    allEmployees = allEmployees.filter(employee => employee.id != employeeId)
    updateEmployeeDataTable()
}
