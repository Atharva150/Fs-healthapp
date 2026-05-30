function calculateBmi(height:number,weight:number) :string {
    const bmi = weight / (((height)/100) **2 );
    if(bmi <= 18.5) {
        return("Underweight");
    }
    else if(bmi<=24.9){
        return("Normal Range");
    }
    else if(bmi<=29.9){
        return("Overweight");
    }
    else{
        return("Obese");
    }
}

// console.log(calculateBmi(180,74))


// console.log(process.argv)

// const a:number = Number(process.argv[2])
// const b:number = Number(process.argv[3])


// console.log(calculateBmi(a, b))
const parseArguments = (args: string[]): {height:number,weight:number} => {
    
    if(args.length < 4 ){
        throw new Error('Not Enough Arguments');
    }
        
    if(args.length > 4 ){
        throw new Error('Too Many Arguments');
    }

    const height = Number(args[2]);
    const weight = Number(args[3]);
    
    if(isNaN(height) || isNaN(weight)) {
        throw new Error('Provided Values were Not Numbers!');
    }

    return{
        height,
        weight
    };
};

try{
    const { height, weight } = parseArguments(process.argv);


    console.log(calculateBmi(height,weight));;

}

catch(error:unknown) {
    let errorMessage = 'Something bad Happened';

    if(error instanceof Error) {
        errorMessage+= 'Error:' + error.message;
    }

    console.log(errorMessage);
}

export default calculateBmi;