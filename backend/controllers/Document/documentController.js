const Document = require("../../models/Document/documentModel");

//add document

const addDocument = async (req, res) => {
  try {
    const { name, content, owner_id } = req.body;

    const documentData = new Document({
      name: name,
      content: content,
      owner_id: owner_id,
    });
    const documentAdded = await documentData.save();

    if (documentAdded) {
      return res.status(201).json({ status: "success", data: documentAdded });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get document

const getDocument = async (req, res) => {
  try {
    const { document_id } = req.query;

    const documentData = await Document.findById({ _id: document_id });

    if (documentData) {
      return res.status(200).json({ status: "success", data: documentData });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//edit document

const editDocument = async (req, res) => {
  try {
    const { content, user_id } = req.body;
    const { document_id } = req.query;

    const editDocument = await Document.findByIdAndUpdate(
      { _id: document_id },
      {
        $set: {
          content: content,
        },
      }
    );

    if (editDocument) {
      return res
        .status(201)
        .json({ status: "success", message: "Document Editted Successfully." });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

/*

//get a question in game

const getQuestion = async (req, res) => {
  try {
    const { language, score } = req.query;

    let level = "easy";

    if (score > 7 && score <= 22) {
      level = "moderate";
    } else if (score > 22) {
      level = "hard";
    }
    const count = await Question.countDocuments({
      language: language,
      level: level,
    });

    if (count === 0 && level === "moderate") {
      const count1 = await Question.countDocuments({
        language: language,
        level: "easy",
      });
      const randomIndex1 = Math.floor(Math.random() * count1);

      const randomQuestion1 = await Question.findOne({
        language: language,
        level: "easy",
      }).skip(randomIndex1);

      return res.status(200).json({ status: "success", data: randomQuestion1 });
    }

    if (count === 0 && level === "hard") {
      const count2 = await Question.countDocuments({
        language: language,
        level: "moderate",
      });

      if (count2 === 0 && level === "hard") {
        const count3 = await Question.countDocuments({
          language: language,
          level: "easy",
        });
        const randomIndex3 = Math.floor(Math.random() * count3);

        const randomQuestion3 = await Question.findOne({
          language: language,
          level: "easy",
        }).skip(randomIndex3);

        return res
          .status(200)
          .json({ status: "success", data: randomQuestion3 });
      }

      const randomIndex2 = Math.floor(Math.random() * count2);

      const randomQuestion2 = await Question.findOne({
        language: language,
        level: "moderate",
      }).skip(randomIndex2);

      return res.status(200).json({ status: "success", data: randomQuestion2 });
    }

    const randomIndex = Math.floor(Math.random() * count);

    const randomQuestion = await Question.findOne({
      language: language,
      level: level,
    }).skip(randomIndex);

    return res.status(200).json({ status: "success", data: randomQuestion });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get all questions

const getAllQuestions = async (req, res) => {
  try {
    const { language, level } = req.query;
    let query = {};

    if (language !== "all") {
      query.language = language;
    }

    if (level !== "all") {
      query.level = level;
    }

    const questionsData = await Question.find(query);

    return res.status(200).json({ status: "success", data: questionsData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get question by ID

const getQuestionByID = async (req, res) => {
  try {
    const { question_id } = req.query;

    const questionData = await Question.findById({ _id: question_id });

    return res.status(200).json({ status: "success", data: questionData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//upadte question by ID

const updateQuestion = async (req, res) => {
  try {
    const { question_id } = req.query;
    const { question, option1, option2, option3, option4, level, language } =
      req.body;

    const questionData = await Question.updateOne(
      { _id: question_id },
      {
        $set: {
          question: question,
          correctOption: option1,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          level: level,
          language: language,
        },
      }
    );

    return res.status(200).json({ status: "success", data: questionData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};*/

module.exports = {
  addDocument,
  getDocument,
  editDocument,
  /*getQuestion,
  getAllQuestions,
  getQuestionByID,
  updateQuestion,*/
};
