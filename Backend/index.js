let express = require("express");
let cors = require("cors");
let sqlite3 = require("sqlite3").verbose();
let { open } = require("sqlite");

let app = express();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

let db;

// Initialize sqlite database connection
(async () => {
  db = await open({
    filename: './Backend/database.sqlite',
    driver: sqlite3.Database,
  });
  console.log("Database connected.");
})();

// function to fetch all employees by gender
async function fetchByGender(gender){
  let query = "SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query, [gender]);
  return { employees: response };
}

// Route to fetch all employees by gender
app.get("/employees/gender/:gender", async (req, res)=>{
 let gender = req.params.gender;
 try{
  let results = await fetchByGender(gender);
  
  if(results.employees.length === 0){
    res.status(404).json({ message: "No employees for this gender: " + gender });
  }
 
  res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to fetch all employees by department
async function fetchByDepartment(department){
  let query = "SELECT * FROM employees WHERE department = ?";
  let response = await db.all(query, [department]);
  return { employees: response };
}


// Route to fetch all employees by department
app.get("/employees/department/:department",  async (req, res)=>{
 let department = req.params.department;
 try{
  let results = await fetchByDepartment(department);
  
  if(results.employees.length === 0){
    res.status(404).json({ message: "No employees found for this department: " + department });
  }

  res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to fetch all employees by job title
async function fetchByTitle(job_title){
  let query = "SELECT * FROM employees WHERE job_title = ?";
  let response = await db.all(query, [job_title]);
  return { employees: response };
}

// Route to fetch all employees by job title
app.get("/employees/job_title/:job_title", async (req, res)=>{
 let job_title = req.params.job_title;
 try{
  let results = await fetchByTitle(job_title);

  if(results.employees.length === 0){
    res.status(404).json({ message: "No employees found for this title: " + job_title });
  }
   
  res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// function to fetch all employees by location
async function fetchByLocation(location){
  let query = "SELECT * FROM employees WHERE location = ?";
  let response = await db.all(query, [location]);
  return { employees: response };
}

// Route to fetch all employees by location
app.get("/employees/location/:location", async (req, res)=>{
 let location = req.params.location
 try{
  let results = await fetchByLocation(location);
  
  if(results.employees.length === 0){
    res.status(404).json({ message: "No employees found for this location: " + location });
  }
   
  res.status(200).json(results);
 } catch(error){
   res.status(500).json({ error: error.message });
 }
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));