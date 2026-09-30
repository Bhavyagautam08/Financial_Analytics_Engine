import mongoose from "mongoose" 

const budgetSchema = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "User" ,
            required : true ,
            index : true 
        },
        category : {
            type : String ,
            required : true ,
            index : true
        },
        amount : {
            type : Number ,
            required : true 
        },
        period : {
            type : String ,
            required : true ,
            enum : ["daily" , "weekly" , "monthly" , "annually"] ,
        }
    }
)

budgetSchema.index(
    {userId : 1 , category : 1 , period : 1} ,
    {unique : true}
) ;

const budget = mongoose.model("budget" , budgetSchema) ;
export default budget ;