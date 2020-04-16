import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

const Search = ({ groupArrays, searchOnChange, value, filterGroupArrays, users }) => {

    // // Function that filters all the data that it's given as groupped arrays that hold the data and 
    // // parses it based off of what the value is from the search bar.
    // // Takes 2 arguments:
    // // 1. Array of Arrays that hold objects. (Groupped arrays for tables).
    // // 2. Value of the search bar text.
    // const filterGroupArrays = () => {
    //     let matchedEntries = [];
    //     let tempArray = [];

    //     // Loop through the first array layer of groupArrays
    //     for (let groups of groupArrays) {

    //         // Loop through the second layer of array groups
    //         for (let jsonObj of groups) {

    //             // Loop through all the objects in each array
    //             for (let tableRow in jsonObj) {
    //                 let objValue = jsonObj[tableRow].toString().toLowerCase();
    //                 if (objValue.includes(value.toLowerCase())) {
    //                     tempArray.push(jsonObj);
    //                 }
    //             }
    //         }

    //         // Assign the temp array of objs to the matchedEntries var
    //         matchedEntries = tempArray;
    //     }

    //     return matchedEntries;
    // }

    return (
        <Form onSubmit={(e) => e.preventDefault()}inline className='user-search'>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={value} onChange={searchOnChange} />
            <Button variant="outline-success">Search</Button>
        </Form>
    );
}

export default Search;
