var mongoose=require("mongoose"),schema=mongoose.Schema,chapterSchema=new schema({chapterNo:Number,book:String,bookNo:Number,religion:String,negative:Number,positive:Number,data:String},{collection:"bibleChapters"}),Chapter=mongoose.model("Chapter",chapterSchema);module.exports=Chapter;