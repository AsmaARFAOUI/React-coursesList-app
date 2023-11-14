import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Main() {
  const [courseName, setCourseName] = useState("");
  const [courseNameUpdated, setCourseNameUpdated] = useState("");
  const [courses, setCourses] = useState([]);
  const [refrech, setRefrech] = useState(false)
  const [readOnly, setReadOnly] = useState(true);
  const [courseItem, setCourseItem] = useState("");

  const storedCourses = JSON.parse(localStorage.getItem('courses'));
  useEffect(() => {
     if (storedCourses) {
      setCourses(storedCourses);
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  function addCourseHandler() {
    if (courseName !== "") {
      setCourses((prevCourses) => [...prevCourses, courseName]);
      setCourseName("");
    }
  }

  function editCourseHandler(item) {
    setReadOnly((prev) => !prev);
    setCourseItem(item);
  }

  function updateCourseHandler(item) {
    let indexOfItem = courses.indexOf(item);
    if(courseNameUpdated !== "") {
      courses.splice(indexOfItem,1,courseNameUpdated);
    }
    localStorage.setItem('courses', JSON.stringify(courses));
    setReadOnly((prev) => !prev)
  }

  function deleteCourseHandler(item) {
    courses.splice(courses.indexOf(item),1)
    localStorage.setItem('courses', JSON.stringify(courses));
    setRefrech((prev) => (!prev)) 
  }

  let coursesList = courses.map((item) => (
    <Row key={item} className="my-2">
    <Col>
     <Form.Control lg={6}
      type="text"
      id="inputAddCourse"
      aria-describedby="addCourseHelpBlock"
      className="rounded-0 border-0"
      placeholder={item}
      onChange={(e) => { setCourseNameUpdated(e.target.value) }}
      readOnly={readOnly === false && courseItem === item ? false : true }
     />
    </Col>
    <Col lg={3}>
     { (readOnly === false && courseItem === item) ?
      <Button 
      style={{backgroundColor:"Crimson", width:"100%"}} 
      className="border-0 rounded-0"
      onClick={() => {updateCourseHandler(item)}}
      >Register</Button> :
     <Button 
       style={{ backgroundColor:"var(--gray-color)", width:"100%"}} 
       className="border-0 rounded-0"
       onClick={() => {editCourseHandler(item)}}
       >Edit Course</Button>}
    </Col>
    <Col lg={3}>
     <Button 
       style={{backgroundColor:"var(--red-color)", width:"100%"}} 
       className="border-0 rounded-0"
       onClick={() => {deleteCourseHandler(item)}}
       >Delete Course</Button>
    </Col>
   </Row> 
  ))

    return(
        <div style={{marginTop: "100px", backgroundColor:"white"}} className="p-5">
          <h2 className="text-center text-white p-3" style={{backgroundColor:"var(--gray-color)"}}>Courses list</h2>  
          <div>
           <Row className="my-3">
            <Col lg={9}>
             <Form.Control
              type="text"
              id="inputAddCourse"
              className="rounded-0"
              value={courseName}
              onChange={(e) => { setCourseName(e.target.value) }}
             />
            </Col>
            <Col lg={3}>
              <Button
               style={{ backgroundColor: "var(--green-color)", width: "100%" }}
               className="border-0 rounded-0"
               onClick={addCourseHandler}
               >
               Add Course
              </Button>
            </Col>
           </Row>
           <div>
            {coursesList}
           </div>
          </div>
        </div>
    )
}