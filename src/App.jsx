import React,{useState} from 'react';
import './App.css';





function App(){

    

    return(
    <div>
        <div class="box" id="heading">
            <h1>Water Can</h1>
        </div>
    
        <div class="box">
            <form class="item" action="/" method="post">
              <label>Enter the Number of Cans</label>
              <input type="number" name="canCount"   placeholder="" autocomplete="off"/>
              <button type="submit" name="list" value="">+</button>

            </form>
        </div>
    </div>
    )
}


export default App;