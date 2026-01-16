import Expense from "../models/Expense.mjs";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    if (!amount || !category || !date || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      amount,
      category,
      date,
      description,
      user: req.user._id, 
    });

    const savedExpense = await newExpense.save();

    return res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getExpenses = async (req , res) =>{
    try {
        const {startDate , endDate , category , page = 1 , limit = 10} = req.query ;

        // Always 
        const filter = {
            user : req.user._id 
        }

        if(category){
            filter.category = category 
        }

        if(startDate || endDate){
            filter.date = {} 
            if(startDate){
                filter.date.$gte = new Date(startDate)  
            }
            if(endDate){
                filter.date.$lte = new Date(endDate) 
            }
        }

        const pageNumber = Number(page) ;
        const limitNumber = Number(limit) ;
        const skip = (pageNumber - 1) * ( limitNumber ) ;

        const Expenses = await Expense.find(filter).sort({date : -1}).skip(skip).limit(limitNumber) ;

        const totalExpenses = await Expense.countDocuments(filter) ;

        return res.status(200).json(
            {
                Expenses ,
                totalExpenses ,
                currentNumber : pageNumber ,
                totalPages :  Math.ceil (totalExpenses)/limitNumber 
            }
        )
    } catch (error) {
        console.log(error) ;
        return res.status(500).send("Internal Error") ;
    }
}

export const  getExpenseAnalytics = async(req,res) =>{
try {
  const userId = req.user._id ;
  const endDate = new Date() ;
  const startDate = new Date() ;

startDate.setMonth(startDate.getMonth() - 12) ; // 12 months back 

  const analyticsResult = await Expense.aggregate(
    [
      // Always to filter first 
      {
        $match : {
          userId : userId ,
          date : {
            $gte : $startDate ,
            $lte : $endDate 
          }
        }
      },

      // parallel pipelines 
      {
        $facet : {
          categoryStates : [
            {
              $group : {
                _id : $category ,
                $totalAmount : {$sum : $amount}
              } ,
            },
            {
              $sort : {totalAmount : - 1} 
            }
          ],
          monthlyStates : [
            {
              $group : {
                _id : {
                  yearly : {$year : Date } ,
                  monthly : {$month : Date}
                },
                totalAmount : {$sum : $amount} 
              }
            },
            {
              $sort : {
                "_id.yearly" : 1 ,
                "_id.monthly" : 1 
              }
            }
          ]
        }
      }
    ]
  )

  //Extracting data 

  const {categoryStates , monthlyStates} = analyticsResult[0] ;

res.status(200).json({
      success: true,
      categoryStats,
      monthlyStats
    });

} catch (error) {
     console.error("Expense analytics error:", error);
     res.status(500).json({
      success: false,
      message: "Failed to get expense analytics"
     });
}
}

const getPrediction = () =>{
  const startDate = new Date() ; // start date of the month 
  const todayDate = new Date() ;

  // making a new function here for the prediction 

  const prediction = () =>{
    
  }
  
}