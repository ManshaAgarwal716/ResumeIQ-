// const OpenAI=require('openai')
// const client =new OpenAI({
//     apikey:process.env.OpenAI_API_KEY
// })
// const roastResume=async(Text,jobDescription)=>{
// try{
//     const prompt=`
//     You are an expert resume reviewer and career coach.

// A user has uploaded their resume and wants feedback to improve it.

// RESUME TEXT:
// ${Text}

// JOB DESCRIPTION THEY ARE APPLYING FOR:
// ${jobDescription}

// Please analyze the resume and provide:

// 1. OVERALL SCORE (out of 10)
// 2. STRENGTHS (what they did well, 3 points)
// 3. WEAKNESSES (what needs improvement, 3 points)
// 4. MISSING KEYWORDS (important keywords from job description missing in resume)
// 5. IMPROVED BULLET POINTS (rewrite 3 weak bullet points from their resume making them stronger with metrics and action verbs)
// 6. ONE LINE VERDICT (brutally honest summary)

// Be specific, actionable, and honest. No generic advice.
// `;

// const response=await client.chat.completions.create({
//  model: "gpt-3.5-turbo",
//       max_tokens: 1000,
//       messages: [
//         {
//           role: "user",
//           content: prompt
//         }
//       ]
//     });

// const aiResponse=response.choices[0].message.content
// return {success:true,feedback:aiResponse}
// }
// catch(error){
//      console.error("AI Service error:", error);
//     return { success: false, error: "AI feedback failed" };
// }}
// module.exports={roastResume}
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize the client with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const roastResume = async (resumeText, jobDescription) => {
//   try {
//     // This is the prompt — the instructions we give to Gemini
//     const prompt = `
// You are an expert resume reviewer and career coach.
// A user has uploaded their resume and wants feedback to improve it.
// RESUME TEXT:
// ${resumeText}
// JOB DESCRIPTION THEY ARE APPLYING FOR:
// ${jobDescription}
// Please analyze the resume and provide:
// 1. OVERALL SCORE (out of 10)
// 2. STRENGTHS (what they did well, 3 points)
// 3. WEAKNESSES (what needs improvement, 3 points)
// 4. MISSING KEYWORDS (important keywords from job description missing in resume)
// 5. IMPROVED BULLET POINTS (rewrite 3 weak bullet points from their resume making them stronger with metrics and action verbs)
// 6. ONE LINE VERDICT (brutally honest summary)
// Be specific, actionable, and honest. No generic advice.
// `;

//     // Call the Gemini API
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//     const result = await model.generateContent(prompt);

//     // Extract the text response from Gemini
//     const aiResponse = result.response.text();

//     return { success: true, feedback: aiResponse };

//   } catch (error) {
//     console.error("AI Service error:", error);
//     return { success: false, error: "AI feedback failed" };
//   }
// };

// module.exports = { roastResume };
const Groq = require("groq-sdk");

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const roastResume = async (resumeText, jobDescription) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `
You are an expert resume reviewer and career coach.
A user has uploaded their resume and wants feedback to improve it.

RESUME TEXT:
${resumeText}

JOB DESCRIPTION THEY ARE APPLYING FOR:
${jobDescription}

Please analyze the resume and provide:
1. OVERALL SCORE (out of 10)
2. STRENGTHS (what they did well, 3 points)
3. WEAKNESSES (what needs improvement, 3 points)
4. MISSING KEYWORDS (important keywords from job description missing in resume)
5. IMPROVED BULLET POINTS (rewrite 3 weak bullet points making them stronger with metrics and action verbs)
6. ONE LINE VERDICT (brutally honest summary)

Be specific, actionable, and honest. No generic advice.
`
        }
      ]
    });

    const aiResponse = response.choices[0].message.content;
    return { success: true, feedback: aiResponse };

  } catch (error) {
    console.error("AI Service error:", error);
    return { success: false, error: "AI feedback failed" };
  }
};

module.exports = { roastResume };
