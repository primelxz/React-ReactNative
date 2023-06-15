import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Student from './Student'

const Classroom = () => {
    
    const [students, setStudents] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMajor, setInputMajor] = useState('');
    const [inputInterest, setInputInterest] = useState('');
    const [shownStud, setShownStud] = useState([]);

    useEffect(() => {
        addAStudent();
    }, [])

    useEffect(() => {
        showName();
    }, [inputName, inputMajor, inputInterest])

    function addAStudent() {
        fetch("https://cs571.org/s23/hw4/api/students", {
            headers: {
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudents(data)
                setShownStud(data)
        })
    }

    function showName() {
        let temp = [];
        students.forEach(element => temp.push(element));

        // Check name
        temp = temp.filter(result => {
            const fullName = String(result.name.first).toLowerCase() + " " + String(result.name.last).toLowerCase();
            if(fullName.includes(inputName)) {
                return true;
            } else {
                return false;
            }
        })

        // Check major
        temp = temp.filter(result => {
            if(String(result.major).toLowerCase().includes(inputMajor)) {
                return true;
            } else {
                return false;
            }
        })
        
        // Check interest
        temp = temp.filter(result => {
            let studInterests = [];
		    result.interests.forEach(intres => studInterests.push(intres));
            if(studInterests.some(intre => intre.toLowerCase().includes(inputInterest))) {
                return true;
            } else {
                return false;
            }
        })
        setShownStud(temp);
    }

    const resetSearch = event => {
        setShownStud(students);
        setInputName('');
        setInputMajor('');
        setInputInterest('');
    }

    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                name={inputName}
                onChange={(e) => setInputName(String(e.target.value).toLowerCase().trim() ?? "")}
                value={inputName}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                major={inputMajor}
                onChange={(e) => setInputMajor(String(e.target.value).toLowerCase().trim() ?? "")}
                value={inputMajor}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                name={inputInterest}
                onChange={(e) => setInputInterest(String(e.target.value).toLowerCase().trim() ?? "")}
                value={inputInterest}
            />
            <br />
            <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                {
                    shownStud.map(student => {
                        return <Col 
                            xs={12} 
                            sm={6} 
                            md={4} 
                            lg={3} 
                            xl={2} 
                            key= {student.id}>
                                <Student {...student}
                                />
                        </Col> 
                    })
                }
            </Row>
        </Container>
    </div>

}

export default Classroom;