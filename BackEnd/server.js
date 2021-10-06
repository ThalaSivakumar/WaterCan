
const express= require('express');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

mongoose.connect("mongodb://localhost:27017/canDB",{useUnifiedTopology: true,useNewUrlParser: true});

const canSchema = {
  canCount:Number,
  DateofBuying:Date
}

const Can=mongoose.model("Can",canSchema);



app.get("/",function(req,res){
  res.render("Can");
})

app.post("/",function(req,res){
  const canCount=req.body.canCount;
  //console.log(canCount);

  const can =new Can({
    canCount:canCount,
    DateofBuying:new Date().toISOString()
  });

  can.save();
    // const findDocuments=function(db,callback){
    //   const val=db.collection('can').aggregate([{$group:{_id:null,Total:{$sum:"$canCount"}}}])
    //   console.log(val);
    // }
   
  // Can.find({},function(err,canTotal){
  //   //  console.log(canTotal.canCount);
  //   // canTotal.reduce((accumulator,currentNo)=>{
  //   //   console.log(accumulator+currentNo)
  //   // })
  //   count=0;
  //   canTotal.forEach(()=>{
  //     console.log(canTotal.canCount);

  //   });
    var canCount1=0;
    Can.find(function(err,cans){
      if(err){
        console.log(err);
      }else{
        // console.log(cans);
        
        cans.forEach(function(can){
          // console.log(can.canCount);'
          var date=new Date();
          var firstDay=new Date(date.getFullYear(),date.getMonth(),2);
          var lastDay=new Date(date.getFullYear(),date.getMonth()+1,1);
          // console.log(can.DateofBuying);
          // console.log(firstDay.toISOString());
          if(can.DateofBuying>firstDay && can.DateofBuying<lastDay){
            // console.log(1);
            sum(can.canCount);
          }
          
          
          // can.aggregate([{$group:{_id:null,Total:{$sum:"$can.canCount"}}}])
         
          function sum(counts){
            // console.log("inside sum");
            // console.log(counts);
            canCount1+=counts;
            // console.log(canCount1);
          }
          
        })
      }
      console.log(canCount1);
      res.render('can',{canCount1:canCount1});
    })
    


  
  
})



app.listen(4000,()=> {
  console.log("BackEnd Running");
 
  // console.log(date.toISOString());
  // console.log(firstDay.toISOString());
  // console.log(lastDay.toISOString());
});
