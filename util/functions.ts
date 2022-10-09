export const sum = (obj:any) => {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) && el != "sum" && obj[el] !== null ) {
          sum += parseInt( obj[el] );
        }
      }
      return sum;
}

export const sumAll = (obj:any) => {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) && el != "sum" && obj[el].sum !== null ) {
          sum += parseInt( obj[el].sum );
        }
      }
      return sum;
}