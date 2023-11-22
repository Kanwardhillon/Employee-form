import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, {useState, SyntheticEvent} from "react"

const AllPosts = () => {
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

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        try {
          const response = await axios.post("https://procom-interview-employee-test.azurewebsites.net/Employee", employee);
          console.log("Employee added", response.data)
          setEmployee({
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
          });
        } catch (err) {
          console.log("Error adding employee", err)
        }
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number | undefined) => {
        const { name, value } = e.target
    
        // if(name.includes("address") && i !==undefined) {
        //   const [addressStr, field, addressIndex]= name.split("-")
        //   console.log(field, addressIndex)
        //   const tempAddresses = [...employee.addresses]
        //   const addrIndex = parseInt(addressIndex);
        //   tempAddresses[addrIndex][field] = value;
        //   setEmployee({...employee, addresses: tempAddresses})
        // }
        if (name.includes("address") && typeof i !== "undefined") {
          const [_, field, addressIndex] = name.split("-");
          const tempAddresses = [...employee.addresses];
          const addrIndex = parseInt(addressIndex, 10);
    
          if (!isNaN(addrIndex) && addrIndex >= 0 && addrIndex < tempAddresses.length) {
            const fieldName = field as keyof typeof tempAddresses[0];
            tempAddresses[addrIndex] = {
              ...tempAddresses[addrIndex],
              [field]: value,
            }
    
            setEmployee((prevEmployee) => ({
              ...prevEmployee,
              addresses: tempAddresses,
            }));
          } else {
            console.log("Invalid addressIndex");
          }
        } else {
          setEmployee({ ...employee, [name]: value })
        }
      }
    
      const handleAddAddress = () => {
        setEmployee({
          ...employee,
          addresses: [
            ...employee.addresses,
            {
              streetName: "",
              postalCode: "",
              apartmentNumber: 0,
              state: "",
              country: ""
            }
          ]
        });
      };
  return (


    <div>
        <Container >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={employee.firstName}
                onChange={(e) => handleChange(e, undefined)}
              >
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={employee.lastName}
                onChange={(e) => handleChange(e, undefined)}
              >
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={employee.email}
                onChange={(e) => handleChange(e, undefined)}
              >
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={employee.phoneNumber}
                onChange={(e) => handleChange(e, undefined)}
              >
              </TextField>
            </Grid>


            {employee.addresses.map((address, i) => (
              <React.Fragment key={i}>
                <Grid item xs={12} >

                  {/* <InputLabel>Street Name</InputLabel> */}
                  <TextField
                    label="Street Name"
                    name={`address-streetName-${i}`}
                    value={address.streetName}
                    onChange={(e) => handleChange(e, i)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>

                  {/* <InputLabel>Street Name</InputLabel> */}
                  <TextField
                    label="Postal Code"
                    name={`address-postalCode-${i}`}
                    value={address.postalCode}
                    onChange={(e) => handleChange(e, i)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>

                  {/* <InputLabel>Street Name</InputLabel> */}
                  <TextField
                    label="Apartment Number"
                    name={`address-apartmentNumber-${i}`}
                    value={address.apartmentNumber}
                    onChange={(e) => handleChange(e, i)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>

                  {/* <InputLabel>Street Name</InputLabel> */}
                  <TextField
                    label="State"
                    name={`address-state-${i}`}
                    value={address.state}
                    onChange={(e) => handleChange(e, i)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>

                  {/* <InputLabel>Street Name</InputLabel> */}
                  <TextField
                    label="Country"
                    name={`address-country-${i}`}
                    value={address.country}
                    onChange={(e) => handleChange(e, i)}
                    fullWidth
                  />
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Button variant="outlined" color="primary" onClick={handleAddAddress}>
                Add Another Address
              </Button>
            </Grid>


            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Employee
              </Button>
            </Grid>

          </Grid>
        </form>
      </Container>
    </div>
  )
}

export default AllPosts