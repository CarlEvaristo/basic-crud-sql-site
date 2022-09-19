import './App.css';
import React from "react"
import Axios from "axios"

function App() {
  const [employee, setEmployee] = React.useState({
    name: "",
    age: 0,
    country:"",
    position: "",
    wage: 0
  })
  const [newWage, setNewWage] = React.useState(0)
  const [employeeList, setEmployeeList] = React.useState([])

  function addEmployee() {   // CREATE
    ////fetch post request
    // fetch("http://localhost:3001/create", {
    //   method: 'POST',                                   // *GET, POST, PUT, DELETE, etc.
    //   mode: 'cors',                                     // no-cors, *cors, same-origin
    //   cache: 'no-cache',                                // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: 'same-origin',                       // include, *same-origin, omit
    //   headers: {'Content-Type': 'application/json', },  // 'Content-Type': 'application/x-www-form-urlencoded'
    //   redirect: 'follow',                               // manual, *follow, error
    //   referrerPolicy: 'no-referrer',                    // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(employee) })                 // let op bij fetch moet je body serializen, axios doet dat zelf)
    //     .then(res => console.log("data post success"))
    //     .catch(err => console.log("data post error: ", err))
    
    // axios post request  => let op axios veel minder params nodig (en JSON.stringify auto gedaan)
    Axios.post("http://localhost:3001/create", employee  // 1st param: url / 2nd param: body (employee object works: because server req.body expects same keys as employee object keys)
    ).then(res => console.log("data post success")).catch(err => console.log("data post error: ", err))
  }

  function getEmployees(){    //READ
    Axios.get("http://localhost:3001/employees")
      .then(res => setEmployeeList(res.data))
      .catch(err => console.log("data get error: ", err))
  }

  function updateEmployee(id){   //UPDATE
      Axios.put("http://localhost:3001/update", {id: id, wage: newWage})
        .then(res => console.log("data updated successfully")).catch(err => console.log("data update error: ", err))
  }

  function deleteEmployee(id){   //DELETE
    Axios.delete(`http://localhost:3001/delete/${id}`)   // LET OP DELETE REQUEST KAN GEEN BODY HEBBEN => MAAR PARAM
      .then(res => console.log("data deleted successfully")).catch(err => console.log("data delete error: ", err))
}


  function handleChange(event) {
    const {name,value} = event.target
    return setEmployee(prevData => ({...prevData, [name]:value}))
  }

  function handleNewWage(event) {
    return setNewWage(event.target.value)
  }

  const employeeElements = employeeList.map(employee => (
    <div className="employee" key={employee.id}>
      <h3>{employee.name}</h3>
      <p>Age: {employee.age}</p>
      <p>country: {employee.country}</p>
      <p>Position: {employee.position}</p>
      <p>Wage: {employee.wage}</p>
      <input type="number" placeholder='New wage...' onChange={handleNewWage}/>
      <button onClick={()=>updateEmployee(employee.id)}>Update wage</button>
      <button onClick={()=>deleteEmployee(employee.id)}>Delete</button>
      <hr/>
    </div>
  ))

  return (
    <div className="App">
      <main>
        <div className="informationInput">
          <label>Name:</label>
          <input name="name" type="text" placeholder='Name...' onChange={handleChange} />
          <label>Age:</label>
          <input name="age" type="number" placeholder='Age...' onChange={handleChange} />
          <label>Country:</label>
          <input name="country"  type="text"  placeholder='Country...' onChange={handleChange} />
          <label>Position:</label>
          <input name="position" type="text" placeholder='Position...' onChange={handleChange} />
          <label>Wage (year):</label>
          <input name="wage" type="number" placeholder='Wage...' onChange={handleChange} />
          <button onClick={addEmployee}>Add Employee</button>
          <hr style={{width:'100%'}}/>
          <button onClick={getEmployees}>Show Employers</button>
          {employeeElements}
        </div>
      </main>
    </div>
  );
}

export default App;
