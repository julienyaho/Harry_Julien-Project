# Harry_Julien-Project
----------------------------------
__Semantic Web and Linked Data.__

# Project title: Primary and Secondary Schools Locations in Dublin
 By Harry Wang & Julien Yaho
 ----------------------------

 
* We are doing our project on Primary and Secondary Schools Locations.
* This project will allow the users to find the Locations of the Primary and Secondary Schools in the south of Dublin.
* People can find those Locations use school name.

## Datasets used
-----------------------
* Primary and Secondary Schools Locations.
* Dataset 1: https://data.gov.ie/dataset/primary-schools

> Example : {
    "Organisation":"DEPARTMENT OF EDUCATION AND SCIENCE",
    "Name":"SAINT ANDREWS NATIONAL SCHOOL",
    "Address1":"CHAPEL HILL",
    "Address2":"LUCAN",
    "Address3":"CO. DUBLIN",
    "Address4":null,
    "ITMEast":703865.885,
    "ITMNorth":735586.085
  }
  
* Dataset 2: https://data.gov.ie/dataset/secondary-school-locations

> Example: {
    "Organisation":"DEPARTMENT OF EDUCATION AND SCIENCE",
    "Name":"SCOIL NAOMH MAELRUANS",
    "Address1":"OLD BAWN AVENUE",
    "Address2":"TALLAGHT",
    "Address3":"DUBLIN 24",
    "Address4":null,
    "ITMEast":"709200.334",
    "ITMNorth":"726528.533"
  }

## How to Query the API
* Post

> app.post('/POST',	function (req, res){***}

* DELETE

> app.delete('/DELETE',	function (req, res){***}

* PUT

> app.put('/PUT',	function (req, res){***}

## Example use of the API
* Function to get primaryschool, secondaryschool and allschool Location in south Dublin.

> Please enter Http://127.0.0.1:3000/primary or Http://127.0.0.1:3000/primary or  Http://127.0.0.1:3000/primary

> app.get('/primary',function(req,res))

> app.get('/secondary',function(req,res))

> app.get('/allschool',function(req,res))

* Use School Name to search School Information

> Please enter Http://127.0.0.1:3000/wholeschool/Name/:Name

> app.get('/wholeschool/Name/:Name',function(req,res))

--------------------



## References

## Note
* We will the updating this Readme.md file as we go along with our project.
