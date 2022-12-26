
class calculator{
    constructor(previousoperandtext,currentoperandtext) {
        this.previousoperandtext = previousoperandtext;
        this.currentoperandtext = currentoperandtext;
        this.clear();
    }
    clear(){
        this.curoperand = '';
        this.prevoperand = '';
        this.operation = undefined;
    }
    equals() {
        let result
        const prev = parseFloat(this.prevoperand);
        const curr = parseFloat(this.curoperand);
        if (isNaN(prev) || isNaN(curr)) return;
        if(this.operation==='+'){
            result = prev+curr;
        }
        else if(this.operation==='-'){
            result = prev - curr;
        }
        else if(this.operation==='*'){
            result = prev*curr;
        }
        else if(this.operation==='/'){
            result = prev/curr;
        }
        else{
            return;
        }
        this.curoperand = result;
        this.prevoperand = '';
        this.operation = undefined;

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updatedisplay() {
        this.currentoperandtext.innerText =
            this.getDisplayNumber(this.curoperand)
        if (this.operation != null) {
            this.previousoperandtext.innerText =
                `${this.getDisplayNumber(this.prevoperand)} ${this.operation}`
        }
        else {
            this.previousoperandtext.innerText = ''
        }
    }
    delete(){
        this.curoperand = this.curoperand.toString().slice(0,-1);
    }
    appendnumber(number){
        if(number==='.' && this.curoperand.includes('.') ){
            return ;
        }
        this.curoperand = this.curoperand.toString() + number.toString();
    }
    chooseoperation(operation){
        if(this.curoperand==='')return;
        if(this.prevoperand!==''){
            this.equals();
        }
        this.operation = operation;
        this.prevoperand = this.curoperand;
        this.curoperand = '';
    }
}


const numberbuttons = document.querySelectorAll('[data-num]');
const operationbuttons = document.querySelectorAll('[data-operation]');
const equalsbutton = document.querySelector('[data-equals]');
const deletesbutton = document.querySelector('[data-delete]');
const allclearbutton = document.querySelector('[data-all-clear]');
const previousoperandtext = document.querySelector('[data-prevoperand]');
const currentoperandtext = document.querySelector('[data-curoperand]');

const calc  = new calculator(previousoperandtext,currentoperandtext);
numberbuttons.forEach(button => {
    button.addEventListener('click',()=>{
        calc.appendnumber(button.innerText);
        calc.updatedisplay();

    })
})
operationbuttons.forEach(button => {
    button.addEventListener('click',()=>{
        calc.chooseoperation(button.innerText);
        calc.updatedisplay();

    })
})
equalsbutton.addEventListener('click',button =>{
    calc.equals();
    calc.updatedisplay();
})
allclearbutton.addEventListener('click',button =>{
    calc.clear();
    calc.updatedisplay();
})
deletesbutton.addEventListener('click',button =>{
    calc.delete();
    calc.updatedisplay();
})

