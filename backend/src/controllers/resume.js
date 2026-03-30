const pdfParse= require("pdf-parse");
const fs=require('fs')
const {roastResume}=require('../services/service')
const uploadResume=async(req,res)=>{
try{
    if (!req.file){
        return res.status(400).json({error:"Please upload a PDF file"});
    }
    const {jobDescription}=req.body
      if (!jobDescription) {
      return res.status(400).json({ error: "Please provide a job description" });
    }

    const filePath=req.file.path
    const filebuffer=fs.readFileSync(filePath)
    const pdfData=await pdfParse(filebuffer)
    const Text=pdfData.text;
    if (!Text||Text.trim().length==0){
        return res.status(400).json({error: "Could not extract text from PDF" });
    }
    fs.unlinkSync(filePath)
    console.log("Sending to API...");
    const ai=await roastResume(Text,jobDescription);
    if (!ai.success) {
      return res.status(500).json({ error: ai.error });
    }


    res.json({
        success:true,
        feedback:ai.feedback
    })
}
 catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports={uploadResume}
