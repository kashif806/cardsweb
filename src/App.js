import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

lass App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    totalCards  : props.totalCards,
    cardsStatus : Array(props.totalCards).fill(false),
    addKitten   : false
    };
  
}

 //loop to render cards
rendercard(i,cardsStatus) {

    const cardsArray = [];
        for (let index = 0; index < i; index++) {
          
    cardsArray.push(<Card number = {index+1} active = {cardsStatus[index]} handleClick={this.handleClick} key={index}
       image={"url(http://placekitten.com/250/350?image="+index+")"}
       addKitten = {this.state.addKitten}
       />)
          
                       
        }
        
        return cardsArray;
  }

//saves state of active card in array 
handleClick = (i) => {

  console.log(this.state.cardsStatus)

  const newStatus = this.state.cardsStatus.slice();
  
  if (newStatus[i]) {
     newStatus.fill(false);
  }
  else {
     for (let index = 0; index < newStatus.length; index++) {
      newStatus[index] = (index === i) ? true : false;    
    }
  }
  this.setState({cardsStatus : newStatus})

}

//changes status to show/hide kitten pics
 addKitten = (prevState) => {
  // this.setState({addKitten : true});
  this.setState(prevState => ({
    addKitten: !prevState.addKitten
  }));
  console.log(this.state.addKitten)

 }

 //adds new card by changing cardsStatus array 
 addCard = (prevState) => {
  
  this.setState(prevState => ( {
    totalCards : prevState.totalCards+1,
    cardsStatus : Array(prevState.totalCards+1).fill(false)
  }));
  
 }

 //same as addCard() but only removes one card from array instead of adding
 removeCard = (prevState) => {
  if (this.state.totalCards > 0) {
  this.setState(prevState => ( {
    totalCards : prevState.totalCards-1,
    cardsStatus : Array(prevState.totalCards-1).fill(false)
   }));
  }
 }
 
 //main render function
 render() {
   console.log(this.state.totalCards);
    return (
      <div>
        <div>
          <div className="card" id="controlPanel">
          
            <button onClick = {this.addKitten} className="kitBtn">Add / remove Kittens</button>
            <p>Add/Remove Cards</p>
            <button onClick={this.addCard} className =  "addBtn">+</button>
            <button onClick={this.removeCard} className =  "addBtn" >-</button>
            
          </div>
          {this.rendercard(this.state.totalCards,this.state.cardsStatus)}
        </div>
        
        

      </div>

      
    )
  }
}


App.defaultProps = {
  totalCards : 6  
}


//card component
class Card extends Component {
  constructor(props){
    super(props);
    this.image = "";
    this.state = {
      active : false
    }
  }

  //changes state if kitten images are required 
  backgroundImage = () => {
    
    if (!this.props.active && this.props.state.addKitten) {
      this.image = "url("+this.props.image+")"
    }
    else 
      this.image = null;

      return this.image;
  }

    
  //card render

  render() {
    return (
      <button className="card" 
      id= {this.props.active ? "activeCard" : "inActiveCard"} 
      onClick = {() => (this.props.handleClick(this.props.number-1))} 
      
      style = {(!this.props.active && this.props.addKitten)  ? {backgroundImage : this.props.image } : {}}>
      
           
      
      <h1>{this.props.active ? this.props.number : ""}</h1>
       </button>
    )
  }
}






//class App extends Component {
  //render() {
    //return (
      //<div className="App">
        //<header className="App-header">
          //<img src={logo} className="App-logo" alt="logo" />
          //<p>
            //Edit <code>src/App.js</code> and save to reload.
          //</p>
          //<a
            //className="App-link"
            //href="https://reactjs.org"
            //target="_blank"
            //rel="noopener noreferrer"
          //>
            //Learn React
          //</a>
        //</header>
      //</div>
    //);
  //}
//}

export default App;
