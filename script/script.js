

const button= document.querySelector("button");
const items = document.querySelector(".items");
const allItems = document.getElementsByClassName("item");
const search = document.getElementById("search");
var notes = [];
let text='';

//get data from the local storage
notes= JSON.parse(localStorage.getItem("data"));

//create a item and display it on the page
const listNote = (note, key) => {
    const item = document.createElement("div");
    item.className="item";
    item.setAttribute("id", key);
    
                                
    const deletebtn= document.createElement("p");
    deletebtn.innerText="delete"
    deletebtn.className="delete";
    deletebtn.setAttribute("onclick", "deleteNote(this)");

    let newItem = document.createElement("p");
    newItem.innerText = note.note;
    item.append(newItem);
    item.append(deletebtn);
    
    items.appendChild(item);
}


 const doSearch = () =>{
         arr = [...allItems];
         arr.forEach((item)=>{
            
              text=item.innerText;
            
             if(text.toLowerCase().includes(search.value.toLowerCase())){
                     item.style.display='';
             }else{
                 item.style.display='none';
             }
         })
 }

//create a note, add it to an array and store the array on local Storage.
const addNote = () => {
     var input = document.getElementById("note").value;
    
     if(input===''){
            prompt("Please type a note before clicking add");
            return

     }
    const note = Note(input);


    if(notes===null) notes=[];
        notes.push(note);

        localStorage.setItem("data", JSON.stringify(notes))
        
        listNote(note);
        
}

//fill the page with data when it loads
const pageLoad = () => {
    
    if(notes=== null) return;

    notes = JSON.parse(localStorage.getItem("data"));

    notes.forEach((element, key) => {
        
        listNote(element, key);
    });
}


//function to delete an item
const deleteNote = (btn) => {
    let parentElem = btn.parentNode
    let key = parentElem.getAttribute("id");
    document.getElementById(key).remove();
    notes.splice(key,1);
    localStorage.setItem("data", JSON.stringify(notes))
}

window.addEventListener("load", pageLoad);
button.addEventListener("click", addNote);
search.addEventListener("input", doSearch);



//creates a factory object of Note
function Note(note){

    return {
        note,
        key: Math.random()
    }


}

