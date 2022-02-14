//GOAL: Allow the user to sequence through the attributes and resymbolize the map 
//   according to each attribute

//GOAL: Allow the user to sequence through the attributes and resymbolize the map 
//   according to each attribute


//STEPS:
//1. Create UI affordances for sequencing
//2. Listen for user input via affordances
//3. Respond to user input by changing the selected attribute
//4. Resize proportional symbols according to each feature's value for the new attribute




//DETAILED STEPS:
//1. Create slider widget
//2. Create skip buttons
//3. Create an array of the sequential attributes to keep track of their order
//4. Assign the current attribute based on the index of the attributes array
//5. Listen for user input via affordances
//6. For a forward step through the sequence, increment the attributes array index; 
//   for a reverse step, decrement the attributes array index
//7. At either end of the sequence, return to the opposite end of the seqence on the next step
//   (wrap around)
//8. Update the slider position based on the new index
//9. Reassign the current attribute based on the new attributes array index
//10. Resize proportional symbols according to each feature's value for the new attribute