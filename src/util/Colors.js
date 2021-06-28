export default class Colors{
  constructor(){
    this.allColors = ["red","orange","yellow","blue","lblue","green","purple","pink"];
    this.availableColors = [...this.allColors];
  }

  resetColors(){
    this.availableColors =  [...this.allColors];
  }

  chooseUniqueColor(){
    this.availableColors.length === 0 && this.resetColors();
    const chosenColor = this.availableColors[Math.floor(Math.random()*this.availableColors.length)];
    this.availableColors = this.availableColors.filter(i => {return i !== chosenColor});
    return chosenColor;    
  }

  chooseColor(){
    return this.allColors[Math.floor(Math.random()*this.allColors.length)];  
  }
}