export const predictEndOfMonth = (dailySpending) => {
    
    let cumulative = [];
    let runningTotal = 0;

    for(const daily of dailySpending){
        runningTotal += daily.amount ;
        cumulative.push({day : daily.day , amount : runningTotal}) ;
    }
    
    let sumX = 0 ;
    let sumY = 0 ;
    for(const daily of cumulative){
        sumX += daily.day ;
        sumY += daily.amount ;
    }

    const n = cumulative.length ;

    let meanX = sumX/n ;
    let meanY = sumY/n ;

    let numerator = 0 , denominator = 0 ;
    for(const daily of cumulative){
        numerator += (daily.day - meanX)*(daily.amount - meanY) ;
        denominator += (daily.day - meanX)*(daily.day - meanX) ;
    }

    let m = numerator/denominator ;
    let b = meanY - (m*meanX) ;

    const monthly = 30 ;
    const predictionResult = m*monthly + b ;

    return predictionResult ;
};
