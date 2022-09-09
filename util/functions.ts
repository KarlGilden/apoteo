export const sum = (obj:any) => {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
          sum += parseFloat( obj[el] );
        }
      }
      return sum;
}

export const sumAll = (obj:any) => {
    var sum = 0;
    for( var el in obj ) {
        if( obj.hasOwnProperty( el ) ) {
          sum += parseFloat( obj[el].sum );
        }
      }
      return sum;
}