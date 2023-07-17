import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);
  const [position, setPosition] = useState("");
const [newWage, setNewWage] = useState("");
  
  const [employeeList, setEmployeeList] = useState([]);

const addEmployee = () =>{
  Axios.post('http://localhost:3001/create', 
  {
    name: name,
    age: age,
    country: country,
    wage: wage,
    position: position
  }).then(()=>{
    console.log("success")
  })
};

const getEmployees = () => {
  Axios.get("http://localhost:3001/employees").then((response) =>{
    console.log("success");
    setEmployeeList(response.data); // Set the employeeList state to the data received from the backend
  })
}


const updateEmployeewage = (ID) => {
  Axios.put('http://localhost:3001/update',
    {wage: newWage, id: ID},
    {headers: {'Content-Type': 'application/json'}}
  ).then((response) => {
    setEmployeeList(employeeList.map((val) => {
      return val.ID === ID ? { ...val, wage: newWage } : val;
    }));
    alert("update");
  })
}


const deleteEmployee = (ID) => {
  Axios.delete(`http://localhost:3001/delete/${ID}`).then((response) => {
    setEmployeeList(
      employeeList.filter((val) => {
        return val.ID !== ID;
      })
    );
  });
};




  return (
    <div className="App">
      <div className='information'>
      <label>Name:</label>
      <input type="text" onChange={(event) => {setName(event.target.value)}}/>
      <label>Age:</label>
      <input type="text" onChange={(event) => {setAge(event.target.value)}}/>  
      <label>Country:</label>
      <input type="text" onChange={(event) => {setCountry(event.target.value)}}/>
      <label>Wage:</label>
      <input type="text" onChange={(event) => {setWage(event.target.value)}}/>
      <label>Position</label>
      <input type="text" onChange={(event) => {setPosition(event.target.value)}}/>
     
      <button onClick={addEmployee}>Submit</button>
      </div>
      <div className="employees">
      <button className="show-employees-button" onClick={getEmployees}>Show employees</button>
      {employeeList.map((employee) => (
        <div className="employee" key={employee.ID}>
          <h3>{employee.name}</h3>
          <p>Age: {employee.age}</p>
          <p>Country: {employee.country}</p>
          <p>Position: {employee.position}</p>
          <p>Wage: {employee.wage}</p>
          <div><input type="text" onChange={(event) => {setNewWage(event.target.value)}} placeholder='2000...'/><button onClick={() =>{updateEmployeewage(employee.ID)}}>Update</button> 
</div>
<button onClick={() => deleteEmployee(employee.ID)}>Delete</button>
        </div>
      ))}
    </div>

    </div>
  );
}

export default App;
