import { Button } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

const AllEmployees = () => {

    const [employee, setEmployee] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        addresses: [
          {
            streetName: "",
            postalCode: "",
            apartmentNumber: 0,
            state: "",
            country: ""
          }
        ]
    
      })
    
      interface Address {
        streetName: string;
        postalCode: string;
        apartmentNumber: number;
        state: string;
        country: string;
      }
      
      interface Person {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        addresses: Address[];
      }
      
      interface ArrayOfPersons extends Array<Person>{}
      
      const [employeeList, setEmployeeList]  = useState<ArrayOfPersons>([])

      const getEmployees = async () => {
        const response = await axios.get("https://procom-interview-employee-test.azurewebsites.net/Employee")
        setEmployeeList(response.data)
      }
    
      useEffect(() => {
        getEmployees()
      }, [employeeList])

  return (
    <div>
        {employeeList.length !== 0 ? employeeList.map(item =>{
        return <h1 key ={item.id} >
          {item.firstName} 
          <span><Link to="post"><Button >Edit</Button></Link></span>
        </h1>
      }): ""}
    </div>
  )
}

export default AllEmployees